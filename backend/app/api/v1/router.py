from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.api.dependencies import get_current_user
from app.core.security import create_access_token, verify_password
from app.database.mongodb import get_database
from app.models.customer import router as customer_router

api_router = APIRouter()

api_router.include_router(customer_router, prefix="/customers", tags=["customers"])

@api_router.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "vyapaar-os-api",
        "security": "jwt-and-cors-enabled",
        "timestamp": datetime.utcnow().isoformat() + "Z",
    }

@api_router.post("/auth/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db=Depends(get_database),
):
    user = await db["users"].find_one({"username": form_data.username})
    if not user:
        user = await db["users"].find_one({"email": form_data.username})

    if not user or not verify_password(form_data.password, user.get("password", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(subject=str(user.get("_id", user.get("id", "unknown"))))
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.get("_id", user.get("id", "unknown"))),
            "username": user.get("username") or user.get("email"),
            "email": user.get("email"),
        },
    }

@api_router.get("/auth/me")
async def me(current_user=Depends(get_current_user)):
    return {
        "id": str(current_user.get("_id")),
        "username": current_user.get("username") or current_user.get("email"),
        "email": current_user.get("email"),
        "is_active": current_user.get("is_active", True),
    }

@api_router.get("/inventory/")
async def get_inventory(db=Depends(get_database)):
    cursor = db["products"].find()
    products = await cursor.to_list(length=200)
    return [
        {
            **product,
            "id": str(product.get("_id")),
            "status": product.get("status", "active"),
        }
        for product in products
    ]

@api_router.post("/inventory/")
async def create_inventory(product: dict, db=Depends(get_database)):
    created = {
        "name": product.get("name"),
        "sku_barcode": product.get("sku_barcode", ""),
        "category": product.get("category"),
        "purchase_price": product.get("purchase_price", 0),
        "selling_price": product.get("selling_price", 0),
        "gst_rate": product.get("gst_rate", 0),
        "current_stock": product.get("stock", product.get("current_stock", 0)),
        "low_stock_threshold": product.get("threshold", 10),
        "business_id": product.get("business_id", "demo-business"),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
    }
    result = await db["products"].insert_one(created)
    saved = await db["products"].find_one({"_id": result.inserted_id})
    return {**saved, "id": str(saved.get("_id")), "status": "active"}

@api_router.get("/dashboard")
async def dashboard_summary():
    return {
        "metrics": {
            "revenue": "₹5,42,500",
            "orders": 1248,
            "customers": 842,
            "inventory_items": 4192,
        },
        "recent_transactions": [
            {"id": "INV-2026-001", "customer": "Rajesh Enterprises", "amount": "₹14,500", "status": "Completed", "date": "Today, 10:23 AM"},
            {"id": "INV-2026-002", "customer": "Walk-in Customer", "amount": "₹2,100", "status": "Completed", "date": "Today, 09:45 AM"},
            {"id": "INV-2026-003", "customer": "Sharma Traders", "amount": "₹8,450", "status": "Pending", "date": "Yesterday"},
        ],
        "low_stock_items": [
            {"name": "Premium Basmati Rice 5kg", "stock": 12, "threshold": 20},
            {"name": "Sunflower Oil 1L", "stock": 8, "threshold": 15},
        ],
    }

@api_router.get("/analytics")
async def analytics_summary():
    return {
        "sales": [
            {"day": "Mon", "revenue": 12000},
            {"day": "Tue", "revenue": 20000},
            {"day": "Wed", "revenue": 18000},
            {"day": "Thu", "revenue": 26000},
            {"day": "Fri", "revenue": 24000},
        ],
        "channels": {
            "online": 42,
            "retail": 38,
            "whatsapp": 20,
        },
    }
