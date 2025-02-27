from fastapi import APIRouter, Depends, Response
from app.db.supabase_conn import get_supabase_client
from app.routers.auth import get_current_user_from_cookie
from app.models.user import UserInDB

db_router = APIRouter()

@db_router.get("/alumni", summary="Retrieve alumni info")
async def get_alumni_data(
    response: Response,
    current_user: UserInDB = Depends(get_current_user_from_cookie)
):
    supabase = get_supabase_client()
    response = supabase.table("Alumni_Info").select("*").execute()
    return response.data
    
    