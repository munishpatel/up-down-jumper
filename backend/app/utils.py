import json
from typing import Dict, Any

def get_dummy_n8n_response(onboarding_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate a dummy N8N workflow response based on onboarding data.
    In production, this will call the actual N8N webhook.
    """
    
    dummy_response = {
        "status": "success",
        "workflow_id": "n8n_workflow_001",
        "message": "Onboarding analysis completed",
        "user_profile": {
            "target_role": onboarding_data.get("target_role", "Unknown"),
            "urgency": "high" if onboarding_data.get("get_job_in_months", 12) <= 3 else "medium",
            "availability_score": onboarding_data.get("daily_time_commitment", 0) / 8 * 100
        },
        "skill_gap_analysis": {
            "missing_skills": [
                "Python",
                "Data Analysis",
                "SQL",
                "Tableau"
            ],
            "proficiency_levels": {
                "Python": 30,
                "Data Analysis": 25,
                "SQL": 20,
                "Tableau": 0
            }
        },
        "recommended_learning_path": {
            "duration_weeks": onboarding_data.get("get_job_in_months", 6) * 4,
            "modules": [
                {
                    "name": "Python Fundamentals",
                    "duration_hours": 40,
                    "priority": "high",
                    "resources": [
                        "Coursera - Python for Data Analysis",
                        "DataCamp - Python Basics"
                    ]
                },
                {
                    "name": "SQL Mastery",
                    "duration_hours": 35,
                    "priority": "high",
                    "resources": [
                        "Mode Analytics SQL Tutorial",
                        "LeetCode SQL Problems"
                    ]
                },
                {
                    "name": "Data Visualization with Tableau",
                    "duration_hours": 30,
                    "priority": "medium",
                    "resources": [
                        "Tableau Public Gallery",
                        "Udemy - Tableau Complete Course"
                    ]
                },
                {
                    "name": "Statistical Analysis",
                    "duration_hours": 25,
                    "priority": "medium",
                    "resources": [
                        "Khan Academy Statistics",
                        "Coursera - Statistics with R"
                    ]
                }
            ]
        },
        "daily_schedule": {
            "total_hours": onboarding_data.get("daily_time_commitment", 2),
            "breakdown": {
                "theory": 40,  # percentage
                "practice": 45,
                "projects": 15
            }
        },
        "job_market_insights": {
            "avg_salary_target_role": 95000,
            "job_openings_count": 2847,
            "required_experience_months": 12,
            "top_companies": [
                "Google",
                "Microsoft",
                "Amazon",
                "Apple",
                "Meta"
            ]
        },
        "networking_recommendations": [
            {
                "type": "LinkedIn",
                "action": "Follow 20 data professionals in target companies"
            },
            {
                "type": "Community",
                "action": "Join local data science meetups"
            },
            {
                "type": "Conference",
                "action": "Attend tech conferences (Q2-Q3)"
            }
        ],
        "milestone_tracker": [
            {
                "milestone": "Complete Python & SQL",
                "target_date": "Week 8",
                "projects": 3
            },
            {
                "milestone": "Build Portfolio with 3 Projects",
                "target_date": "Week 16",
                "projects": 3
            },
            {
                "milestone": "Start Applying to Jobs",
                "target_date": "Week 20",
                "applications": "5+ per week"
            }
        ],
        "resume_optimization": {
            "suggestions": [
                "Add quantifiable achievements",
                "Highlight relevant technical skills",
                "Include portfolio links",
                "Tailor for ATS systems"
            ],
            "score": 65,
            "areas_to_improve": ["Technical Skills Section", "Projects Section"]
        },
        "timestamp": "2025-11-06T12:00:00Z"
    }
    
    return dummy_response

async def trigger_n8n_workflow(onboarding_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Trigger actual N8N workflow.
    For now, returns dummy response.
    In production, replace with actual HTTP call to N8N webhook.
    
    Example (production):
    ```
    import httpx
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://your-n8n-instance.com/webhook/volo-onboarding",
            json=onboarding_data,
            timeout=30
        )
        return response.json()
    ```
    """
    return get_dummy_n8n_response(onboarding_data)
