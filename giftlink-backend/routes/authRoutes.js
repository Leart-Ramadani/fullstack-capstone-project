const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../db');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        const payload = { user: { id: newUser.insertedId } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken, email: req.body.email });
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        // findOne to locate the current user in the database
        const theUser = await collection.findOne({ email: req.body.email });

        if (theUser) {
            const isMatch = await bcryptjs.compare(req.body.password, theUser.password);
            if (!isMatch) {
                return res.status(404).json({ error: 'Wrong password' });
            }

            const payload = { user: { id: theUser._id.toString() } };
            const authtoken = jwt.sign(payload, JWT_SECRET);

            return res.json({
                authtoken,
                userName: theUser.firstName,
                userEmail: theUser.email
            });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

// Update user info
router.put('/update', async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const email = req.headers.email;
        if (!email) {
            return res.status(400).json({ error: "Email not found in the request headers" });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        // findOne to locate the current user before updating
        const existingUser = await collection.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        existingUser.firstName = req.body.name;
        existingUser.updatedAt = new Date();

        const updatedUser = await collection.findOneAndUpdate(
            { email },
            { $set: existingUser },
            { returnDocument: 'after' }
        );

        const payload = { user: { id: updatedUser._id.toString() } };
        const authtoken = jwt.sign(payload, JWT_SECRET);

        res.json({ authtoken });
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;