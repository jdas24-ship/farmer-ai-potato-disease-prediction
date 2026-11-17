
# Farmer AI - Potato Disease Prediction

An AI-powered web application that predicts potato leaf diseases using a Convolutional Neural Network (CNN).

## About the Project

Farmer AI helps identify potato leaf diseases by analyzing uploaded leaf images.

The application uses a trained deep learning model and a FastAPI backend to generate predictions.

## Features

- Upload potato leaf images
- Image preview
- Drag and drop image upload
- CNN-based disease prediction
- Confidence score
- FastAPI backend integration

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Python
- FastAPI
- Uvicorn

### AI / Machine Learning
- TensorFlow / Keras
- NumPy
- Pillow
- Convolutional Neural Network (CNN)

## Supported Predictions

1. Potato Early Blight
2. Potato Late Blight
3. Potato Healthy

## Project Structure

Farmer-AI/
├── frontend/
├── backend/
├── README.md
└── .gitignore

## How to Run

### 1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL

### 2. Install dependencies

pip install -r backend/requirements.txt

### 3. Start the backend

cd backend

uvicorn main:app --reload

### 4. Open the frontend

Run frontend/index.html using VS Code Live Server.

## Project Status

Development and testing in progress.

**Jivan Das**
GitHub: [@jdas24-ship](https://github.com/jdas24-ship)
