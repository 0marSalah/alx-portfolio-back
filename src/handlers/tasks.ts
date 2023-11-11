import { Response } from 'express';
import { Req } from '../types/api';
import prisma from '../prismaconnect';
import { isValidComingDate } from './projects';

export const createTask = async (req: Req, res: Response) => {
  try {
    const { name, description, status, startDate, endDate } = req.body;

    if (startDate && endDate) {
      if (!isValidComingDate(startDate, endDate)) {
        return res.status(400).json({
          status: 'failed',
          error: 'invalid Date.'
        });
      }
    }

    const task = await prisma.task.create({
      data: {
        name,
        description,
        status,
        startDate,
        endDate,
        user: {
          connect: {
            id: req?.user?.id
          }
        },
        projects: req?.body.projectId && {
          connect: {
            id: req.body.projectId
          }
        }
      }
    });
    res.json({ status: 'success', data: task });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
  }
};

export const getTasks = async (req: Req, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id
      },
      include: {
        tasks: true
      }
    });
    res.json({ status: 'success', data: user?.tasks });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
  }
};

export const getTask = async (req: Req, res: Response) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: req.params.id
      }
    });
    if (!task) {
      return res
        .status(404)
        .json({ status: 'failed', error: 'Task not found' });
    }
    res.json({ status: 'success', data: task });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
  }
};

export const updateTask = async (req: Req, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status, startDate, endDate } = req.body;

    if (startDate && endDate) {
      if (!isValidComingDate(startDate, endDate)) {
        return res.status(400).json({
          status: 'failed',
          error: 'invalid Date.'
        });
      }
    }

    const task = await prisma.task.update({
      where: {
        id: id
      },
      data: {
        name,
        description,
        status,
        startDate,
        endDate
      }
    });
    if (!task) {
      return res
        .status(404)
        .json({ status: 'failed', error: 'Task not found' });
    }

    res.json({ status: 'success', data: task });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
  }
};

export const deleteTask = async (req: Req, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await prisma.task.delete({
      where: {
        id: id
      }
    });
    if (!deletedTask) {
      return res
        .status(404)
        .json({ status: 'failed', error: 'Task not found' });
    }
    res.json({ status: 'success', data: deletedTask });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
  }
};
