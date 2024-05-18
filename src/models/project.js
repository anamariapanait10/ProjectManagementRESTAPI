const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true }
});

projectSchema.methods.joiValidate = function(obj){
    const Joi = require('joi');
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        ownerId: Joi.string().required(),
        description: Joi.string().max(500)
    });
    console.log("schema " + schema);
    return schema.validate(obj);
}

module.exports = mongoose.model('Project', projectSchema);