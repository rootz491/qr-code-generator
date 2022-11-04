import jwt_decode from "jwt-decode";

export function isAuthenticated() {
  const token = localStorage.getItem("access_token");
  let flag = false;
  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      flag = false;
    }
    flag = true;
  }
  return flag;
}

export function getUserType() {
  const token = localStorage.getItem("access_token");
  if (token) {
    const decoded = jwt_decode(token);
    return decoded.accountType;
  }
}
