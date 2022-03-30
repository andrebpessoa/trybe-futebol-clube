import { ITokenPayload } from '../middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request{
      tokenPayload: ITokenPayload
    }
  }
}
