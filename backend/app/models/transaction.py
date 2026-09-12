from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class InvoiceItemSchema(BaseModel):
    product_id: str
    name: str
    quantity: int
    unit_price: float
    gst_rate: float

class InvoiceCreate(BaseModel):
    customer_phone: Optional[str] = None
    customer_name: Optional[str] = "Walk-in Customer"
    items: List[InvoiceItemSchema]
    subtotal: float
    grand_total: float
    payment_mode: str

class InvoiceResponse(InvoiceCreate):
    id: str = Field(alias="_id")
    business_id: str
    cgst: float
    sgst: float
    created_at: datetime

    class Config:
        populate_by_name = True
