// ייבוא ספריית אקספרס
const express = require('express');
// יצירת ראוטר חדש
const router = express.Router();

// ייבוא בקר המשתמשים
const UserController = require('./UserController');

// הגדרת נתיב להרשמת משתמש חדש
router.post('/register', UserController.register);

// ייצוא הראוטר
module.exports = router;