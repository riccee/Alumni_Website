from typing import Optional
from pydantic import BaseModel

# Shared user properties
class UserBase(BaseModel):
    username: str
    full_name: Optional[str] = None
    email: Optional[str] = None
    disabled: Optional[bool] = False

class UserCreate(UserBase):
    password: str
    referral_code: str

# For DB representation
class UserInDB(UserBase):
    hashed_password: str

# For reading user info (public-facing)
class UserRead(UserBase):
    pass

# For token responses
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
