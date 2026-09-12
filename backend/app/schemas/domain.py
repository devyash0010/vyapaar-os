from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# --- Auth & Users ---
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    username: str
    is_active: bool

class Token(BaseModel):
    access_token: str
    token_type: str

# --- Products / Inventory ---
class ProductBase(BaseModel):
    sku: str
    name: str
    category: str
    price: float
    stock: int
    threshold: int

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: str
    status: str
    created_at: datetime

# --- Customers / CRM ---
class CustomerBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: str

class CustomerCreate(CustomerBase):
    pass

class CustomerResponse(CustomerBase):
    id: str
    loyalty_points: int
    total_spent: float
    last_visit: datetime