import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) return res.status(500).json({
            message: "Server error when bcrypt password"
        })
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
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
    })
}

export const login = async (req, res) => {
    User.find({ email: req.body.email }).exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "User not found"
                })
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) return res.status(401).json({
                    message: "Your password doesnt match"
                })

                if (result) {
                    const tokenParameters = {
                        id: user[0]._id.toString(),
                        username: user[0].username,
                        email: user[0].email
                    }

                    const token = jwt.sign(tokenParameters, process.env.JWT_KEY, { expiresIn: "1h" })
                    return res.status(200).json({
                        message: "Auth successfull",
                        token,
                        user
                    })
                }
            })
        })
}