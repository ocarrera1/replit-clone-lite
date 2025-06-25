document.getElementById('ai-generate-btn').addEventListener('click', async () => {
  const prompt = document.getElementById('ai-input').value.trim();
  if (!prompt) return alert("Please enter a prompt.");

  // 🔐 Call your own backend instead of OpenAI directly
  const response = await fetch("https://your-backend.com/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  const generatedCode = data.code || "// No code generated.";
  window.editor.setValue(generatedCode.trim());
});

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' }});
require(['vs/editor/editor.main'], function () {
  window.editor = monaco.editor.create(document.getElementById('editor'), {
    value: "// Write your JavaScript code here\nconsole.log('Hello World');",
    language: 'javascript',
    theme: 'vs-dark'
  });
});

document.getElementById('run-btn').addEventListener('click', () => {
  const code = window.editor.getValue();
  try {
    const result = eval(code);
    document.getElementById('output').textContent = result ?? 'Code executed.';
  } catch (err) {
    document.getElementById('output').textContent = err.toString();
  }
});
