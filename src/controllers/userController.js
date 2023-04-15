const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({email: email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exist'});
        }
        const hasedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hasedPassword
        });

        const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET);
        return res.status(200).json({user: result, token: token});
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

const reset = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser) {
            return res.status(400).json({message: 'Invalid email'});
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.findByIdAndUpdate(existingUser._id, {
            email: email,
            password: hasedPassword
        });

        return res.status(200).json({message: 'Password has been updated'});
    } catch(error) {
        return res.status(500).json({message: 'Something went wrong'});
    }
}

const signing = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser) {
            return res.status(400).json({message: 'Invalid email'});
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchPassword) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({email: email, id: existingUser._id}, process.env.SECRET);
        return res.status(200).json({user: existingUser, token: token});
    } catch(error) {
        return res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = { signup, reset, signing };