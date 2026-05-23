
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import auth, billing, inventory, crm
from app.api.v1.websockets import notifications

app = FastAPI(
    title="Vyapaar OS API",
    description="Production backend for Vyapaar OS - Indian SMB Operating System",
    version="1.0.0"
)

# CORS config for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update to frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(billing.router, prefix="/api/v1/billing", tags=["Billing & POS"])
app.include_router(inventory.router, prefix="/api/v1/inventory", tags=["Inventory"])
app.include_router(crm.router, prefix="/api/v1/crm", tags=["CRM"])
app.include_router(notifications.router, prefix="/ws", tags=["WebSockets"])

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Vyapaar OS Core"}