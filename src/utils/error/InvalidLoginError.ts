export default class InvalidLoginError extends Error {

  constructor() {
    super("ERROR: Incorrect email or password");
  }

}
