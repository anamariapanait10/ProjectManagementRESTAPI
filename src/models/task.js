const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    deadline: { type: Date, required: true }
});

taskSchema.methods.joiValidate = function(obj){
    const Joi = require('joi');
    const schema = Joi.object({
        projectId: Joi.string().required(),
        userId: Joi.string(),
        title: Joi.string().min(3).max(30).required(),
        description: Joi.string().max(500),
        status: Joi.string().required(),
        deadline: Joi.date().required()
    });
    return schema.validate(obj);
}

module.exports = mongoose.model('Task', taskSchema);