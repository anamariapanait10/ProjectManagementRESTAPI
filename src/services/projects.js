const Project = require('../models/project');
const mongoose = require('mongoose');

const getProjects = async () => {
    const projects = await Project
        .find()
        .select('name ownerId description _id')
        .populate('ownerId', 'firstName lastName')
        .exec();
    return projects;
};

const createProject = async (projectInfo) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: projectInfo.name,
        ownerId: projectInfo.ownerId,
        description: projectInfo.description
    }); 
    let proj = await project.save();
    proj = await Project
        .findById(proj._id)
        .select('name ownerId description _id')
        .populate('ownerId', 'firstName lastName')
        .exec();
    return proj;    
};

const getProject = async (projectId) => {
    const project = await Project
        .findById(projectId)
        .select('name ownerId description _id')
        .exec();
    return project;    
};

const updateProject = async (projectId, projectInfo) => {
    const updateOps = {};
    Object.entries(projectInfo).forEach(
        ([key, value]) => updateOps[key] = value
    );
    const project = await Project
        .updateOne({_id: projectId}, { $set: updateOps })
        .exec();
        
    return project;    
};

const deleteProject = async (projectId) => {
    return await Project.deleteOne({_id: projectId}).exec();
};

module.exports = {createProject, getProjects, getProject, updateProject, deleteProject};