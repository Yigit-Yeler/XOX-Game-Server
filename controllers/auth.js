import User from "../models/User.js";
import mongoose from "mongoose";

export const register = async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)
    try {
        await user.save()
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }
}