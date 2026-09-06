const sourceSel = document.getElementById('sourceLang');
const targetSel = document.getElementById('targetLang');
const sourceText = document.getElementById('sourceText');
const output = document.getElementById('output');
const charCount = document.getElementById('charCount');
const statusMsg = document.getElementById('statusMsg');
const translateBtn = document.getElementById('translateBtn');

sourceText.addEventListener('input', () => {
  charCount.textContent = sourceText.value.length;
});

document.getElementById('clearSource').addEventListener('click', () => {
  sourceText.value = '';
  charCount.textContent = 0;
  sourceText.focus();
});

document.getElementById('swapBtn').addEventListener('click', () => {
  if (sourceSel.value === 'auto') return;
  const tmpLang = sourceSel.value;
  sourceSel.value = targetSel.value;
  targetSel.value = tmpLang;

  const tmpText = sourceText.value;
  sourceText.value = output.classList.contains('empty') ? '' : output.textContent;
  output.textContent = tmpText || 'Translation will appear here...';
  output.classList.toggle('empty', !tmpText);
  charCount.textContent = sourceText.value.length;
});

async function translate() {
  const text = sourceText.value.trim();
  if (!text) {
    statusMsg.textContent = 'Please enter some text to translate.';
    statusMsg.classList.add('error');
    return;
  }
  statusMsg.classList.remove('error');
  statusMsg.textContent = 'Translating...';
  translateBtn.disabled = true;
  translateBtn.textContent = '...';

  try {
    const res = await fetch('/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        source: sourceSel.value,
        target: targetSel.value
      })
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Translation failed.');

    output.textContent = data.translated_text;
    output.classList.remove('empty');
    statusMsg.textContent = 'Translated successfully.';
  } catch (err) {
    statusMsg.textContent = err.message || 'Something went wrong. Please try again.';
    statusMsg.classList.add('error');
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = 'Translate';
  }
}

translateBtn.addEventListener('click', translate);
sourceText.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') translate();
});

document.getElementById('copyOutput').addEventListener('click', async (e) => {
  if (output.classList.contains('empty')) return;
  try {
    await navigator.clipboard.writeText(output.textContent);
    const btn = e.currentTarget;
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1200);
  } catch (err) { /* clipboard permission denied — ignore */ }
});

function speak(text, lang) {
  if (!('speechSynthesis' in window) || !text) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
}

document.getElementById('listenSource').addEventListener('click', () => {
  speak(sourceText.value, sourceSel.value === 'auto' ? 'en' : sourceSel.value);
});
document.getElementById('listenOutput').addEventListener('click', () => {
  if (!output.classList.contains('empty')) speak(output.textContent, targetSel.value);
});
