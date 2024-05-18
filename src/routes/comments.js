const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');
const validate = require('../middlewares/validate.js');
const commentsValidations = require('../validations/comments.js');
const CommentsController = require('../controllers/comments');

/**
 * @swagger
 * /comments:
 *   get:
 *     description: Get list of comments
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: Get list of commnets
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/', checkAuth, CommentsController.comments_get_all);

/**
 * @swagger
 * /comments:
 *   post:
 *     description: Create comments
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createCommentDTO'
 *     responses:
 *       201:
 *         description: Created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.post('/', checkAuth, validate(commentsValidations.createCommentSchema), CommentsController.comments_create_comment);

/**
 * @swagger
 * /comments/{commentId}:
 *   get:
 *     description: Get comments by id
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: Get comments by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.get('/:commentId', checkAuth, CommentsController.comments_get_comment);

/**
 * @swagger
 * /comments/{commentId}:
 *   patch:
 *     description: Update comments by id
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: Update comments by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.patch('/:commentId', checkAuth, validate(commentsValidations.updateCommentSchema), CommentsController.comments_update_comment);

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     description: Delete comments by id
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: Delete comments by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       400:
 *         description: Bad request
 *       500:
 *         description: General error 
 */
router.delete('/:commentId', checkAuth, CommentsController.comments_delete_comment);

module.exports = router;
