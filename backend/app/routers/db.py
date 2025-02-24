from supabase import create_client, Client
import keys
from fastapi import APIRouter, HTTPException, Request, Depends
from auth import get_current_user

router = APIRouter(
    prefix='/db',
)

@router.get("/")
async def connect_db(current_user=Depends(get_current_user)):
    url = keys.supa_url
    key= keys.supa_key
    supabase: Client = create_client(url, key) 
    response = supabase.table('Alumni_Info').select("*").execute()
    return response.data