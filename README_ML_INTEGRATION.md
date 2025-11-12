# ML Model Integration Guide

## Overview

This project now uses **Machine Learning** to enhance MBTI personality predictions! The system combines:
1. **Rule-based scoring** from quiz answers
2. **ML model predictions** from trained model (trained on MBTI dataset)

## Architecture

```
Frontend (React) 
    ↓
Backend Server (Node.js/Express) 
    ↓
    ├─→ Rule-based Scoring (from quiz answers)
    └─→ ML Model API (Flask) ← Trained on mbti_1.csv dataset
    ↓
Hybrid Prediction (Combines both methods)
```

## ML Model Details

- **Training Data**: `dataset/mbti_1.csv` (MBTI types and user posts)
- **Model Files**: 
  - `flask_model_api/mbti_pipeline.pkl` (TF-IDF + Classifier pipeline)
  - `flask_model_api/mbti_encoder.pkl` (Label encoder)
- **Model Type**: Text classification model (trained on social media posts)
- **Accuracy**: Trained on dataset with 16 MBTI personality types

## How It Works

### 1. Adaptive Quiz Mode
- User answers quiz questions
- System collects question text + selected answers
- Combines into text: "Which of these do you prefer on a free weekend? Reading alone or quiet hobbies..."
- Sends to ML model API for prediction
- Combines ML prediction (60% weight) with rule-based scores (40% weight)
- Returns hybrid prediction

### 2. Typing-based Mode (Coming Soon)
- User writes free-form text
- Text is sent directly to ML model
- Returns ML prediction

## Setup Instructions

### Step 1: Start the Flask ML API

1. Navigate to the Flask API directory:
```bash
cd flask_model_api
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the Flask API server:
```bash
python app.py
```

Or on Windows:
```bash
start-flask-api.bat
```

The Flask API will run on **port 5000**.

### Step 2: Start the Node.js Backend

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on **port 4000**.

### Step 3: Start the Frontend

1. Navigate to the frontend directory:
```bash
cd mbti-frontend
```

2. Start the development server:
```bash
npm start
```

The frontend will run on **port 3000**.

## Running All Services

You need **3 terminals** running simultaneously:

1. **Terminal 1**: Flask ML API (port 5000)
   ```bash
   cd flask_model_api
   python app.py
   ```

2. **Terminal 2**: Node.js Backend (port 4000)
   ```bash
   cd server
   npm start
   ```

3. **Terminal 3**: React Frontend (port 3000)
   ```bash
   cd mbti-frontend
   npm start
   ```

## Fallback Behavior

- **If Flask API is not running**: The system will automatically fall back to rule-based prediction only
- **If Flask API is running**: The system will use hybrid ML + rule-based prediction
- The frontend will show an indicator when ML model is used

## API Endpoints

### Flask ML API (port 5000)

**POST /predict**
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

### Node.js Backend (port 4000)

**POST /answers/submit**
```json
{
  "userId": "demo_user",
  "answers": [
    {
      "qId": "start",
      "optionKey": "A",
      "traits": {"E": 1}
    }
  ],
  "typingText": "" // Optional
}
```

**Response:**
```json
{
  "prediction": "ENFP",
  "scores": {"E": 2.5, "N": 1.5, "F": 1.5, "P": 1.0},
  "mlPrediction": "ENFP",
  "method": "hybrid"
}
```

## Model Training

The ML model was trained using the Jupyter notebook:
- `MBTI_personality_prediction_model.ipynb`

The training process:
1. Loads MBTI dataset (`mbti_1.csv`)
2. Preprocesses text (cleaning, tokenization)
3. Vectorizes text (TF-IDF)
4. Trains classifier (Logistic Regression, XGBoost, etc.)
5. Saves model pipeline and encoder

## Performance

- **Rule-based only**: Fast, but limited accuracy
- **ML-enhanced (hybrid)**: Better accuracy by combining ML insights with quiz responses
- **ML model weight**: 60% (ML prediction) + 40% (rule-based scores)

## Troubleshooting

### Flask API not starting
- Check if Python dependencies are installed: `pip install -r requirements.txt`
- Verify model files exist: `mbti_pipeline.pkl` and `mbti_encoder.pkl`
- Check if port 5000 is available

### ML predictions not working
- Verify Flask API is running on port 5000
- Check server logs for connection errors
- System will fall back to rule-based if ML API is unavailable

### Model loading errors
- Ensure model files are in `flask_model_api/` directory
- Verify model files are not corrupted
- Check Python version (3.7+ required)

## Future Enhancements

- [ ] Implement typing-based test mode
- [ ] Add probability scores from ML model
- [ ] Fine-tune ML model weights
- [ ] Add model performance metrics
- [ ] Implement model versioning
- [ ] Add A/B testing for prediction methods

## Notes

- The ML model was trained on social media posts, so it works best with natural language text
- The hybrid approach combines the strengths of both methods
- The system gracefully degrades if ML API is unavailable
- All predictions are saved to MongoDB for analysis

