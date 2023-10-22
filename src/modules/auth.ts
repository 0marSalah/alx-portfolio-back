import jwt from 'jsonwebtoken';

export const createToken = (user: any) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET env not found');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );

  return token;
};
