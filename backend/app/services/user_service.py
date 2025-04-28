from typing import Optional
from app.db.supabase_conn import get_supabase_client
from app.models.user import UserInDB, UserCreate, UserEdit, Alumni
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

async def update_user_password(email: str, new_password: str) -> UserInDB:
    supabase = get_supabase_client()
    
    # Hash the new password
    hashed_password = get_password_hash(new_password)
    
    # Update the user's password in the database
    result = supabase.table("Users").update({
        "hashed_password": hashed_password
    }).eq("email", email).execute()
    
    if not result.data:
        raise ValueError("Failed to update password")
        
    return UserInDB(**result.data[0])

async def update_user_info(request: UserEdit):
    supabase = get_supabase_client()
    new_user = request
    hashed_pw = get_password_hash(request.password) if request.password else None

    updated_user_dict = {
        "email": new_user.email,
        "firstname": new_user.firstname,
        "lastname": new_user.lastname,
        "hashed_password": hashed_pw,
        "disabled": False,
    }

    try:
        result = supabase.table("Users").update(updated_user_dict).eq("email", new_user.email).execute()
        
    except Exception as e:
        raise ValueError(f"Failed to update user info: {str(e)}")

    return result

async def update_alumni_info(alumni_update: Alumni, current_user: UserInDB):
    supabase = get_supabase_client()
    
    # First verify user is linked to this alumni record
    alumni = supabase.table("Alumni_Info").select("*").eq("User_Connect", current_user.email).execute()
    
    if not alumni.data:
        raise ValueError("No alumni record linked to this user account")
    
    # Create a clean update dictionary with only the fields that are not None
    updated_user_dict = {}
    
    # Map from Alumni model to DB column names
    field_mappings = {
        "email": "Email",
        "use_email": "Use_Email",
        "title": "Title",
        "firstname": "First_Name",
        "lastname": "Last_Name",
        "grad_year": "Grad_Year",
        "location": "Location",
        "undergrad_school": "Undergrad_School",
        "undergrad_year": "Undergrad_Grad_Year",
        "major": "Major",
        "grad_school": "Grad_School",
        "grad_program": "Graduate_Program"
    }
    
    # Only include fields that are provided (not None)
    for model_field, db_field in field_mappings.items():
        value = getattr(alumni_update, model_field, None)
        if value is not None:
            updated_user_dict[db_field] = value
    
    # Only update if there are changes
    if not updated_user_dict:
        return alumni.data[0]  # Return existing record if no changes
    
    # Update using the user's email as the connection key
    result = supabase.table("Alumni_Info").update(updated_user_dict).eq("User_Connect", current_user.email).execute()
    
    if not result.data:
        raise ValueError("Failed to update alumni information")
    
    return result.data[0]

async def link_user_to_alumni(user_email: str, alumni_email: str):
    supabase = get_supabase_client()
    
    # Check if the alumni record exists
    alumni = supabase.table("Alumni_Info").select("*").eq("Email", alumni_email).execute()
    if not alumni.data:
        raise ValueError(f"No alumni record found with email {alumni_email}")
    
    # Check if already linked to another user
    if alumni.data[0].get("User_Connect") and alumni.data[0]["User_Connect"] != user_email:
        raise ValueError("This alumni record is already linked to a different user")
    
    # Get the user
    user = supabase.table("Users").select("*").eq("email", user_email).execute()
    if not user.data:
        raise ValueError(f"No user found with email {user_email}")
    
    # Link them
    result = supabase.table("Alumni_Info").update({
        "User_Connect": user_email
    }).eq("Email", alumni_email).execute()
    
    if not result.data:
        raise ValueError("Failed to link user to alumni record")
    
    return result.data[0]

async def get_user_alumni_info(user_email: str):
    """Get the alumni information for the current user"""
    supabase = get_supabase_client()
    
    # Find alumni record linked to this user
    alumni = supabase.table("Alumni_Info").select("*").eq("User_Connect", user_email).execute()
    
    if not alumni.data:
        raise ValueError("No alumni record linked to this user account")
    
    return alumni.data[0]
