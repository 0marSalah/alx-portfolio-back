import { Request, Response, Router } from 'express';
import { postProject, putProject } from './middleware/projects';
import { validInput } from './middleware/inputvalidator';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject
} from './handlers/projects';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask
} from './handlers/tasks';

const router = Router();

// projects routes
router.get('/projects', getProjects);

router.get('/projects/:id', getProject);

router.post('/projects', postProject, validInput, createProject);

router.put('/projects/:id', putProject, updateProject);

router.delete('/projects/:id', deleteProject);

// tasks routes
router.get('/tasks', getTasks);

router.get('/tasks/:id', getTask);

router.post('/tasks', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

export default router;
