const Joi = require('joi');

const createUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const updateUserSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string(),
    photo: Joi.string()
}).min(1);

module.exports = { createUserSchema, loginUserSchema, updateUserSchema };