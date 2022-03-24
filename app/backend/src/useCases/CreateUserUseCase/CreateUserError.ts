export default class CreateUserError extends Error {
  constructor(
    message: string,
    public statusCode: number | unknown,
  ) {
    super(message);
  }
}
