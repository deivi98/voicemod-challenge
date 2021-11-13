export default class AuthenticatedError extends Error {

  constructor() {
    super("ERROR: Already logged in.");
  }

}
