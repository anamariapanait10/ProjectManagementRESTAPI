const projectsService = require('../services/projects.js');
const tasksService = require('../services/tasks.js');
const httpError = require('../utils/httpErrors.js');

exports.projects_get_all = async (req, res, next) => {
    try {
        const result = await projectsService.getProjects();
        
        res.status(200).json({
            count: result.length,
            projects: result.map(project => {
                return {
                    id: project._id,
                    name: project.name,
                    owner: project.ownerId.firstName + ' ' + project.ownerId.lastName,
                    description: project.description,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/projects/' + project._id
                    }
                }
            })
        });
    } catch (err) {
        next(err);
    }
};

exports.projects_create_project = async (req, res, next) => {
    try {
        const result = await projectsService.createProject(req.body);

        res.status(201).json({
            message: 'Project created successfully!',
            createdProject: {
                id: result._id,
                name: result.name,
                owner: result.ownerId.firstName + ' ' + result.ownerId.lastName,
                description: result.description,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/projects/' + result._id
                }
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.projects_get_project = async (req, res, next) => {
    try {
        const result = await projectsService.getProject(req.params.projectId);
    
        if (!result) {
          return next(new httpError(400, "No project with id " + req.params.projectId + " found"));
        }

        res.status(200).json({
            project: result,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/projects'
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.projects_update_project = async (req, res, next) => {
    try {
        const result = await projectsService.updateProject(req.params.projectId, req.body);
        
        res.status(200).json({
            message: 'Project updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/projects/' + result.projectId 
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.projects_delete_project = async (req, res, next) => {
    try {
        await projectsService.deleteProject(req.params.projectId);
        res.status(200).json({
            message: 'Project deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/projects/',
                body: { name: 'String', ownerId: 'String', description: 'String' }
            }
        });
    } catch (err) {
        next(err);
    }
}

exports.projects_get_tasks = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const tasks = await tasksService.getTasks({projectId: projectId});
        
        res.status(200).json({
            count: tasks.count,
            tasks: tasks.tasks
        });
    } catch (err) {
        next(err);
    }
};