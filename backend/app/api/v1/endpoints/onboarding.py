from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.schemas import OnboardingRequest, OnboardingResponse
from app.models import User, OnboardingRecord, Resume
from app.utils import trigger_n8n_workflow
import json

router = APIRouter()

@router.post("/onboarding")
async def create_onboarding(
    request: OnboardingRequest,
    db: Session = Depends(get_db)
):
    """
    Handle onboarding form submission from React Native/Expo frontend.
    
    1. Creates/updates user in database
    2. Stores resume version
    3. Triggers N8N workflow
    4. Returns analysis to frontend
    """
    
    try:
        # 1. Check if user exists, create or update
        user = db.query(User).filter(User.email == request.email).first()
        
        if not user:
            user = User(
                email=request.email,
                full_name=request.full_name,
                phone=request.phone,
                current_role=request.current_role,
                target_role=request.target_role
            )
            db.add(user)
            db.flush()  # Flush to get the user ID
        else:
            # Update existing user
            user.full_name = request.full_name
            user.phone = request.phone
            user.current_role = request.current_role
            user.target_role = request.target_role
        
        db.commit()
        
        # 2. Store resume version
        resume = Resume(
            user_id=user.id,
            resume_content=request.resume_content,
            resume_version=request.resume_version,
            file_type=request.file_type
        )
        db.add(resume)
        db.commit()
        
        # 3. Prepare data for N8N workflow
        onboarding_payload = {
            "user_id": user.id,
            "email": request.email,
            "full_name": request.full_name,
            "current_role": request.current_role,
            "target_role": request.target_role,
            "job_links": request.job_links,
            "get_job_in_months": request.get_job_in_months,
            "daily_time_commitment": request.daily_time_commitment,
            "learning_style": request.learning_style,
            "career_transition": request.career_transition,
            "budget": request.budget,
            "resume_version": request.resume_version
        }
        
        # 4. Trigger N8N workflow (currently dummy, will be real webhook)
        n8n_response = await trigger_n8n_workflow(onboarding_payload)
        
        # 5. Store onboarding record with N8N response
        onboarding_record = OnboardingRecord(
            user_id=user.id,
            job_links=json.dumps(request.job_links),
            get_job_in_months=request.get_job_in_months,
            daily_time_commitment=request.daily_time_commitment,
            learning_style=request.learning_style,
            career_transition=request.career_transition,
            budget=request.budget,
            n8n_response=n8n_response,
            n8n_workflow_id="n8n_workflow_001"
        )
        db.add(onboarding_record)
        db.commit()
        db.refresh(onboarding_record)
        
        # 6. Return response
        return {
            "status": "success",
            "message": "Onboarding completed successfully",
            "user_id": user.id,
            "onboarding_id": onboarding_record.id,
            "analysis": n8n_response,
            "data": {
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "current_role": user.current_role,
                    "target_role": user.target_role
                },
                "resume": {
                    "version": resume.resume_version,
                    "uploaded_at": resume.uploaded_at.isoformat()
                }
            }
        }
        
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing onboarding: {str(e)}"
        )

@router.get("/onboarding/{user_id}")
async def get_onboarding(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve onboarding record for a user
    """
    onboarding_record = db.query(OnboardingRecord).filter(
        OnboardingRecord.user_id == user_id
    ).first()
    
    if not onboarding_record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Onboarding record not found"
        )
    
    return {
        "status": "success",
        "data": {
            "id": onboarding_record.id,
            "job_links": json.loads(onboarding_record.job_links),
            "get_job_in_months": onboarding_record.get_job_in_months,
            "daily_time_commitment": onboarding_record.daily_time_commitment,
            "n8n_response": onboarding_record.n8n_response,
            "created_at": onboarding_record.created_at.isoformat()
        }
    }

@router.get("/user/{user_id}/resume")
async def get_latest_resume(user_id: int, db: Session = Depends(get_db)):
    """
    Get the latest resume version for a user
    """
    resume = db.query(Resume).filter(
        Resume.user_id == user_id
    ).order_by(Resume.id.desc()).first()
    
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No resume found for this user"
        )
    
    return {
        "status": "success",
        "data": {
            "id": resume.id,
            "version": resume.resume_version,
            "file_type": resume.file_type,
            "uploaded_at": resume.uploaded_at.isoformat(),
            "content": resume.resume_content  # Frontend can display/download
        }
    }
