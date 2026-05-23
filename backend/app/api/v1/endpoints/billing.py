from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime
import httpx

router = APIRouter()

class InvoiceItem(BaseModel):
    product_id: str
    name: str
    quantity: int
    unit_price: float
    gst_rate: float

class InvoiceCreate(BaseModel):
    customer_phone: Optional[str] = None
    customer_name: Optional[str] = "Walk-in Customer"
    items: List[InvoiceItem]
    payment_mode: str

async def trigger_n8n_whatsapp(payload: dict):
    # Webhook URL from the n8n config
    url = "http://n8n:5678/webhook/vyapaar-invoice"
    async with httpx.AsyncClient() as client:
        try:
            await client.post(url, json=payload)
        except Exception as e:
            print(f"Failed to trigger n8n: {e}")

@router.post("/invoice")
async def create_invoice(invoice: InvoiceCreate, background_tasks: BackgroundTasks):
    subtotal = sum(item.quantity * item.unit_price for item in invoice.items)
    gst_amount = sum((item.quantity * item.unit_price) * item.gst_rate for item in invoice.items)
    grand_total = subtotal + gst_amount
    invoice_id = f"INV-{uuid.uuid4().hex[:6].upper()}"

    payload = {
        "invoice_id": invoice_id,
        "customer_phone": invoice.customer_phone,
        "customer_name": invoice.customer_name,
        "grand_total": round(grand_total, 2),
        "timestamp": datetime.utcnow().isoformat()
    }

    # Save to MongoDB here...

    if invoice.customer_phone:
        background_tasks.add_task(trigger_n8n_whatsapp, payload)

    return {"status": "success", "invoice_id": invoice_id, "grand_total": grand_total}
