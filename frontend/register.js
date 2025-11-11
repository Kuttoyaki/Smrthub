const API = '/api/register';
const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    username: document.getElementById('username').value.trim(),
    password: document.getElementById('password').value.trim(),
    fullname: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
  };

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      message.innerHTML = `<div class="alert alert-success">✅ สมัครสมาชิกสำเร็จ! โปรดเข้าสู่ระบบ</div>`;
      form.reset();
      setTimeout(() => window.location.href = 'login.html', 2000);
    } else {
      message.innerHTML = `<div class="alert alert-danger">❌ ${result.message}</div>`;
    }

  } catch (error) {
    message.innerHTML = `<div class="alert alert-danger">⚠️ ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้</div>`;
    console.error('Register Error:', error);
  }
});