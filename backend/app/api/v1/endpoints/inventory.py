from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class Product(BaseModel):
    sku: str
    name: str
    category: str
    purchase_price: float
    selling_price: float
    stock_count: int
    low_stock_threshold: int = 5

@router.get("/products")
async def get_products():
    # Mock data for demonstration
    return [
        {"sku": "SKU001", "name": "Premium Basmati Rice 1kg", "selling_price": 110, "stock_count": 45, "gst_rate": 0.05},
        {"sku": "SKU002", "name": "Refined Sunflower Oil 1L", "selling_price": 145, "stock_count": 8, "gst_rate": 0.05}
    ]

@router.post("/products")
async def add_product(product: Product):
    # Insert into MongoDB
    return {"status": "success", "product": product}
