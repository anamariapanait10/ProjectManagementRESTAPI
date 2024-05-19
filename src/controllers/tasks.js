const tasksService = require('../services/tasks.js');
const commentsService = require('../services/comments.js');
const httpError = require('../utils/httpErrors.js');

exports.tasks_get_all = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, beforeDueDate, afterDueDate, status } = req.query;
        const paginationOptions = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            beforeDueDate: beforeDueDate,
            afterDueDate: afterDueDate,
            status: status
        };
        const result = await tasksService.getTasks(paginationOptions);
    
        res.status(200).json({
            count: result.length,
            totalPages: Math.ceil(result.count / paginationOptions.limit),
            currentPage: paginationOptions.page,
            tasks: result.tasks
        });
    } catch (err) {
        next(err);
    }
};

exports.tasks_create_task = async (req, res, next) => {
    try {
        const result = await tasksService.createTask(req.body);

        res.status(201).json({
            message: 'Task created successfully!',
            createdTask: {
                id: result._id,
                projectId: result.projectId,
                userId: result.userId,
                title: result.title,
                description: result.description,
                status: result.status,
                dueDate: result.deadline,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/tasks/' + result._id
                }
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.tasks_get_task = async (req, res, next) => {
    try {
        const result = await tasksService.getTask(req.params.taskId);
    
        if (!result) {
          return next(new httpError(400, "No task with id " + req.params.taskId + " found"));
        }

        res.status(200).json({
            task: result,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/tasks'
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.tasks_update_task = async (req, res, next) => {
    try {
        const result = await tasksService.updateTask(req.params.taskId, req.body);
        
        res.status(200).json({
            message: 'Task updated successfully!',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/tasks/' + result.taskId
            }
        });
    } catch (err) {
        next(err);
    }     
};

exports.tasks_delete_task = async (req, res, next) => {
    try {
        const result = await tasksService.deleteTask(req.params.taskId);
        res.status(200).json({
            message: 'Task deleted successfully!',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/tasks' + result._id,
                body: { projectId: 'ID', userId: 'ID', title: 'String', description: 'String', status: 'String', deadline: 'Date' }
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.tasks_get_comments = async (req, res, next) => {
    try {
        const taskId = req.params.taskId;
        const comments = await commentsService.getComments({taskId: taskId});
        
        res.status(200).json({
            count: comments.length,
            comments: comments.map(comment => ({
                id: comment._id,
                taskId: comment.taskId,
                userId: comment.userId,
                content: comment.content,
                createdAt: comment.createdAt,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/comments/' + comment._id
                }
            }))
        });
    } catch (err) {
        next(err);
    }
};