const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwtUtils');

const USER = { username: 'venkat', password: 'venkat' };

router.post('/login', (req, res) => {
    const { username, password } = req.body;


    if (username?.toLowerCase() === USER.username && password === USER.password) {
        const token = generateToken({ username });
        return res.json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
