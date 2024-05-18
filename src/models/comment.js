const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    data: { type: Date, default: Date.now }
});

commentSchema.methods.joiValidate = function(obj){
    const Joi = require('joi');
    const schema = Joi.object({
        taskId: Joi.string().required(),
        userId: Joi.string().required(),
        content: Joi.string().min(2).max(500).required(),
        data: Joi.date()
    });
    return schema.validate(obj);
}

module.exports = mongoose.model('Comment', commentSchema);