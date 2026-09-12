from fastapi import APIRouter, Depends
from typing import List
from datetime import datetime
from app.schemas.domain import CustomerCreate, CustomerResponse
from app.database.mongodb import get_database
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/", response_model=CustomerResponse)
async def create_customer(customer: CustomerCreate, db = Depends(get_database), current_user = Depends(get_current_user)):
    customer_dict = customer.model_dump()
    customer_dict.update({
        "loyalty_points": 0,
        "total_spent": 0.0,
        "last_visit": datetime.utcnow()
    })
    
    result = await db["customers"].insert_one(customer_dict)
    created_cust = await db["customers"].find_one({"_id": result.inserted_id})
    
    return {**created_cust, "id": str(created_cust["_id"])}

@router.get("/", response_model=List[CustomerResponse])
async def get_customers(db = Depends(get_database), current_user = Depends(get_current_user)):
    cursor = db["customers"].find()
    customers = await cursor.to_list(length=100)
    return [{**cust, "id": str(cust["_id"])} for cust in customers]