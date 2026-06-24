const User = require("../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER USER

const registerUser = async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;
        console.log("?Hello")
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await User.create({
                name,
                email,
                password: hashedPassword
            });

        res.status(201).json({
            success: true,
            message: "User Registered",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// LOGIN USER

const loginUser = async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token =
            jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET ALL USERS

const getUsers = async (req, res) => {
    try {

        const users =
            await User.find()
                .select("-password");

        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET USER BY ID

const getUserById = async (req, res) => {
    try {

        const user =
            await User.findById(
                req.params.id
            ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET PROFILE

const getProfile = async (req, res) => {
    try {

        const user =
            await User.findById(
                req.user.id
            ).select("-password");

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE USER

const updateUser = async (req, res) => {
    try {

        const user =
            await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Updated",
            data: user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// DELETE USER

const deleteUser = async (req, res) => {
    try {

        const user =
            await User.findByIdAndDelete(
                req.params.id
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getProfile,
    updateUser,
    deleteUser
};