import { Response } from 'express';
import { Req } from '../types/api';
import prisma from '../prismaconnect';

export const createTask = async (req: Req, res: Response) => {
  try {
    const task = await prisma.task.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
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
    res.json({ data: task });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
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
    res.json({ data: user?.tasks });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
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
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ data: task });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateTask = async (req: Req, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const task = await prisma.task.update({
      where: {
        id: id
      },
      data: {
        name,
        description,
        status
      }
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ data: task });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
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
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ data: deletedTask });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
