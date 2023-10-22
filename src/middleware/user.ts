import jwt from 'jsonwebtoken';

export const verifyUser = async (req: any, res: any, next: any) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('env variable is not defined in the environment');
  }

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const bearer = token.split(' ')[1];
  if (!bearer) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized', error: err });
  }
};
