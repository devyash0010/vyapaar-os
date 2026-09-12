from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    name: str
    sku_barcode: Optional[str] = None
    category: str
    purchase_price: float
    selling_price: float
    gst_rate: float
    current_stock: int
    low_stock_threshold: int = 10

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    purchase_price: Optional[float] = None
    selling_price: Optional[float] = None
    current_stock: Optional[int] = None

class ProductResponse(ProductBase):
    id: str = Field(alias="_id")
    business_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True
