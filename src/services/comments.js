const mongoose = require('mongoose');
const Comment = require('../models/comment');

const getComments = async (params) => {
    console.log(params);
    const { taskId } = params;
    const query = {};
    console.log(taskId);
    if (taskId) {
        query.taskId = taskId;
    }
    console.log(query);

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

    const result = await comment.save();
    return result;
};

const getCommentById = async (id) => {
    const comment = await Comment.findById(id).populate('taskId', 'title').exec();
    return comment;
};

const updateComment = async (id, updateOps) => {
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
