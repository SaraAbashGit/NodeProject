const User=require('../models/userModel')
const bcrypt=require('bcrypt')

const fsPromises=require('fs').promises;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path=require('path')

const LogIn = async (req, res) => {
    try {
        const { fullname, password } = req.body;

        if (!fullname || !password) {
            return res.status(400).json({ "message": "The fullname or password weren't sent" });
        }

        const foundUser = await User.findOne({ fullname }).exec();

        if (!foundUser) {
            return res.sendStatus(401);
        }

        
         const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const accessToken = jwt.sign(
                { "fullname": foundUser.fullname },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );

            const refreshToken = jwt.sign(
                { "fullname": foundUser.fullname},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '10D' }
            );

            foundUser.refreshToken = refreshToken;
            await foundUser.save();

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            return res.json({
                fullname: foundUser.fullname,
                accessToken, 
                roles: foundUser.roles            
            });
        } else {
            return res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);       
        res.status(500).json({ "message": "Server Error" });
    }
}

module.exports = {LogIn };
