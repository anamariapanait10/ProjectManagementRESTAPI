const usersService = require('../services/users');
const tasksService = require('../services/tasks');

exports.users_get_all = async (req, res, next) => {
    try {
        const result = await usersService.getUsers();
        console.log(result);
        console.log(typeof result);
        res.status(200).json({
            count: result.length,
            users: result.map(user => {
                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    photo: user.photo,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + user._id
                    }
                }
            })
        });
    } catch (err) {
        next(err);
    }
};

exports.users_signup = async (req, res, next) => {
    try {
        if (req.file) {
            const photoBase64 = req.file.buffer.toString('base64');
            req.body.photo = photoBase64;
        }
        const body = Object.assign({}, req.body);
        const result = await usersService.signup(body);

        if (result.exists) {
            return res.status(409).json({
                message: 'Mail exists'
            });
        } else {
            const createdUser = result.result;
            res.status(201).json({
                message: 'User created!',
                createdUser: {
                    id: createdUser._id,
                    firstName: createdUser.firstName,
                    lastName: createdUser.lastName,
                    email: createdUser.email,
                    photo: createdUser.photo,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + createdUser._id
                    }
                },
            });
        }
    } catch (err) {
        next(err);
    }
};
    
exports.users_login = async (req, res, next) => {
    try {
        const result = await usersService.login(req.body);
        if (!result.auth) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        return res.status(200).json({
            message: 'Auth successful',
            token: result.token
        });
    } catch (err) {
        next(err);
    }
};

exports.users_get_user = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await usersService.getUserById(id);
        if (user) {
            res.status(200).json({
                user: user,
                request: {
                    type: 'GET',
                    description: 'Get all users',
                    url: 'http://localhost:3000/users'
                }
            });
        } else {
            res.status(404).json({ message: 'No valid entry found for provided ID' });
        }
    } catch (err) {
        next(err);
    }
};

exports.users_update_user = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const updateOps = {};

        for (const ops in req.body) {
            updateOps[ops] = req.body[ops];
        }
        await usersService.updateUser(id, updateOps);
        res.status(200).json({
            message: 'User updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/users/' + id
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.users_delete_user = async (req, res, next) => {
    try {
        const id = req.params.userId;
        await usersService.deleteUser(id);
        res.status(200).json({
            message: 'User deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/users',
                body: { firstName: 'String', lastName: 'String', email: 'String', password: 'String' }
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.users_get_tasks = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const tasks = await tasksService.getTasksByUserId(userId);
        
        res.status(200).json({
            count: tasks.length,
            tasks: tasks.map(task => ({
                id: task._id,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                projectId: task.projectId,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/tasks/' + task._id
                }
            }))
        });
    } catch (err) {
        next(err);
    }
};
