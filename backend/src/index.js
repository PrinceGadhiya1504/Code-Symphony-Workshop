const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('../middleware/auth');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cookieParser());

const port = 3003;

const database = [
    {
        email: "prince@gmail.com",
        fullname: "Prince Gadhiya",
        password: "1234",
    },
    {
        email: "abc@gmail.com",
        fullname: "Abcd Efg",
        password: "abc", 
    }
];

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).send("Send all data");
    }
    const user = database.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ email }, "loginsecret", { expiresIn: '1h' });
    return res.status(200).cookie("token", token, { httpOnly: true }).json({ success: true, token, user });
});

app.get('/dashboard', auth, (req, res) => {
    const user = database.find(user => user.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.send(`Welcome to ${user.fullname} dashboard!`);
});

app.get('/profile', auth, (req, res) => {
    const user = database.find(user => user.email === req.user.email);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

app.listen(port, () => {
    console.log(`Server is started at Port no: ${port}`);
});
