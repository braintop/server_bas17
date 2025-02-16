// ייבוא מודל המשתמש
const User = require('./UserModel');

// פונקציה להרשמת משתמש חדש
const register = async (req, res) => {
    try {
        // בדיקה אם המשתמש כבר קיים במערכת
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // יצירת משתמש חדש
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday,
            password: req.body.password,
            permission: 'user' // הרשאת ברירת מחדל
        });

        // שמירת המשתמש במסד הנתונים
        const savedUser = await newUser.save();

        // החזרת תשובת הצלחה
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            }
        });

    } catch (error) {
        // טיפול בשגיאות
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
};

// ייצוא הפונקציות
module.exports = {
    register
};
