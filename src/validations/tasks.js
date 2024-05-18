const Joi = require('joi');

const createTaskSchema = Joi.object({
    projectId: Joi.string().required(),
    userId: Joi.string(),
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().max(500),
    status: Joi.string().valid('todo', 'inprogress', 'done', 'closed').required(),
    dueDate: Joi.date()
});

const updateTaskSchema = Joi.object({
    projectId: Joi.string(),
    userId: Joi.string(),
    title: Joi.string().min(3).max(30),
    description: Joi.string().max(500),
    status: Joi.string().valid('todo', 'inprogress', 'done', 'closed'),
    dueDate: Joi.date()
}).min(1);

module.exports = { createTaskSchema, updateTaskSchema };