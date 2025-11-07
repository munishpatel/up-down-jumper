import requests

# Test the onboarding endpoint
url = "http://localhost:8000/api/v1/onboarding"

# Sample resume file
with open("Munish_Patel_DataScience_AI_ML_Engineer.pdf", "rb") as f:
    files = {
        'resume': ('resume.pdf', f, 'application/pdf')
    }
    
    data = {
        'job_link': 'https://explore.jobs.netflix.net/careers/job/790312518946?microsite=netflix.com',
        'job_duration': '6',
        'daily_commitment': '2.5'
    }
    
    response = requests.post(url, files=files, data=data)
    print("Status:", response.status_code)
    print("Response:", response.json())