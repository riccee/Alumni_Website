from typing import Optional
from app.db.supabase_conn import get_supabase_client
from app.models.user import UserInDB, UserCreate
from app.core.security import verify_password, get_password_hash

# Example referral codes, but you might store these in config or database
REFERRAL_CODES = {"test": True}

def get_user_by_email(email: str) -> Optional[UserInDB]:
    supabase = get_supabase_client()
    result = supabase.table("Users").select("*").eq("email", email).execute()
    if result.data and len(result.data) > 0:
        return UserInDB(**result.data[0])
    return None

def authenticate_user(email: str, password: str) -> Optional[UserInDB]:
    user = get_user_by_email(email)
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
    
    # Check if email exists
    existing = supabase.table("Users").select("email").eq("email", user_data.email).execute()
    if existing.data:
        raise ValueError("Email already in use, try loging in")

    hashed_pw = get_password_hash(user_data.password)
    new_user_dict = {
        "email": user_data.email,
        "firstname": user_data.firstname,
        "lastname": user_data.lastname,
        "hashed_password": hashed_pw,
        "disabled": False,
    }
    result = supabase.table("Users").insert(new_user_dict).execute()

    if not result.data:
        raise ValueError("Failed to create user in DB")

    return UserInDB(**result.data[0])
