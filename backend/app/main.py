from fastapi import FastAPI, Depends

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI running!"}

