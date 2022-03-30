export default class ErrorMiddleware extends Error {
  constructor(
    message: string,
    public statusCode: number | unknown,
  ) {
    super(message);
  }
}
