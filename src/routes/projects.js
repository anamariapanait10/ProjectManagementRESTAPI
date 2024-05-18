const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth.js');
const validate = require('../middlewares/validate.js');
const projectsValidations = require('../validations/projects.js');
const ProjectsController = require('../controllers/projects.js');

/**
 * @swagger
 * /projects:
 *   get:
 *     description: Get list of projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: Get list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:               
 *                 $ref: '#/components/schemas/project'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/', checkAuth, ProjectsController.projects_get_all);

/**
 * @swagger
 * /projects:
 *   post:
 *     description: Create projects
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createProjectDTO'
 *     responses:
 *       201:
 *         description: Created project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/project'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.post('/', checkAuth, validate(projectsValidations.createProjectSchema), ProjectsController.projects_create_project);

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     description: Get projects by id
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project UUID
 *     responses:
 *       200:
 *         description: project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/project'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/:projectId', checkAuth, ProjectsController.projects_get_project);

/**
 * @swagger
 * /projects/{projectId}:
 *   patch:
 *     description: Update project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createProjectDTO'
 *     responses:
 *       200:
 *         description: Updated project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/project'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.patch('/:projectId', checkAuth, validate(projectsValidations.updateProjectSchema), ProjectsController.projects_update_project);

/**
 * @swagger
 * /projects/{projectId}:
 *   delete:
 *     description: Delete projects by id
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The UUID of the project to delete
 *     responses:
 *       200:
 *         description: project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/project'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 */
router.delete('/:projectId', checkAuth, ProjectsController.projects_delete_project);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   get:
 *     description: Get tasks for a specific project
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The project UUID
 *     responses:
 *       200:
 *         description: Get tasks for a specific project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:               
 *                 $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/:projectId/tasks', checkAuth, ProjectsController.projects_get_tasks);

module.exports = router;
