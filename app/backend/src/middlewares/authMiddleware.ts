import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path = require('path');
import LoginError from '../useCases/LoginUseCase/LoginError';
import User from '../database/models/user';

interface ITokenPayload {
  email: string;
  password: string;
  iat: number;
  exp: number;
}

const returnOptions = {
  attributes: { exclude: ['password'] },
  raw: true,
};

const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  const JWT_SECRET = await readFile(path.join(process.cwd(), 'jwt.evaluation.key'));

  if (!authorization) throw new LoginError('Token not found!', 401);

  try {
    const { email } = await verify(authorization, JWT_SECRET) as ITokenPayload;

    const user = await User.findOne({ ...returnOptions, where: { email } });

    if (!user) throw new LoginError('Error searching user token', 401);

    res.status(200).json(user.role);
  } catch (error) {
    return next(new LoginError('Expired or invalid token', 401));
  }

  return next();
};

export default authMiddleware;
