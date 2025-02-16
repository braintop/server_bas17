// ייבוא ספריית אקספרס והגדרת האפליקציה
let express = require('express');
let app = express();
// ייבוא ראוטר המשתמשים
const userRouter = require('./api/User/UserRouter');

// ייבוא מונגוס והגדרת חיבור למסד הנתונים
const mongoose = require('mongoose');
const uri = "mongodb+srv://david:Aa123456@cluster0.gqvy99x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// הגדרות חיבור למונגו
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// פונקציה להתחברות למסד הנתונים
async function run() {
    try {
        // יצירת חיבור למונגו עם הגדרות יציבות
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
run().catch(console.dir);

// גישה ל req.body 
app.use(express.json());
// הגדרת נתיבי המשתמש
app.use('/api/user', userRouter);

// נתיב ראשי
app.get('/', (req, res) => {
    res.send('Hello World');
});

// הפעלת השרת בפורט 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
