from fastapi import FastAPI, Form
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.llms import Ollama
from dotenv import load_dotenv
import asyncio

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = Ollama(model="codellama")

async def stream_code_review(code: str, language: str):
    """
    Generator function that streams the response from the Ollama model.
    """
    prompt = f"""You are a senior {language} developer.
Please review this code and provide:
1. The Right Optimal Code without any explanations, only the fixed and right code.

Code:
{code}
"""
    try:
        for chunk in llm.stream(prompt):
            yield chunk
            await asyncio.sleep(0)
            
    except Exception as e:
        print(f"Ollama API error: {e}")
        yield f"Error processing your request: {str(e)}"

@app.post("/review")
async def review_code(code: str = Form(...), language: str = Form(...)):
    """
    FastAPI endpoint that returns a streaming response.
    """
    return StreamingResponse(stream_code_review(code, language), media_type="text/plain")





#run,     uvicorn backend:app --reload       in vs code terminal
#run,     ollama serve in windows terminal