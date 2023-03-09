export enum ErrorMessage {
  AUTHENTICATION_FAIL = `Authentication failed`,
  EMAIL_ALLREADY_EXIST = `This email allready exist`,
  USER_NOT_FOUND = `User not found`,
  AUTH_FAIL = `Authentication fail`,
}

export enum ErrorStatus {
  AUTHENTICATION_FAIL = 500,
  EMAIL_ALLREADY_EXIST = 403,
  USER_NOT_FOUND = 404,
  AUTH_FAIL = 401,
}
