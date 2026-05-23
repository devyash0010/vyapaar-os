from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
import uuid

router = APIRouter()

class Customer(BaseModel):
    name: str
    phone: str
    segment: str = "New"

@router.post("/customers")
async def add_customer(customer: Customer):
    return {
        "id": f"CUST-{uuid.uuid4().hex[:6].upper()}",
        "name": customer.name,
        "phone": customer.phone,
        "created_at": datetime.utcnow()
    }

@router.get("/customers/leaderboard")
async def get_top_customers():
    return [
        {"name": "Rajesh Kumar", "phone": "+919876543210", "ltv": 45000, "segment": "VIP"},
        {"name": "Anjali Sharma", "phone": "+919876543211", "ltv": 12000, "segment": "Regular"}
    ]
