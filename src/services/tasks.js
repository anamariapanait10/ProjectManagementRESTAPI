const Task = require('../models/task');
const mongoose = require('mongoose');

const getTasks = async (params) => {
    const { page, limit, beforeDueDate, afterDueDate, status } = params;
    const query = {};
    if (status) {
        query.status = status;
    }
    if (beforeDueDate && afterDueDate) {
        query.deadline = { $gt: new Date(afterDueDate), $lt: new Date(beforeDueDate) };
    }

    var tasks = await Task
    .find(query)
    .select('projectId userId title description status deadline _id')
    .skip((page - 1) * limit)
    .limit(limit)
    .exec();

    const count = await Task.countDocuments().exec();

    return {
        count: count,
        tasks: tasks.map(task => ({
            id: task._id,
            projectId: task.projectId,
            userId: task.userId,
            title: task.title,
            description: task.description,
            status: task.status,
            deadline: task.deadline,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/tasks/' + task._id
            }
        }))
    };
};

const createTask = async (taskInfo) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        projectId: taskInfo.projectId,
        userId: taskInfo.userId,
        title: taskInfo.title,
        description: taskInfo.description,
        status: taskInfo.status,
        deadline: taskInfo.deadline
    });
    return await task.save();
};

const getTask = async (taskId) => {
    return Task.findById(taskId).select('projectId userId title description status deadline _id').exec();
};

const updateTask = async (taskId, taskInfo) => {
    const updateOps = {};
    Object.entries(taskInfo).forEach(
        ([key, value]) => updateOps[key] = value
    );
    return await Task.updateOne({ _id: taskId }, { $set: updateOps }).exec();
};

const deleteTask = async (taskId) => {
    return await Task.deleteOne({ _id: taskId }).exec();
};

const getTasksByUserId = async (userId) => {
    const tasks = await Task.find({ userId: userId }).sort({ deadline: 1 }).exec();
    return tasks;
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask, getTasksByUserId };