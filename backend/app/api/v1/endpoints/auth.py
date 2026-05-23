
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = os.getenv("JWT_SECRET", "supersecretkey")

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    business_name: str

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/signup", response_model=Token)
async def signup(user: UserSignup):
    # Hash password and store in MongoDB (omitted for brevity)
    hashed_pw = pwd_context.hash(user.password)
    
    # Generate JWT
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode = {"sub": user.email, "exp": expire}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm="HS256")
    
    return {"access_token": encoded_jwt, "token_type": "bearer"}

@router.post("/login", response_model=Token)
async def login(email: str, password: str):
    expire = datetime.utcnow() + timedelta(days=7)
    encoded_jwt = jwt.encode({"sub": email, "exp": expire}, JWT_SECRET, algorithm="HS256")
    return {"access_token": encoded_jwt, "token_type": "bearer"}