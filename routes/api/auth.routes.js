const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path').join(__dirname, '../../uploads/default.jpeg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const valid = require('../middleware/valid.middleware');
const authValid = require('../validation/auth.validation');
const recoverPasswordValid = require('../validation/recoverPassword.validation');

const User = require('../../models/User');

// api/auth/signup
router.post('/signup', valid(authValid.signup, 'body'), async (req, res) => {
    try {
        const { firstName, lastName, username, email, mobileNumber, password, role } = req.body;

        if (!firstName || !lastName || !username || !email || !mobileNumber || !password || !role) {
            return res.status(401).json({ status: 'Please enter all fields' });
        }

        const userFound = await User.findOne({
            $or: [
                { 'username': username },
                { 'email': email },
                { 'mobileNumber': mobileNumber }
            ]
        });

        if (userFound) {
            return res.status(401).json({ status: 'This email, username or mobile number is already exists' });
        }

        const defaultImg = fs.readFileSync(path);
        const encode_defaultImg = defaultImg.toString('base64');

        const hashedPassword = await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err) => {
                if (err) throw err;
            });
        });

        const user = new User({
            firstName,
            lastName,
            username,
            email,
            mobileNumber,
            password: hashedPassword,
            role,
            avatarImg: {
                data: Buffer.from(encode_defaultImg, 'base64'),
                contentType: 'image/jpeg'
            }
        });

        await user.save();

        res.status(200).send({ _id: user._id });

    } catch (e) {
        res.status(500).json({ status: e.message });
    }
});

// api/auth/login
router.post('/login', valid(authValid.login, 'body'), async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(401).json({ status: 'Please fill in the login and password fields' });
        }

        const user = await User.findOne({
            $or: [
                { 'email': login },
                { 'username': login }
            ]
        });

        if (!user) {
            return res.status(400).json({ status: 'User not found' });
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (!isMatch) return res.status(400).json({ status: 'Invalid credentials' });
        });

        const jwt_token = jwt.sign(
            { _id: user._id },
            config.get('jwtSecret')
        );

        res.header('authorization', jwt_token);

        res.status(200).send(jwt_token);

    } catch (e) {
        res.status(500).json({ status: e.message });
    }
});

// api/user/recoverPassword
router.put('/recoverPassword', valid(recoverPasswordValid.recover, 'body'), async (req, res) => {
    try {
        const { userId, newPassword } = req.body;

        const hashedPassword = await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err) => {
                if (err) throw err;
            });
        });

        await User.findOneAndUpdate({
            _id: userId
        }, {
            password: hashedPassword
        }, { new: true });

        res.status(200).json({ status: 'successful updated password' });

    } catch (e) {
        res.status(500).json({ status: e.message });
    }
});

// api/auth/recoverPasswordCheckUser
router.post('/recoverPasswordCheckUser', valid(recoverPasswordValid.checkUser, 'body'), async (req, res) => {
    try {
        const { username, email, firstName, lastName, mobileNumber } = req.body;

        const user = await User.findOne({
            $and: [
                { username },
                { email },
                { firstName },
                { lastName },
                { mobileNumber }
            ]
        });

        if (!user) {
            return res.status(403).send('Nothing');
        }

        res.status(200).send(user);

    } catch (e) {
        res.status(500).json({ status: e.message });
    }
});

module.exports = router;