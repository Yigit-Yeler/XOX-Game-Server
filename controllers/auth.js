import User from "../models/User.js";
import mongoose from "mongoose";
import sha1 from 'sha1'
export const register = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: sha1(req.body.password),
    })
    try {
        await user.save()
        res.status(200).json({
            message: "User registered succesfully"
        })
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }
}