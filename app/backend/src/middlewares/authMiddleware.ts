import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path = require('path');
import User from '../database/models/user';
import ErrorMiddleware from './ErrorMiddleware';

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

  if (!authorization) throw new ErrorMiddleware('Token not found', 401);

  try {
    const { email } = await verify(authorization, JWT_SECRET) as ITokenPayload;

    const user = await User.findOne({ ...returnOptions, where: { email } });

    if (!user) throw new ErrorMiddleware('Error searching user token', 401);

    return res.status(200).json(user.role);
  } catch (error) {
    return next(new ErrorMiddleware('Expired or invalid token', 401));
  }

  return next();
};

export default authMiddleware;
