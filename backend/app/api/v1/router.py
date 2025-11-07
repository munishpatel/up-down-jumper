from fastapi import APIRouter
from .endpoints import onboarding

api_router = APIRouter()

api_router.include_router(
    onboarding.router,
    prefix="/api/v1",
    tags=["onboarding"]
)
