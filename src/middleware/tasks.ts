import { body } from 'express-validator';

export const postTask = [
  body('name').exists().isString().withMessage('Name is required'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description is required'),
  body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'DONE'])
];

export const putTask = [
  body('name').isString().optional(),
  body('description').isString().optional(),
  body('status').optional().isIn(['TODO', 'IN_PROGRESS', 'DONE'])
];
