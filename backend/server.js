const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { email: "user1@example.com", password: "password123" },
    { email: "user3@example.com", password: "securepass" },
    { email: "user2@example.com", password: "moresecuredpass" },
    { email: "user4@example.com", password: "mysecretpassword" }
];

app.put('/update-user', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found." });
    }

    users[userIndex].password = password;
    res.json({ message: "User data updated successfully.", user: users[userIndex] });
});

app.delete('/delete-user', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found." });
    }

    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully." });
});

app.get('/get-user', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User found.", user });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({ message: "Login successful.", user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
