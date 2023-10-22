import { Response } from 'express';
import prisma from '../prismaconnect';
import { Req } from '../types/api';

// create project
export const createProject = async (req: Req, res: Response) => {
  try {
    const { name, description, status } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        user: {
          connect: {
            id: req.user?.id
          }
        }
      }
    });

    res.json({ project });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const updateProject = async (req: Req, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;

    const project = await prisma.project.update({
      where: {
        id: id
      },
      data: {
        name,
        description,
        status
      }
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ project });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getProjects = async (req: Req, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.id
      },
      include: {
        projects: true
      }
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ data: user.projects });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const getProject = async (req: Req, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id
      }
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ data: project });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

export const deleteProject = async (req: Req, res: Response) => {
  try {
    const project = await prisma.project.delete({
      where: {
        id: req.params.id
      }
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ data: project });
  } catch (e) {
    console.log(e);
    res.json({ error: 'Internal server error.' });
  }
};
