const Joi = require('joi');

const createProjectSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    ownerId: Joi.string().required(),
    description: Joi.string().max(500)
});

const updateProjectSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    ownerId: Joi.string(),
    description: Joi.string().max(500)
}).min(1);

module.exports = { createProjectSchema, updateProjectSchema };