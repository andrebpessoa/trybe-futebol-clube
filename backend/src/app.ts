import express, { Express } from 'express';
import 'express-async-errors';

import domainErrorHandler from './middlewares/domainErrorHandler';
import * as routes from './routes';

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private middlewares(): void {
    this.app.use(routes.userRouter);
    this.app.use(routes.loginRouter);
    this.app.use(routes.clubsRouter);
    this.app.use(routes.matchesRouter);
    this.app.use(routes.leaderboardRouter);
    this.app.use(domainErrorHandler);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'localhost');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
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
