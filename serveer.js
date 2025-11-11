import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'smartwatch_db'
});

// ✅ REGISTER API
app.post('/api/register', async (req, res) => {
  const { username, password, fullname, email } = req.body;

  if (!username || !password || !fullname || !email) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }

  // ตรวจสอบ username ซ้ำ
  db.query('SELECT * FROM member WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' });
    if (results.length > 0) return res.status(400).json({ message: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' });

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // เพิ่มข้อมูลสมาชิกใหม่
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

app.listen(4000, () => console.log('✅ Server running on http://localhost:4000'));