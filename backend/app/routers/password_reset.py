from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, EmailStr
from datetime import timedelta

from app.services.email import send_password_reset_email, send_password_reset_confirmation
from app.services.user_service import get_user_by_email, update_user_password
from app.core.security import create_password_reset_token, verify_password_reset_token

reset_router = APIRouter()

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str

@reset_router.post("/forgot-password")
async def request_password_reset(request: PasswordResetRequest):
    user = get_user_by_email(request.email)
    if user:
        # Create password reset token
        token = create_password_reset_token(user.email)
        # Send reset email
        await send_password_reset_email(user.email, token)
    
    # Always return success to prevent email enumeration
    return {"message": "If an account exists with this email, a password reset link has been sent."}

@reset_router.post("/reset-password")
async def reset_password(reset_data: PasswordResetConfirm):
    email = verify_password_reset_token(reset_data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    user = get_user_by_email(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    # Update password
    await update_user_password(user.email, reset_data.new_password)
    
    # Send confirmation email
    await send_password_reset_confirmation(user.email)
    
    return {"message": "Password has been reset successfully"}

@reset_router.get("/dev/generate-test-token/{email}")
async def generate_test_token(email: str):
    """Development only endpoint to generate a password reset token"""
    token = create_password_reset_token(email)
    return {"token": token}