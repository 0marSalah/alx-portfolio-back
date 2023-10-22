import { body } from 'express-validator';

export const postProject = [
  body('name').exists().isString().withMessage('Name is required')
];

export const putProject = [
  body('name').isString().optional(),
  body('description').isString().optional(),
  body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'DONE'])
];
