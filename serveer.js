import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import counterRouter from './counter.js';
import productsRouter from './routes/products.js';

const app = express();
app.use(cors());
app.use(express.json());

// สำหรับ ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'frontend')));

// ส่งหน้า index.html สำหรับ /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ====================================================
// Database Connection
// ====================================================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartwatch_db'
});

// ====================================================
// ✅ REGISTER API
// ====================================================
app.post('/api/register', async (req, res) => {
  const { username, password, fullname, email } = req.body;

  if (!username || !password || !fullname || !email) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  db.query('SELECT * FROM member WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' });
    if (results.length > 0) return res.status(400).json({ message: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO member (username, password, fullname, email, role) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, fullname, email, 'user'],
      (err) => {
        if (err) return res.status(500).json({ message: 'ไม่สามารถบันทึกข้อมูลได้' });
        res.status(200).json({ message: 'สมัครสมาชิกสำเร็จ' });
      }
    );
  });
});

// ====================================================
// ✅ LOGIN API
// ====================================================
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM member WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' });
    if (results.length === 0) return res.status(401).json({ message: 'ไม่พบชื่อผู้ใช้ในระบบ' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      user: {
        member_id: user.member_id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  });
});

// ====================================================
// Counter API
// ====================================================
app.use('/api/counter', counterRouter);

// ====================================================
// Products API
// ====================================================
app.use('/api/products', productsRouter);

// ====================================================
// Get Member Count API
// ====================================================
app.get('/api/counter/total', (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM member', (err, results) => {
    if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' });
    res.json({ total: results[0].total || 0 });
  });
});

// ====================================================
// Start server
// ====================================================
const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
