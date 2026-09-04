(function () {
  const scriptTag = document.currentScript;
  const apiKey = scriptTag.getAttribute('data-api-key');
  const backendUrl = scriptTag.getAttribute('data-backend-url') || 'http://localhost:8080/api';

  if (!apiKey) {
    console.error('FeedbackHub Widget: Missing data-api-key attribute.');
    return;
  }

  // Create floating button
  const button = document.createElement('button');
  button.innerText = '💬 Feedback';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4f46e5;
    color: white;
    border: none;
    padding: 12px 18px;
    border-radius: 25px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
  `;

  // Create popup modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    display: none;
    position: fixed;
    bottom: 70px;
    right: 20px;
    width: 320px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    padding: 16px;
    z-index: 10000;
    font-family: sans-serif;
  `;

  modal.innerHTML = `
    <h4 style="margin: 0 0 10px 0; font-size: 16px;">Send Feedback</h4>
    <textarea id="fh-msg" placeholder="What's on your mind?" style="width: 100%; height: 70px; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 6px; padding: 6px; font-size: 13px;"></textarea>
    <input id="fh-email" type="email" placeholder="Your email (optional)" style="width: 100%; margin-bottom: 8px; border: 1px solid #ccc; border-radius: 6px; padding: 6px; font-size: 13px;" />
    <select id="fh-category" style="width: 100%; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 6px; padding: 6px; font-size: 13px;">
      <option value="GENERAL">General</option>
      <option value="BUG">Bug</option>
      <option value="FEATURE_REQUEST">Feature Request</option>
      <option value="PRAISE">Praise</option>
    </select>
    <button id="fh-submit" style="width: 100%; background: #4f46e5; color: white; border: none; padding: 8px; border-radius: 6px; font-weight: bold; cursor: pointer;">Submit</button>
  `;

  document.body.appendChild(button);
  document.body.appendChild(modal);

  button.onclick = () => {
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
  };

  modal.querySelector('#fh-submit').onclick = async () => {
    const message = modal.querySelector('#fh-msg').value;
    const userEmail = modal.querySelector('#fh-email').value;
    const category = modal.querySelector('#fh-category').value;

    if (!message.trim()) return alert('Please write a message.');

    try {
      const res = await fetch(`${backendUrl}/feedback/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, message, userEmail, category, priority: 'MEDIUM' })
      });

      if (res.ok) {
        alert('Feedback sent successfully!');
        modal.querySelector('#fh-msg').value = '';
        modal.style.display = 'none';
      }
    } catch (err) {
      alert('Failed to submit feedback.');
    }
  };
})();