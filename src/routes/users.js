const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const multer = require('multer');
const validate = require('../middlewares/validate.js');
const usersValidations = require('../validations/users.js');
const UsersController = require('../controllers/users');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get list of users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/', checkAuth, UsersController.users_get_all);

/**
 * @swagger
 * /users/signup:
 *   post:
 *     description: Create users
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *        201:
 *          description: Created user
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *        400:
 *          description: Bad request
 *        500:
 *          description: General error 
 */
router.post('/signup', upload.single('photo'), validate(usersValidations.createUserSchema), UsersController.users_signup);

/**
 * @swagger
 * /users/login:
 *   post:
 *     description: Login users
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUserDTO'
 *     responses:
 *       200: 
 *         description: Login user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Bad request 
 *       500:
 *         description: General error 
 */
router.post('/login', validate(usersValidations.loginUserSchema), UsersController.users_login);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     description: Get users by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId  
 *         schema:
 *           type: string
 *         required: true
 *         description: The user UUID
 *     responses:
 *       200:
 *         description: user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/:userId', checkAuth, UsersController.users_get_user);

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     description: Update user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUserDTO'
 *     responses:
 *       200:
 *         description: Updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error
 */
router.patch('/:userId', checkAuth, validate(usersValidations.updateUserSchema), UsersController.users_update_user);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     description: Delete user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user UUID
 *     responses:
 *       200:
 *         description: Deleted user
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.delete('/:userId', checkAuth, UsersController.users_delete_user);

/**
 * @swagger
 * /users/{userId}/tasks:
 *   get:
 *     description: Get tasks assigned to the user by user ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of tasks assigned to the user
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
router.get('/:userId/tasks', checkAuth, UsersController.users_get_tasks);

module.exports = router;