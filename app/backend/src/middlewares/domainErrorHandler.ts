import { ErrorRequestHandler } from 'express';

const domainErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (!err.statusCode) return next(err);

  const { statusCode, message } = err;

  return res.status(statusCode).json({ message });
};

export default domainErrorHandler;
