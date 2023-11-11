import { Request } from 'express';
import { createToken } from '../modules/auth';
import { comparePasswords, hashPassword } from '../modules/hash';
import prisma from '../prismaconnect';
import { Req, Res } from '../types/api';

export const signup = async (req: Request, res: Res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: await hashPassword(req.body.password)
      }
    });

    const token = createToken(user);

    res.json({
      status: 'success',
      data: user,
      token
    });
  } catch (e: any) {
    if (e.code === 'P2002' && e.meta?.target?.includes('email')) {
      console.log(e);
      res
        .status(400)
        .json({ status: 'failed', error: 'Email address is already in use.' });
    } else {
      console.log(e);
      res
        .status(500)
        .json({ status: 'failed', error: 'Internal server error.' });
    }
  }
};

export const signin = async (req: Request, res: Res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: 'failed', error: 'User not found' });
    }

    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: 'failed', error: 'Invalid password' });
    }

    const token = createToken(user);
    res.json({ token, data: user });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      status: 'failed',
      error: 'email or password is undefined - Internal server error.'
    });
  }
};

export const updateUser = async (req: Request, res: Res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      name
    }
  });

  res.json({ status: 'success', data: user });
};

export const getUser = async (req: Req, res: Res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.id
    }
  });
  res.json({ status: 'success', data: user });
};

export const getUsers = async (req: Request, res: Res) => {
  const users = await prisma.user.findMany();
  res.json({ status: 'success', data: users });
};

export const deleteUser = async (req: Req, res: Res) => {
  const admin = await prisma.user.findUnique({
    where: {
      id: req.user?.id
    }
  });
  if (admin && admin.role !== process.env.ADMIN_ROLE) {
    return res
      .status(401)
      .json({ status: 'failed', error: 'get out of here mf!' });
  }
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: id
    }
  });
  res.json({ status: 'success', data: user });
};
