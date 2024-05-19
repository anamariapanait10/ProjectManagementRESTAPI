const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async () => {
    const users = await User
        .find()
        .select('firstName lastName email photo _id')
        .exec();

    return users;
};

const signup = async (userInfo) => {
    const existingUser = await User.find({ email: userInfo.email }).exec();
    if (existingUser.length >= 1) {
        return { exists: true };
    } else {
        const hash = await bcrypt.hash(userInfo.password, 10);
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            password: hash,
            photo: userInfo.photo
        });
        const result = await user.save();
        return { exists: false, result: result };
    }
};

const login = async (userInfo) => {
    const user = await User.find({ email: userInfo.email }).exec();
    if (user.length < 1) {
        return { auth: false };
    }
    const match = await bcrypt.compare(userInfo.password, user[0].password);
    console.log(match);
    if (match) {
        const token = jwt.sign(
            {
                email: user[0].email,
                userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: '1h'
            }
        );
        return { auth: true, token: token };
    } else {
        return { auth: false };
    }
};

const getUserById = async (id) => {
    const user = await User.findById(id).select('firstName lastName photo email _id').exec();
    return user;
};

const updateUser = async (id, updateOps) => {
    const result = await User.updateOne({ _id: id }, { $set: updateOps }).exec();
    return result;
};

const deleteUser = async (id) => {
    const result = await User.deleteOne({ _id: id }).exec();
    return result;
};

module.exports = {
    getUsers,
    signup,
    login,
    getUserById,
    updateUser,
    deleteUser
};
