# Up Down Jumper - Backend API

FastAPI backend for the Up Down Jumper upskilling application.

## Features

- RESTful API for onboarding profile management
- SQLite local database for data persistence
- File upload support for resumes (PDF format)
- CORS enabled for frontend communication

## Tech Stack

- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── database.py          # Database configuration and models
│   └── api/
│       └── v1/
│           ├── router.py    # API router configuration
│           └── endpoints/
│               └── onboarding.py  # Onboarding endpoints
├── data/                    # Database files (auto-created)
│   └── onboarding.db
├── requirements.txt         # Python dependencies
├── start.sh                # Start script
└── README.md
```

## Installation

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # OR
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

### Option 1: Using the start script (macOS/Linux)

```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual start

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # On macOS/Linux

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- **Local:** http://localhost:8000
- **Network:** http://0.0.0.0:8000

### API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## API Endpoints

### Health Check

```
GET /health
```

Returns server health status.

### Create Onboarding Profile

```
POST /api/v1/onboarding
Content-Type: multipart/form-data
```

**Parameters:**

- `job_link` (string, required) - Job description URL
- `job_duration` (string, required) - Target duration to get a job (e.g., "3 months")
- `daily_commitment` (string, required) - Daily learning commitment (e.g., "2 hours")
- `resume` (file, required) - Resume PDF file

**Response:**

```json
{
  "success": true,
  "message": "Profile created successfully",
  "profile_id": 1,
  "data": {
    "id": 1,
    "job_link": "https://example.com/job",
    "resume_filename": "resume.pdf",
    "job_duration": "3 months",
    "daily_commitment": "2 hours",
    "created_at": "2025-11-06T12:00:00"
  }
}
```

### Get Onboarding Profile

```
GET /api/v1/onboarding/{profile_id}
```

Returns a specific profile by ID.

### Get All Profiles

```
GET /api/v1/onboarding
```

Returns all onboarding profiles.

## Database

The application uses SQLite for local data storage. The database file is automatically created at `backend/data/onboarding.db`.

### Database Schema

**onboarding_profiles** table:

- `id` (INTEGER) - Primary key
- `job_link` (STRING) - Job description URL
- `resume_filename` (STRING) - Original filename of uploaded resume
- `resume_content` (TEXT) - Base64 encoded resume content
- `job_duration` (STRING) - Target job acquisition duration
- `daily_commitment` (STRING) - Daily learning commitment
- `created_at` (DATETIME) - Timestamp of profile creation

## Development

### Running in Development Mode

The `--reload` flag enables auto-reload on code changes:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Testing the API

You can test the API using:

1. **Swagger UI** (http://localhost:8000/docs)
2. **curl:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/onboarding" \
     -F "job_link=https://example.com/job" \
     -F "job_duration=3 months" \
     -F "daily_commitment=2 hours" \
     -F "resume=@/path/to/resume.pdf"
   ```
3. **Postman** or any other API client

## Troubleshooting

### Port Already in Use

If port 8000 is already in use, specify a different port:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8080
```

Don't forget to update the `API_URL` in the frontend accordingly.

### CORS Issues

If you encounter CORS errors, verify that the frontend origin is allowed in `app/main.py`. Currently, all origins are allowed (`allow_origins=["*"]`).

### Database Locked

If you get a "database is locked" error, ensure no other process is accessing the database file.

## Production Deployment

For production deployment, consider:

1. **Use a production-grade database** (PostgreSQL, MySQL)
2. **Remove `--reload` flag**
3. **Configure proper CORS origins**
4. **Add authentication and authorization**
5. **Use environment variables for configuration**
6. **Set up proper logging**
7. **Use a production ASGI server** (Gunicorn + Uvicorn workers)

Example production command:

```bash
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Environment Variables

Create a `.env` file for configuration (optional):

```env
DATABASE_URL=sqlite:///./data/onboarding.db
API_PORT=8000
CORS_ORIGINS=["http://localhost:8081", "exp://localhost:8081"]
```

## License

MIT

## Support

For issues or questions, please open an issue in the repository.
