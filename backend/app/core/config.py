import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv() 

class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        case_sensitive = True

settings = Settings()