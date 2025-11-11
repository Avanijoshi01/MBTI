# MBTI Server

Backend server for the MBTI Personality Predictor application.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (optional - server will work without it, but history won't be saved)

## Installation

```bash
npm install
```

## Running the Server

### Option 1: Using npm
```bash
npm start
```

### Option 2: Using Node directly
```bash
node index.js
```

### Option 3: Using the batch file (Windows)
```bash
start-server.bat
```

## Configuration

The server uses the following defaults:
- **Port**: 4000
- **MongoDB URI**: `mongodb://127.0.0.1:27017/mbti_app`

You can override these by setting environment variables:
- `PORT`: Server port (default: 4000)
- `MONGO_URI`: MongoDB connection string

## MongoDB Setup (Optional)

The server will work without MongoDB, but user history and answer tracking won't be saved.

To use MongoDB:
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. The server will automatically connect on startup

## API Endpoints

### Questions
- `GET /questions/start` - Get the first question
- `GET /questions/:id` - Get a question by ID

### Answers
- `POST /answers/submit` - Submit quiz answers
- `GET /answers/history/:userId` - Get user's quiz history

## Notes

- The server will continue to run even if MongoDB is not available
- Questions route works without MongoDB
- Answer submission will return predictions even without MongoDB (history won't be saved)

