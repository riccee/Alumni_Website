from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",      # for local development
    "https://amhsalumni.com",       # production domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        
    allow_credentials=True,        
    allow_methods=["*"],          
    allow_headers=["*"],          
)


@app.get("/api")
async def root():
    return {"message": "FastAPI running!"}

