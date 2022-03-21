import * as express from 'express';
import 'express-async-errors';
import domainErrorHandler from './middlewares/domainErrorHandler';
import loginRouter from './routes/LoginRouter';
import userRouter from './routes/UserRouter';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private middlewares(): void {
    this.app.use(userRouter);
    this.app.use(loginRouter);
    this.app.use(domainErrorHandler);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.middlewares();
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => {
      console.log('🚀 [Server] Servidor rodando na porta', PORT);
    });
  }
}

export { App };

export const { app } = new App();
