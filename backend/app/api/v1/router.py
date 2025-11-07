from fastapi import APIRouter
from app.api.v1.endpoints import onboarding

# Create main router
router = APIRouter()

# Include endpoint routers
router.include_router(onboarding.router, tags=["onboarding"])