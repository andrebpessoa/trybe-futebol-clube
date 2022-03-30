import { RequestHandler } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { readFile } from 'fs/promises';
import path = require('path');

import ErrorMiddleware from './ErrorMiddleware';

export interface ITokenPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

const authMiddleware: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;

  const JWT_SECRET = await readFile(path.join(process.cwd(), 'jwt.evaluation.key'));

  if (!token) throw new ErrorMiddleware('Token not found', 401);

  try {
    const { id, email, role, username } = verify(token, JWT_SECRET) as JwtPayload;

    req.tokenPayload = { id, email, role, username };

    return next();
  } catch (error) {
    return next(new ErrorMiddleware('Expired or invalid token', 401));
  }
};

export default authMiddleware;
