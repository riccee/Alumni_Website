import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv() 

class Settings(BaseSettings):
    SECRET_KEY: str 
    SUPABASE_URL: str 
    SUPABASE_KEY: str 
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MAIL_SERVER: str
    MAIL_PORT: int
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_FROM: str
    MAIL_FROM_NAME: str
    MAIL_TLS: bool
    MAIL_SSL: bool
    FRONTEND_URL: str


    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()