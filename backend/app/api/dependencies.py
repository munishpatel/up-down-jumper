from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal

def get_db() -> Session:
    """Get database session dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Optional: Add more dependencies as you grow
# def get_current_user(token: str = Depends(HTTPBearer())):
#     # JWT validation, user authentication, etc.
#     pass