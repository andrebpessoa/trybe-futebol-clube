export default class FindClubByIdError extends Error {
  constructor(
    message: string,
    public statusCode: number | unknown,
  ) {
    super(message);
  }
}
