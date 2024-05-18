const express = require('express');
const projectRoutes = require('./projects.js');
const taskRoutes = require('./tasks.js');
const commentRoutes = require('./comments.js');
const userRoutes = require('./users.js');

const router = express.Router();
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;