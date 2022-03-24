export default class FindAllClubsError extends Error {
  constructor(
    message: string,
    public statusCode: number | unknown,
  ) {
    super(message);
  }
}
