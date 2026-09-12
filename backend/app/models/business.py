from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class BusinessCreate(BaseModel):
    name: str
    industry: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    business_name: str
    industry: str

class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: EmailStr
    business_id: str
    role: str

    class Config:
        populate_by_name = True
