import { Response } from 'express';
import prisma from '../prismaconnect';
import { Req } from '../types/api';

export const isValidComingDate = (startDate: Date, endDate: Date) => {
  return new Date(startDate) > new Date() && new Date(endDate) > new Date();
};

// create project
export const createProject = async (req: Req, res: Response) => {
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

    const project = await prisma.project.create({
      data: {
        name,
        description,
        status,
        startDate,
        endDate,
        user: {
          connect: {
            id: req.user?.id
          }
        }
      }
    });

    res.json({ status: 'success', data: project });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
  }
};

export const updateProject = async (req: Req, res: Response) => {
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

    const project = await prisma.project.update({
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
    if (!project) {
      return res
        .status(404)
        .json({ status: 'failed', error: 'Project not found' });
    }

    res.json({ status: 'success', data: project });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
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
      return res
        .status(404)
        .json({ status: 'failed', error: 'User not found' });
    }

    res.json({ status: 'success', data: user.projects });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
  }
};

export const getProject = async (req: Req, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        tasks: true
      }
    });
    if (!project) {
      return res
        .status(404)
        .json({ status: 'failed', error: 'Project not found' });
    }

    res.json({ status: 'success', data: project });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: 'failed', error: 'Internal server error.' });
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
      return res
        .status(404)
        .json({ status: 'failed', error: 'Project not found' });
    }

    res.json({ status: 'success', data: project });
  } catch (e) {
    console.log(e);
    res.json({ status: 'failed', error: 'Internal server error.' });
  }
};
