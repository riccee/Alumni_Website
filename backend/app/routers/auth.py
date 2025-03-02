from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt

from app.models.user import UserRead, Token, TokenData, UserCreate, UserInDB
from app.services.user_service import authenticate_user, create_user, get_user_by_email
from app.core.security import create_access_token
from app.core.config import settings

auth_router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

def get_current_user_from_cookie(request: Request) -> UserInDB:
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"}
        )

    if token.startswith("Bearer "):
        token = token[len("Bearer "):]

    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = get_user_by_email(payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


@auth_router.post("/token", response_model=Token, summary="Obtain an access token")
async def login_for_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token = create_access_token(
        data={"sub": user.email}, 
    )
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=3600,
        path="/"
    )

    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.get("/me", response_model=UserRead, summary="Get the current user")
async def read_users_me(current_user: UserInDB = Depends(get_current_user_from_cookie)):
    # Convert UserInDB to a public schema (UserRead)
    return current_user


@auth_router.post("/signup", response_model=Token, summary="Sign up a new user")
async def sign_up(
    user_data: UserCreate,
    response: Response
):
    try:
        user_in_db = create_user(user_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    # Issue a JWT token for the new user

    access_token = create_access_token(data={"sub": user_in_db.email})
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=3600,
        path="/"
    )

    return {"access_token": access_token, "token_type": "bearer"}

@auth_router.post("/logout", summary="Logout a user")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
        secure=True,
        httponly=True
    )
    return {"message": "Logged out successfully"}