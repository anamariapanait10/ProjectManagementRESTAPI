const mongoose = require('mongoose');
const Comment = require('../models/comment');

const getComments = async (params) => {
    const { taskId } = params;
    const query = {};
    if (taskId) {
        query.taskId = taskId;
    }

    const comments = await Comment.find(query).select('taskId userId content _id').exec();
    return comments;
};

const createComment = async (commentData) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        taskId: commentData.taskId,
        userId: commentData.userId,
        content: commentData.content
    });

    var error = comment.joiValidate(commentData);
    if (error) {
        throw error;
    }

    const result = await comment.save();
    return result;
};

const getCommentById = async (id) => {
    const comment = await Comment.findById(id).populate('taskId', 'title').exec();
    return comment;
};

const updateComment = async (id, updateOps) => {
    var error = Comment.findById(id).joiValidate(updateOps);
    if (error) {
        throw error;
    }

    const result = await Comment.updateOne({ _id: id }, { $set: updateOps }).exec();
    return result;
};

const deleteComment = async (id) => {
    const result = await Comment.deleteOne({ _id: id }).exec();
    return result;
};

module.exports = {
    getComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
};
