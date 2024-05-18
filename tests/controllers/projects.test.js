const projectsService = require('../../src/services/projects');
const httpError = require('../../src/utils/httpErrors');
const ProjectsController = require('../../src/controllers/projects');

jest.mock('../../src/services/projects');

describe('Projects Controller', () => {
  describe('projects_get_all', () => {
    it('should return all projects', async () => {
      const mockProjects = [
        { _id: '1', name: 'Project 1', ownerId: { firstName: 'John', lastName: 'Doe' }, description: 'Description 1' },
        { _id: '2', name: 'Project 2', ownerId: { firstName: 'Jane', lastName: 'Doe' }, description: 'Description 2' }
      ];
      projectsService.getProjects.mockResolvedValue(mockProjects);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      await ProjectsController.projects_get_all(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        count: mockProjects.length,
        projects: mockProjects.map(project => ({
          id: project._id,
          name: project.name,
          owner: project.ownerId.firstName + ' ' + project.ownerId.lastName,
          description: project.description,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/projects/' + project._id
          }
        }))
      });
    });
  });

  describe('projects_create_project', () => {
    it('should create a project', async () => {
      const mockProject = {
        _id: '1',
        name: 'Project 1',
        ownerId: { firstName: 'John', lastName: 'Doe' },
        description: 'Description 1'
      };
      projectsService.createProject.mockResolvedValue(mockProject);

      const req = { body: mockProject };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      await ProjectsController.projects_create_project(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Project created successfully!',
        createdProject: {
          id: mockProject._id,
          name: mockProject.name,
          owner: mockProject.ownerId.firstName + ' ' + mockProject.ownerId.lastName,
          description: mockProject.description,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/projects/' + mockProject._id
          }
        }
      });
    });
  });

  describe('projects_get_project', () => {
    it('should return a project by id', async () => {
      const mockProject = {
        _id: '1',
        name: 'Project 1',
        ownerId: { firstName: 'John', lastName: 'Doe' },
        description: 'Description 1'
      };
      projectsService.getProject.mockResolvedValue(mockProject);

      const req = { params: { projectId: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      await ProjectsController.projects_get_project(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        project: mockProject,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/projects'
        }
      });
    });

    it('should return 400 if project not found', async () => {
      projectsService.getProject.mockResolvedValue(null);

      const req = { params: { projectId: '1' } };
      const res = {};
      const next = jest.fn();

      await ProjectsController.projects_get_project(req, res, next);

      expect(next).toHaveBeenCalledWith(new httpError(400, "No project with id 1 found"));
    });
  });

  describe('projects_update_project', () => {
    it('should update a project', async () => {
      const mockProject = {
        projectId: '1',
        name: 'Updated Project',
        ownerId: { firstName: 'John', lastName: 'Doe' },
        description: 'Updated Description'
      };
      projectsService.updateProject.mockResolvedValue(mockProject);

      const req = { params: { projectId: '1' }, body: mockProject };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      await ProjectsController.projects_update_project(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Project updated',
        request: {
          type: 'GET',
          url: `http://localhost:3000/projects/${mockProject.projectId}`
        }
      });
    });
  });

  describe('projects_delete_project', () => {
    it('should delete a project', async () => {
      const mockProject = {
        projectId: '1',
        name: 'Deleted Project',
        ownerId: { firstName: 'John', lastName: 'Doe' },
        description: 'Deleted Description'
      };
      projectsService.deleteProject.mockResolvedValue(mockProject);

      const req = { params: { projectId: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      await ProjectsController.projects_delete_project(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Project deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/projects/',
          body: { name: 'String', ownerId: 'String', description: 'String' }
        }
      });
    });
  });
});
