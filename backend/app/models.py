from sqlalchemy import Column, Integer, String, Text, Float, DateTime, LargeBinary, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    full_name = Column(String(255))
    phone = Column(String(20), nullable=True)
    current_role = Column(String(255), nullable=True)
    target_role = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    onboarding_records = relationship("OnboardingRecord", back_populates="user")
    resumes = relationship("Resume", back_populates="user")

class Resume(Base):
    __tablename__ = "resumes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    resume_content = Column(Text)  # Store resume text/data
    resume_version = Column(String(50), default="v1.0")  # Track versions
    file_type = Column(String(20), default="pdf")  # pdf, docx, txt
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="resumes")

class OnboardingRecord(Base):
    __tablename__ = "onboarding_records"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Onboarding data
    job_links = Column(Text)  # JSON array of job links
    get_job_in_months = Column(Integer)  # Number of months
    daily_time_commitment = Column(Float)  # Hours per day
    learning_style = Column(String(100), nullable=True)  # e.g., "visual", "hands-on"
    career_transition = Column(String(255), nullable=True)  # Transition type
    budget = Column(Float, nullable=True)  # Budget for upskilling
    
    # N8N workflow data
    n8n_response = Column(JSON, nullable=True)  # Store the JSON from N8N
    n8n_workflow_id = Column(String(255), nullable=True)  # Track which workflow
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="onboarding_records")
