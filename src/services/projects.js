const Project = require('../models/project');
const mongoose = require('mongoose');

const getProjects = async () => {
    Project
        .find()
        .select('name ownerId description _id')
        .populate('ownerId', 'firstName lastName')
        .exec()
        .then(projects => {
            return projects;
        });
};

const createProject = async (projectInfo) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: projectInfo.name,
        ownerId: projectInfo.ownerId,
        description: projectInfo.description
    }); 
    project
        .save()
        .then(result => {
           return result;
        }); 
};

const getProject = async (projectId) => {
    Project
        .findById(projectId)
        .select('name ownerId description _id')
        .exec()
        .then(project => {
            return project;
        });
};

const updateProject = async (projectId, projectInfo) => {
    const updateOps = {};
    Object.entries(projectInfo).forEach(
        ([key, value]) => updateOps[key] = value
    );
    Project
        .updateOne({_id: projectId}, { $set: updateOps })
        .exec()
        .then(result => {
            return result;
        });
};

const deleteProject = async (projectId) => {
    Project.deleteOne({_id: projectId})
    .exec()
    .then(result => {
       return result;
    });
};

module.exports = {createProject, getProjects, getProject, updateProject, deleteProject};