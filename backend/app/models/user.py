from typing import Optional
from pydantic import BaseModel

# Shared user properties
class UserBase(BaseModel):
    email: str
    firstname: str
    lastname: str
    disable: Optional[bool] = False

class UserCreate(UserBase):
    password: str
    referral_code: str

class UserEdit(BaseModel):
    email: str = None
    firstname: str = None
    lastname: str = None
    password: str = None

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
    email: Optional[str] = None

class Alumni(BaseModel):
    email: str
    use_email: Optional[str] = None
    title: Optional[str] = None
    firstname: str
    lastname: str
    grad_year: Optional[str] = None
    location: Optional[str] = None
    undergrad_school: Optional[str] = None
    undergrad_year: Optional[str] = None
    major: Optional[str] = None
    grad_school: Optional[str] = None
    grad_program: Optional[str] = None


class AlumniLinkRequest(BaseModel):
    alumni_email: str