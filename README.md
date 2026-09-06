# 🌐 CodeAlpha_LanguageTranslation

**CodeAlpha Artificial Intelligence Internship — Task 1: Language Translation Tool**

A simple AI-powered web app that translates text between languages, built with **Flask** and the **deep-translator** library (Google Translate backend, no API key required).

## Features

- Clean web interface to enter text and pick a source and target language
- Auto-detect source language option
- Translates text using `deep-translator`'s `GoogleTranslator`
- Displays the translated text clearly on the page
- **Bonus:** copy-to-clipboard button and text-to-speech playback for both the original and translated text
- Swap-languages button and live character counter

## Project structure

```
CodeAlpha_LanguageTranslation/
│
├── app.py                 # Flask backend and /translate API route
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html         # Main page (Jinja2 template)
├── static/
│   ├── style.css          # Styling
│   └── script.js          # Frontend logic (calls /translate)
└── README.md
```

## How it works

1. The user types text and selects a source and target language in the browser.
2. The frontend sends a `POST` request to `/translate` with the text and language codes.
3. The Flask backend calls `GoogleTranslator(source, target).translate(text)` from `deep-translator`.
4. The translated text is returned as JSON and displayed on the page.

## Setup and run locally

```bash
# 1. Clone the repository
git clone https://github.com/Mohamed11aq/CodeAlpha_LanguageTranslation.git
cd CodeAlpha_LanguageTranslation

# 2. Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate      # on Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
python app.py
```

Then open **http://127.0.0.1:5000** in your browser.

## Tech stack

- Python 3 / Flask
- deep-translator (Google Translate)
- HTML, CSS, JavaScript (vanilla)

## Author

Built as part of the **CodeAlpha Artificial Intelligence Internship**.
