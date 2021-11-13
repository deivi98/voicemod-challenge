export default class AuthenticationError extends Error {

  constructor() {
    super("ERROR: You are not logged in.");
  }

}
