const BASE_URL = "http://localhost:3000";

export const endpoints = {
  SIGNUP_API: BASE_URL + "/api/v1/signup",
  LOGIN_API: BASE_URL + "/api/v1/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};
