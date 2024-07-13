from flask import Flask, request, jsonify
import cv2
import pytesseract
import numpy as np
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def preprocess_image(image):
    # Convert to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian blur to reduce noise
    blurred_image = cv2.GaussianBlur(gray_image, (5, 5), 0)

    return blurred_image

@app.route('/detect-aadhar', methods=['POST'])
def detect_aadhar():
    # Receive image file from frontend
    file = request.files['file']
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    # Read image using OpenCV
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Preprocess image
    processed_image = preprocess_image(image)

    # Perform text detection using a suitable technique (e.g., contours, text detection models)
    # Example using pytesseract (OCR)
    custom_config = r'--oem 3 --psm 6'
    extracted_text = pytesseract.image_to_string(processed_image, config=custom_config)

    # Example: Extract Aadhar card number using regex
    aadhar_number_pattern = r"\b\d{4}\s\d{4}\s\d{4}\b"
    aadhar_number_matches = re.findall(aadhar_number_pattern, extracted_text)
    if aadhar_number_matches:
        aadhar_number = aadhar_number_matches[0]
    else:
        aadhar_number = "Not found"

    # Example: Extract name using regex
    name_pattern = r"[A-Z][a-z]+(?: [A-Z][a-z]+)"
    name_matches = re.findall(name_pattern, extracted_text)
    if name_matches:
        name = name_matches[0].strip()
    else:
        name = "Not found"

    # Example: Extract DOB using regex
    dob_pattern = r"\d{2}/\d{2}/\d{4}"
    dob_matches = re.findall(dob_pattern, extracted_text)
    if dob_matches:
        dob = dob_matches[0]
    else:
        dob = "Not found"

    # Example: Extract address using regex (considering multiline address)
    address_pattern = r"""
    Address:\s*
    C/O:\s*(?P<co>[^,]+),\s*
    (?P<village1>[^,]+),\s*
    (?P<village2>[^,]+),?\s*
    (?P<district>[^,\n]+),?\s*
    (?P<state>[^-]+)-\s*
    (?P<pincode>\d+)
    """
    # address_pattern = r"[A-Z][a-z]+(?: [A-Z][a-z]+)"
    print("Extranct Data ==> ")
    print(extracted_text)


  

    # Return the detected information
    return jsonify({
        "aadhar_number": aadhar_number,
        "name": name,
        "dob": dob,
    })

if __name__ == '__main__':
    app.run(debug=True)
