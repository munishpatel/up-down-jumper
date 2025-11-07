from fastapi import APIRouter, Depends, File, UploadFile, Form, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
import base64
from ....database import get_db, OnboardingProfile

router = APIRouter()


@router.post("/onboarding")
async def create_onboarding_profile(
    job_link: str = Form(...),
    job_duration: str = Form(...),
    daily_commitment: str = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Create a new onboarding profile with job details and resume
    """
    try:
        # Read the resume file
        resume_content = await resume.read()
        resume_base64 = base64.b64encode(resume_content).decode('utf-8')

        # Create new profile
        new_profile = OnboardingProfile(
            job_link=job_link,
            resume_filename=resume.filename,
            resume_content=resume_base64,
            job_duration=job_duration,
            daily_commitment=daily_commitment
        )

        db.add(new_profile)
        db.commit()
        db.refresh(new_profile)

        return {
            "success": True,
            "message": "Profile created successfully",
            "profile_id": new_profile.id,
            "data": {
                "id": new_profile.id,
                "job_link": new_profile.job_link,
                "resume_filename": new_profile.resume_filename,
                "job_duration": new_profile.job_duration,
                "daily_commitment": new_profile.daily_commitment,
                "created_at": new_profile.created_at.isoformat()
            }
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error creating profile: {str(e)}")


@router.get("/onboarding/{profile_id}")
def get_onboarding_profile(profile_id: int, db: Session = Depends(get_db)):
    """
    Get an onboarding profile by ID
    """
    profile = db.query(OnboardingProfile).filter(
        OnboardingProfile.id == profile_id).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    return {
        "success": True,
        "data": {
            "id": profile.id,
            "job_link": profile.job_link,
            "resume_filename": profile.resume_filename,
            "job_duration": profile.job_duration,
            "daily_commitment": profile.daily_commitment,
            "created_at": profile.created_at.isoformat()
        }
    }


@router.get("/onboarding")
def get_all_profiles(db: Session = Depends(get_db)):
    """
    Get all onboarding profiles
    """
    profiles = db.query(OnboardingProfile).order_by(
        OnboardingProfile.created_at.desc()).all()

    return {
        "success": True,
        "count": len(profiles),
        "data": [
            {
                "id": profile.id,
                "job_link": profile.job_link,
                "resume_filename": profile.resume_filename,
                "job_duration": profile.job_duration,
                "daily_commitment": profile.daily_commitment,
                "created_at": profile.created_at.isoformat()
            }
            for profile in profiles
        ]
    }
