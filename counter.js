const express = require('express');
const router = express.Router();
const db = require('../db');

// ฟังก์ชันตรวจสอบว่าผู้ใช้งานเคยเข้าชมหรือยัง (ตาม IP/วัน)
router.post('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const today = new Date().toISOString().split('T')[0];

  // ตรวจสอบว่ามี record ของวันนี้และ IP นี้หรือยัง
  const checkSql = `SELECT * FROM counter WHERE page_name = 'home' AND visitor_ip = ? AND visit_date = ?`;
  db.query(checkSql, [ip, today], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      // ถ้ายังไม่มี -> บันทึกการเข้าใหม่
      const insertSql = `INSERT INTO counter (page_name, visitor_ip, visit_date, visit_count)
                         VALUES ('home', ?, ?, 1)
                         ON DUPLICATE KEY UPDATE visit_count = visit_count + 1`;
      db.query(insertSql, [ip, today], (err2) => {
        if (err2) throw err2;
        res.json({ status: 'new visitor counted' });
      });
    } else {
      res.json({ status: 'already counted today' });
    }
  });
});

module.exports = router;