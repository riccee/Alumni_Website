from fastapi import FastAPI
from app.routers.auth import auth_router
from app.routers.db import db_router

def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(
        auth_router, 
        prefix="/api/auth", 
        tags=["auth"]
    )
    app.include_router(
        db_router, 
        prefix="/api", 
        tags=["db"]
    )

    return app

app = create_app()
