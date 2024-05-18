const Joi = require('joi');

const createCommentSchema = Joi.object({
    taskId: Joi.string().required(),
    userId: Joi.string().required(),
    content: Joi.string().min(2).max(500).required(),
    data: Joi.date()
});

const updateCommentSchema = Joi.object({
    taskId: Joi.string(),
    userId: Joi.string(),
    content: Joi.string().min(2).max(500),
    data: Joi.date()
}).min(1);

module.exports = { createCommentSchema, updateCommentSchema };