from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.models import User, OnboardingRecord, Resume
from app.utils import trigger_n8n_workflow
import json

router = APIRouter()

@router.post("/onboarding")
async def create_onboarding(
    job_link: str = Form(...),
    job_duration: int = Form(...),
    daily_commitment: float = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Handle onboarding form submission from React Native/Expo frontend.
    Accepts FormData with file upload.
    """
    
    try:
        # 1. Read resume file content
        resume_content = await resume.read()
        resume_text = resume_content.decode('utf-8', errors='ignore')  # Convert to text
        
        # 2. Extract user info from resume or use defaults
        # In production, parse resume properly
        email = "user@example.com"  # TODO: Get from resume or user input
        full_name = "User"  # TODO: Extract from resume
        
        # 3. Check if user exists
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            user = User(
                email=email,
                full_name=full_name,
                target_role=None,
                current_role=None
            )
            db.add(user)
            db.flush()
        
        db.commit()
        
        # 4. Store resume
        resume_record = Resume(
            user_id=user.id,
            resume_content=resume_text,
            resume_version="v1.0",
            file_type=resume.content_type or "pdf"
        )
        db.add(resume_record)
        db.commit()
        
        # 5. Prepare data for N8N
        onboarding_payload = {
            "user_id": user.id,
            "email": email,
            "full_name": full_name,
            "job_link": job_link,
            "job_duration": job_duration,
            "daily_commitment": daily_commitment,
            "resume_version": "v1.0"
        }
        
        # 6. Trigger N8N workflow
        n8n_response = await trigger_n8n_workflow(onboarding_payload)
        
        # 7. Store onboarding record
        onboarding_record = OnboardingRecord(
            user_id=user.id,
            job_links=json.dumps([job_link]),
            get_job_in_months=job_duration,
            daily_time_commitment=daily_commitment,
            n8n_response=n8n_response,
            n8n_workflow_id="n8n_workflow_001"
        )
        db.add(onboarding_record)
        db.commit()
        db.refresh(onboarding_record)
        
        # 8. Return response
        return {
            "success": True,
            "status": "success",
            "message": "Onboarding completed successfully",
            "user_id": user.id,
            "onboarding_id": onboarding_record.id,
            "analysis": n8n_response
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing onboarding: {str(e)}"
        )