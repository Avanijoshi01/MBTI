from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import traceback

app = Flask(__name__)
CORS(app)

# Load your model and encoder
try:
    model = joblib.load("mbti_pipeline.pkl")
    encoder = joblib.load("mbti_encoder.pkl")
    print("✅ Model and encoder loaded successfully.")
except Exception as e:
    print("❌ Error loading model or encoder:", e)
    model, encoder = None, None

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not isinstance(text, str) or text.strip() == "":
            return jsonify({"error": "No text provided"}), 400

        # Predict MBTI
        pred_num = model.predict([text])[0]
        pred_label = encoder.inverse_transform([pred_num])[0]

        return jsonify({
            "prediction": pred_label,
            "status": "success"
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "MBTI Personality Prediction API is running."})


if __name__ == "__main__":
    app.run(port=5000, debug=True)