from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_root_endpoint_is_available():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "Vyapaar OS Core API is operational."


def test_security_headers_are_present():
    response = client.get("/")
    assert response.headers.get("x-frame-options") == "DENY"
    assert response.headers.get("x-content-type-options") == "nosniff"
    assert "content-security-policy" in response.headers
