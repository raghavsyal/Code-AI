from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import os
from groq import Groq
import asyncio

load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=groq_api_key)

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

async def stream_code_review(code: str, language: str):
    """
    Generator function to stream the code review from the Groq API.
    """
    prompt = f"""You are a senior {language} developer.
Please review this code and provide:
1. The Right Optimal Code without any explanations, only the fixed and right code.

Code:
{code}
"""

    try:
        stream = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You are a helpful code reviewer."},
                {"role": "user", "content": prompt}
            ],
            stream=True,
        )

        for chunk in stream:
            content = chunk.choices[0].delta.content
            if content:
                yield content
                await asyncio.sleep(0)  # Yield control to the event loop

    except Exception as e:
        print(f"Groq API error: {e}")
        yield f"Error from Groq API: {str(e)}"

@app.post("/review")
async def review_code(code: str = Form(...), language: str = Form(...)):
    return StreamingResponse(stream_code_review(code, language), media_type="text/plain")