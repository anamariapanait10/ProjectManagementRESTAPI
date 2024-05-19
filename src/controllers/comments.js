const commentsService = require('../services/comments');

exports.comments_get_all = async (req, res, next) => {
    try {
        const result = await commentsService.getComments({});
        const response = {
            count: result.length,
            comments: result.map(comm => {
                return {
                    id: comm._id,
                    taskId: comm.taskId,
                    userId: comm.userId,
                    content: comm.content,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/comments/' + comm._id
                    }
                };
            })
        };
        res.status(200).json(response);
    } catch (err) {
        next(err);
    }
};

exports.comments_create_comment = async (req, res, next) => {
    try {
        const result = await commentsService.createComment(req.body);
        res.status(201).json({
            message: 'Comment created successfully!',
            createdComment: {
                taskId: result.taskId,
                userId: result.userId,
                content: result.content,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/comments/' + result._id
                }
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.comments_get_comment = async (req, res, next) => {
    try {
        const id = req.params.commentId;
        const comment = await commentsService.getCommentById(id);
        if (comment) {
            res.status(200).json({
                comment: comment,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/comments'
                }
            });
        } else {
            res.status(404).json({ message: 'No valid entry found for provided ID' });
        }
    } catch (err) {
        next(err);
    }
};

exports.comments_update_comment = async (req, res, next) => {
    try {
        const id = req.params.commentId;
        await commentsService.updateComment(id, req.body);
        res.status(200).json({
            message: 'Comment updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/comments/' + id
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.comments_delete_comment = async (req, res, next) => {
    try {
        const id = req.params.commentId;
        await commentsService.deleteComment(id);
        res.status(200).json({
            message: 'Comment deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/comments',
                body: { taskId: 'ID', userId: 'ID', content: 'String' }
            }
        });
    } catch (err) {
        next(err);
    }
};
