const express = require('express');

const User = require('../../database/models/user.model');
const jwt = require('jsonwebtoken')
const validator = require('email-validator');
const Task = require('../../database/models/task.model');



const signin = async (req, res) => {
    const { email, password } = req.body;
    let errors = {};

    try {
        const user = await User.findOne({ email });
        if (!email) {
            errors.email = 'Email is required';
        }
        else if (!user) {
            errors.email = 'Email does not exist';
        if (!password) {
            errors.password = 'Password is required';
        } else {
           
            
            } 
                user.comparePassword(password, (err, match) => {
                    if (!match || err) {
                        errors.password = 'Password does not match';
                    }
                });
            
        }

        if (Object.keys(errors).length === 0) {
            const token = jwt.sign({ _id: user._id }, 'azizbensmida', {
                expiresIn: '24h'
            });

            return res.status(200).json({
                token,
                username: user.username,
                email: user.email,
                id: user._id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        } else {
            return res.status(400).json(errors);
        }
    } catch (error) {
        return res.status(400).send('Login failed');
    }
};


const register = async (req, res) => {
    let error = {};
    console.log(req.body);
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        
        if (!username) {
            error.username = 'Username is required';
        }
        
        if (!email) {
            error.email = 'Email is required';
        } else if (!validator.validate(email)) {
            error.email = 'Enter a valid email address';
        } else if (userExist) {
            error.email = 'Email is already taken';
        }
        
        if (!password) {
            error.password = 'Password is required';
        } else if (password.length < 6) {
            error.password = 'Password must be at least 6 characters';
        }
        
        if (Object.keys(error).length === 0) {
            const user = await new User({
                email,
                username,
                password,
            });
            await user.save();
            return res.status(200).send('User added successfully');
        } 
            console.log(error);
            return res.status(400).json(error);
        
    } catch (error) {
        return res.status(400).send('Error creating user');
    }
};



const UpdateProfile = async (req, res) => {
    let error = {}; // Change 'error' to 'error' for consistency

    const { _id, username, email, new_password, old_password } = req.body;

    try {
        const userExist = await User.findOne({ email });
        let user = await User.findOne({ _id });

        if (!user) {
            error.user = 'User not found'; // Change 'error' to 'error'
        }

        if (!username) {
            error.username = 'Username is required'; // Change 'error' to 'error'
        }

        if (!email) {
            error.email = 'Email is required'; // Change 'error' to 'error'
        } else if (!validator.validate(email)) {
            error.email = 'Enter a valid email'; // Change 'error' to 'error'
        } else if (userExist && userExist._id.toString() !== _id) {
            error.email = 'Email is taken'; // Change 'error' to 'error'
        }

        if (new_password) {
            if (new_password.length < 6) {
                error.new_password = 'New password must be at least 6 characters'; // Change 'error' to 'error'
            }
            user.password = new_password;
        }

        if (!old_password || old_password.length < 6) {
            error.old_password = 'Enter a valid password'; // Change 'error' to 'error'
        } else {
            user.comparePassword(old_password, async (err, match) => {
                if (!match || err) {
                    error.old_password = 'Old Password Incorrect'; // Change 'error' to 'error'
                }
            });
        }

        if (Object.keys(error).length === 0) {
            user.username = username;
            user.email = email;
            const updatedUser = await user.save();

            const token = jwt.sign({ _id: updatedUser._id }, 'azizbensmida', {
                expiresIn: '24h',
            });

            return res.status(200).send({
                token,
                username: updatedUser.username,
                email: updatedUser.email,
                id: updatedUser._id,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
            });
        }

        // Move this line to the end of the function
        console.log(error);
        return res.status(400).json(error);
    } catch (error) {
        return res.status(400).send('Update failed');
    }
};

module.exports = {
    UpdateProfile,
    signin,register
};