from fastapi.testclient import TestClient
from main import app
from app.services.ai_engine import VyapaarAIEngine

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "vyapaar-os-api"

def test_login_demo_credentials():
    response = client.post(
        "/api/v1/auth/login",
        data={"username": "admin", "password": "admin123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

def test_inventory_flow():
    # Fetch inventory
    res = client.get("/api/v1/inventory/")
    assert res.status_code == 200
    products = res.json()
    assert isinstance(products, list)
    assert len(products) > 0

    # Create new product
    new_prod = {
        "name": "Test Mustard Oil 1L",
        "category": "Grocery",
        "purchase_price": 140.0,
        "selling_price": 180.0,
        "current_stock": 50,
        "low_stock_threshold": 10,
        "gst_rate": 5.0
    }
    create_res = client.post("/api/v1/inventory/", json=new_prod)
    assert create_res.status_code == 200
    created = create_res.json()
    assert created["name"] == "Test Mustard Oil 1L"
    assert "id" in created

def test_pos_checkout_and_transactions():
    payload = {
        "customer_name": "Test Customer",
        "customer_phone": "+91 98765 00000",
        "items": [
            {"product_id": "PROD-001", "name": "Basmati Rice", "price": 850, "qty": 2}
        ],
        "subtotal": 1700.0,
        "gst": 306.0,
        "grand_total": 2006.0,
        "payment_mode": "UPI"
    }
    checkout_res = client.post("/api/v1/pos/checkout", json=payload)
    assert checkout_res.status_code == 200
    invoice_data = checkout_res.json()
    assert invoice_data["status"] == "success"
    assert "invoice" in invoice_data
    assert invoice_data["invoice"]["grand_total"] == 2006.0
    assert invoice_data["invoice"]["payment_mode"] == "UPI"

    # Verify transaction in list
    tx_res = client.get("/api/v1/pos/transactions")
    assert tx_res.status_code == 200
    tx_list = tx_res.json()
    assert len(tx_list) > 0

def test_dashboard_and_analytics():
    dash = client.get("/api/v1/dashboard")
    assert dash.status_code == 200
    assert "metrics" in dash.json()

    analytics = client.get("/api/v1/analytics")
    assert analytics.status_code == 200
    assert "sales" in analytics.json()
    assert "channels" in analytics.json()

def test_ai_engine_forecast():
    engine = VyapaarAIEngine()
    dummy_history = [
        {"timestamp": "2026-09-10", "quantity": 12},
        {"timestamp": "2026-09-11", "quantity": 15},
        {"timestamp": "2026-09-12", "quantity": 14},
        {"timestamp": "2026-09-13", "quantity": 18},
    ]
    result = engine.forecast_demand(dummy_history)
    assert result["status"] == "success"
    assert result["next_7_days_prediction"] > 0
    assert result["recommended_restock"] >= result["next_7_days_prediction"]

