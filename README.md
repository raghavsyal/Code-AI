# 🧠 Code AI - Your AI Coding Partner

Code AI is an AI-powered code reviewer that helps developers get instant feedback and improvement suggestions for their code. Built with a FastAPI backend and a modern React + Tailwind CSS frontend, it supports multiple languages and is designed for speed, simplicity, and clarity.

---

## ✨ Features

- 🚀 Instant AI-generated code suggestions
- 🧠 Supports multiple languages (C++, Python, JavaScript, etc.)
- 🌙 Clean, dark-themed minimalist UI
- ⚙️ FastAPI backend integrated with a local LLM (e.g. Mistral or Groq)
- 🎨 React + Tailwind frontend with monospaced fonts

---

## How the App Looks
### 1. On Launch
<img width="1919" height="886" alt="Screenshot 2025-07-15 140239" src="https://github.com/user-attachments/assets/90218e85-0735-4a56-b345-973e853f24ff" />

### 2. Your Code (enter your code here)
<img width="1919" height="886" alt="Screenshot 2025-07-15 140239" src="https://github.com/user-attachments/assets/50ae4960-1fa6-4d90-8dd8-19cfeb04badd" />

### 3. Choose Coding Language
<img width="1919" height="901" alt="Screenshot 2025-07-15 140301" src="https://github.com/user-attachments/assets/0a4b509e-b617-4c00-b279-9ca8186a6bb8" />

### 4. Generate and Analyzing
<img width="1919" height="896" alt="Screenshot 2025-07-15 140316" src="https://github.com/user-attachments/assets/0b73f47e-91b2-48c7-add3-8afaa461724f" />
<img width="1918" height="907" alt="Screenshot 2025-07-15 140420" src="https://github.com/user-attachments/assets/167313c1-6635-40cf-b10c-d7fbaac37b88" />

### 5. AI Suggested Code
<img width="1919" height="896" alt="Screenshot 2025-07-15 140541" src="https://github.com/user-attachments/assets/3625c7b6-ae4e-4c90-83c7-5a50a0ec894c" />


## 📦 Project Structure
AI Agent/
├── backend.py # FastAPI backend serving the AI review endpoint
├── .env # API keys (not committed to repo)
├── frontend/ # React + Tailwind frontend
│ ├── src/
│ ├── index.css
│ └── ...
└── README.md

## 🔧 Setup Instructions

### 1. Clone the Repository

bash
git clone https://github.com/YOUR_USERNAME/Code-AI.git
cd Code-AI

### 2.Backend + FastAPI
pip install -r requirements.txt
uvicorn backend:app --reload

### 3. Frontend
cd frontend
npm install
npm run dev

### 4. .env and API
API_KEY=your_local_or_hosted_ai_model_key
MODEL=mistral # or whichever model you're using


🛠️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS, Vite
Backend: FastAPI, Python, LangChain
LLM: Local model via Groq & Ollama (backend_groq.py) has my API key from groqcloud, backend.py has API key from locally hosted OLLAMA.



