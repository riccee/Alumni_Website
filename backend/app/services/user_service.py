from typing import Optional
from app.db.supabase_conn import get_supabase_client
from app.models.user import UserInDB, UserCreate
from app.core.security import verify_password, get_password_hash

# Example referral codes, but you might store these in config or database
REFERRAL_CODES = {"test": True}

def get_user_by_username(username: str) -> Optional[UserInDB]:
    supabase = get_supabase_client()
    result = supabase.table("Login").select("*").eq("username", username).execute()
    if result.data and len(result.data) > 0:
        return UserInDB(**result.data[0])
    return None

def authenticate_user(username: str, password: str) -> Optional[UserInDB]:
    user = get_user_by_username(username)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def create_user(user_data: UserCreate) -> UserInDB:
    # Validate referral
    if user_data.referral_code not in REFERRAL_CODES or not REFERRAL_CODES[user_data.referral_code]:
        raise ValueError("Invalid referral code")

    supabase = get_supabase_client()
    
    # Check if username exists
    existing = supabase.table("Login").select("username").eq("username", user_data.username).execute()
    if existing.data:
        raise ValueError("User already exists")

    hashed_pw = get_password_hash(user_data.password)
    new_user_dict = {
        "username": user_data.username,
        "full_name": user_data.full_name or user_data.username,
        "email": user_data.email or f"{user_data.username}@example.com",
        "hashed_password": hashed_pw,
        "disabled": False,
    }
    result = supabase.table("Login").insert(new_user_dict).execute()

    if not result.data:
        raise ValueError("Failed to create user in DB")

    return UserInDB(**result.data[0])
