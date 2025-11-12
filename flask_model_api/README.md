# Flask ML API Server

Flask API server that serves the trained MBTI personality prediction model.

## Prerequisites

- Python 3.7 or higher
- Trained model files: `mbti_pipeline.pkl` and `mbti_encoder.pkl`

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

Or if using a virtual environment:
```bash
# Activate your virtual environment first
pip install -r requirements.txt
```

## Running the Server

### Option 1: Using Python directly
```bash
python app.py
```

### Option 2: Using the batch file (Windows)
```bash
start-flask-api.bat
```

The server will start on port 5000.

## API Endpoints

### POST /predict
Predicts MBTI personality type from text input.

**Request:**
```json
{
  "text": "Your text here..."
}
```

**Response:**
```json
{
  "prediction": "INFP",
  "status": "success"
}
```

### GET /
Health check endpoint.

**Response:**
```json
{
  "message": "MBTI Personality Prediction API is running."
}
```

## Model Information

- **Model Type**: Trained pipeline (TF-IDF + Classifier)
- **Training Data**: MBTI dataset with personality types and posts
- **Output**: One of 16 MBTI personality types

## Notes

- The model expects text input (minimum 10 characters recommended)
- The server runs on port 5000 by default
- CORS is enabled to allow cross-origin requests

