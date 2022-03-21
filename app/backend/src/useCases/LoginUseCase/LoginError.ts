export default class LoginError extends Error {
  constructor(
    message: string,
    public statusCode: number | unknown,
  ) {
    super(message);
  }
}
