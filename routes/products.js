const express = require('express');
const router = express.Router();
const db = require('../db');

// ดึงสินค้าทั้งหมด
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM smartwatch_products';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ดึงสินค้าเฉพาะแบรนด์
router.get('/:brand', (req, res) => {
  const brand = req.params.brand;
  const sql = 'SELECT * FROM smartwatch_products WHERE brand = ?';
  db.query(sql, [brand], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// ดึงสินค้า Flagship (1 ตัวต่อแบรนด์)
router.get('/flagship/all', (req, res) => {
  const sql = `
    SELECT * FROM smartwatch_products WHERE 
      (brand = 'Apple' AND model = 'Apple Watch Ultra 2') OR
      (brand = 'Garmin' AND model = 'Fenix 7 Pro') OR
      (brand = 'Huawei' AND model = 'Watch Ultimate');
  `;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = router;