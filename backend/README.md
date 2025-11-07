# Volo Backend - FastAPI

FastAPI backend for Volo job search upskilling platform with React Native/Expo frontend integration.

## 🚀 Quick Start

### 1. Setup Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Server

```bash
# Using start script
bash start.sh

# Or manually
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server will be available at: `http://localhost:8000`

## 📚 API Endpoints

### Health Check
```
GET /health
```

### Onboarding Submission
```
POST /api/v1/onboarding
Content-Type: application/json

{
  "email": "user@example.com",
  "full_name": "John Doe",
  "phone": "+1234567890",
  "current_role": "Junior Developer",
  "target_role": "Senior Data Scientist",
  "job_links": ["https://job1.com", "https://job2.com"],
  "get_job_in_months": 6,
  "daily_time_commitment": 2.5,
  "learning_style": "hands-on",
  "career_transition": "Career Switch",
  "budget": 500.0,
  "resume_content": "...",
  "resume_version": "v1.0",
  "file_type": "pdf"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Onboarding completed successfully",
  "user_id": 1,
  "onboarding_id": 1,
  "analysis": {
    // N8N workflow dummy response
  },
  "data": {
    "user": {...},
    "resume": {...}
  }
}
```

### Get User Onboarding Record
```
GET /api/v1/onboarding/{user_id}
```

### Get Latest Resume
```
GET /api/v1/user/{user_id}/resume
```

## 🗄️ Database

SQLite database (local development)

**Location:** `./volo.db`

**Tables:**
- `users` - User profiles
- `onboarding_records` - Onboarding data
- `resumes` - Resume versions

## 📋 Project Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI entry point
│   ├── database.py       # Database configuration
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── utils.py          # Helper functions (N8N integration)
│   └── routes/
│       └── onboarding.py # Onboarding endpoints
├── requirements.txt      # Dependencies
├── .env.example         # Environment template
├── start.sh             # Startup script
└── README.md
```

## 🔌 N8N Integration

Currently returns dummy JSON responses. To connect to real N8N:

1. Update `app/utils.py` - `trigger_n8n_workflow()` function
2. Replace dummy response with actual HTTP call to N8N webhook
3. Set `N8N_WEBHOOK_URL` in `.env`

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## 📱 React Native/Expo Integration

Frontend should send POST request to:

```
http://your-backend-url:8000/api/v1/onboarding
```

Example with Fetch API:

```javascript
const response = await fetch('http://localhost:8000/api/v1/onboarding', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    full_name: 'John Doe',
    // ... other fields
  })
});

const data = await response.json();
```

## 🛠️ Development

API Documentation available at:
- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc:** `http://localhost:8000/redoc`

## 📦 Dependencies

- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## ⚠️ Notes

- Currently using SQLite for local development
- N8N integration uses dummy responses (update for production)
- CORS is open to all origins (configure for production)
- Resume content stored as text (consider file storage service for production)

## 🚨 Firebase Alternative?

SQLite is sufficient for local development and MVP. For production, consider:
- **PostgreSQL** for scalability
- **Firebase** for serverless (easy deployment, built-in auth)
- **MongoDB** for flexibility

To switch databases, only update `DATABASE_URL` in `.env` file.

## 📝 License

MIT
