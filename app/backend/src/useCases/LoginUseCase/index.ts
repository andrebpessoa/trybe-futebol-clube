import LoginRepository from '../../repositories/implementations/login.repository';
import LoginController from './LoginController';
import LoginUseCase from './LoginUseCase';

const loginRepository = new LoginRepository();

const loginUseCase = new LoginUseCase(
  loginRepository,
);

const loginController = new LoginController(
  loginUseCase,
);

export { loginController, loginUseCase };
