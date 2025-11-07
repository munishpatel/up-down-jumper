from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    current_role: Optional[str] = None
    target_role: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# Resume schemas
class ResumeCreate(BaseModel):
    resume_content: str
    resume_version: str = "v1.0"
    file_type: str = "pdf"

class ResumeResponse(BaseModel):
    id: int
    user_id: int
    resume_version: str
    file_type: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True

# Onboarding schemas
class OnboardingRequest(BaseModel):
    # User details
    email: EmailStr
    full_name: str
    phone: Optional[str] = None
    current_role: Optional[str] = None
    target_role: Optional[str] = None
    
    # Onboarding form data
    job_links: List[str]  # Array of job URLs
    get_job_in_months: int  # e.g., 3, 6, 12
    daily_time_commitment: float  # e.g., 2.5 hours
    learning_style: Optional[str] = None
    career_transition: Optional[str] = None
    budget: Optional[float] = None
    
    # Resume
    resume_content: str
    resume_version: str = "v1.0"
    file_type: str = "pdf"

class OnboardingResponse(BaseModel):
    id: int
    user_id: int
    job_links: str
    get_job_in_months: int
    daily_time_commitment: float
    n8n_response: Optional[dict] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# N8N response schema
class N8NResponse(BaseModel):
    status: str
    message: str
    data: Optional[dict] = None
