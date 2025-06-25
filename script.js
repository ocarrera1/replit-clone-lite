#ai-box {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #111;
}
#ai-input {
  padding: 10px;
  font-size: 14px;
  resize: vertical;
  min-height: 60px;
  margin-bottom: 10px;
  border: none;
}
#ai-generate-btn {
  background: #4caf50;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
}

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
