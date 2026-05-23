from fastapi import APIRouter
from app.api.v1.endpoints import auth, billing, inventory, crm, ai_insights

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(billing.router, prefix="/billing", tags=["Billing & POS"])
api_router.include_router(inventory.router, prefix="/inventory", tags=["Inventory"])
api_router.include_router(crm.router, prefix="/crm", tags=["CRM"])
api_router.include_router(ai_insights.router, prefix="/ai", tags=["AI & Analytics"])
