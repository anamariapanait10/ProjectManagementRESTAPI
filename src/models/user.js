const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: { type: String, required: true },
    photo: { type: String }
});

userSchema.methods.joiValidate = function(obj){
    const Joi = require('joi');
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        photo: Joi.string()
    });
    return schema.validate(obj);
}

module.exports = mongoose.model('User', userSchema);