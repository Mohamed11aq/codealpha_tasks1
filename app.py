"""
CodeAlpha - Artificial Intelligence Internship
Task 1: Language Translation Tool

A Flask web app that translates text between languages using the
deep-translator library (Google Translate backend, no API key required).
"""

from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator
from deep_translator.exceptions import LanguageNotSupportedException

app = Flask(__name__)

# Languages offered in the UI: (code, display name)
LANGUAGES = [
    ("en", "English"),
    ("ar", "Arabic"),
    ("fr", "French"),
    ("es", "Spanish"),
    ("de", "German"),
    ("it", "Italian"),
    ("tr", "Turkish"),
    ("ru", "Russian"),
    ("zh-CN", "Chinese"),
    ("ja", "Japanese"),
    ("ko", "Korean"),
    ("pt", "Portuguese"),
    ("hi", "Hindi"),
    ("ur", "Urdu"),
    ("nl", "Dutch"),
    ("fa", "Persian"),
]


@app.route("/")
def index():
    """Render the main translator page."""
    return render_template("index.html", languages=LANGUAGES)


@app.route("/translate", methods=["POST"])
def translate():
    """
    Translate the text sent in the JSON body.

    Expected JSON body:
        {
            "text": "Hello world",
            "source": "en",   # or "auto"
            "target": "ar"
        }

    Returns JSON:
        { "translated_text": "..." }  on success
        { "error": "..." }            on failure
    """
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()
    source = data.get("source") or "auto"
    target = data.get("target") or "en"

    if not text:
        return jsonify({"error": "Please enter some text to translate."}), 400

    if len(text) > 1000:
        return jsonify({"error": "Text is too long. Limit is 1000 characters."}), 400

    try:
        translated_text = GoogleTranslator(source=source, target=target).translate(text)
        return jsonify({"translated_text": translated_text})
    except LanguageNotSupportedException:
        return jsonify({"error": "One of the selected languages is not supported."}), 400
    except Exception:
        return jsonify({"error": "Translation failed. Please check your internet connection and try again."}), 500


if __name__ == "__main__":
    app.run(debug=True)
