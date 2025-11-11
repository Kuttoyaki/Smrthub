document.addEventListener('DOMContentLoaded', () => {
  const API = '/api/login';
  const form = document.getElementById('loginForm');
  const message = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      username: document.getElementById('username').value.trim(),
      password: document.getElementById('password').value.trim()
    };

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok && result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        message.innerHTML = `<div class="alert alert-success">✅ เข้าสู่ระบบสำเร็จ! กำลังนำทาง...</div>`;
        window.location.href = "/index.html";
      } else {
        message.innerHTML = `<div class="alert alert-danger">❌ ${result.message || 'Login failed'}</div>`;
      }
    } catch (error) {
      console.error('Login Error:', error);
      message.innerHTML = `<div class="alert alert-danger">⚠️ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้</div>`;
    }
  });
});
