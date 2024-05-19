const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const validate = require('../middlewares/validate.js');
const tasksValidations = require('../validations/tasks.js');
const TasksController = require('../controllers/tasks.js');

/**
 * @swagger
 * /tasks:
 *   get:
 *     description: Get list of tasks
 *     tags: [Task]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [todo, inprogress, done, closed]
 *         description: The status of the task
 *       - in: query
 *         name: afterDueDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The after due date of the task
 *       - in: query
 *         name: beforeDueDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: The before due date of the task
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of tasks per page
 *     responses:
 *       200:
 *         description: Get list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/', checkAuth, TasksController.tasks_get_all);

/**
 * @swagger
 * /tasks:
 *   post:
 *     description: Create tasks
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createTaskDTO'
 *     responses:
 *       201:
 *         description: Created task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.post('/', checkAuth, validate(tasksValidations.createTaskSchema), TasksController.tasks_create_task);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     description: Get tasks by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task UUID
 *     responses:
 *       200:
 *         description: task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/:taskId', checkAuth, TasksController.tasks_get_task);

/**
 * @swagger
 * /tasks/{taskId}:
 *   patch:
 *     description: Update task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createTaskDTO'
 *     responses:
 *       200:
 *         description: Updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.patch('/:taskId', checkAuth, validate(tasksValidations.updateTaskSchema), TasksController.tasks_update_task);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     description: Delete tasks by id
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The UUID of the task to delete
 *     responses:
 *       200:
 *         description: task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/task'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 */
router.delete('/:taskId', checkAuth, TasksController.tasks_delete_task);

/**
 * @swagger
 * /tasks/{taskId}/comments:
 *   get:
 *     description: Get comments for a specific task
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: true
 *         description: The task UUID
 *     responses:
 *       200:
 *         description: Get comments for a specific task
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:               
 *                 $ref: '#/components/schemas/comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/:taskId/comments', checkAuth, TasksController.tasks_get_comments);

module.exports = router;