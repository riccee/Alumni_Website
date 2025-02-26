from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, Depends, HTTPException, status, APIRouter, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from supabase import create_client, Client

from routers.db import router as db_router
from auth import (
    create_access_token,
    authenticate_user,
    get_current_user,
    Token,
    User,
    UserSignup,
    referral_codes,
    pwd_context,
)

import keys



app = FastAPI()
api_router = APIRouter(prefix="/api")

# OAuth2 token endpoint – clients use this to get a JWT token.
@api_router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Example protected endpoint.
@api_router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@api_router.post("/signup", response_model=Token)
async def signup(user: UserSignup):
    # Validate referral code
    if user.referral_code not in referral_codes or not referral_codes[user.referral_code]:
        raise HTTPException(status_code=400, detail="Invalid referral code")
    
    supabase: Client = create_client(keys.supa_url, keys.supa_key)
    existing = supabase.table("Login").select("username").eq("username", user.username).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="User already exists")

    # Hash the password and create the new user record
    hashed_password = pwd_context.hash(user.password)
    
    new_user_data = {
        "username": user.username,
        "full_name": user.username,  
        "email": f"{user.username}@example.com",  
        "hashed_password": hashed_password,
        "disabled": False,
    }

    result = supabase.table("Login").insert(new_user_data).execute()
    if not result.data:
        raise HTTPException(status_code=400, detail="User creation failed")

    # Issue a JWT token for the new user
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

api_router.include_router(db_router)
app.include_router(api_router)