import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  console.log("dattttttttttttttt", token);
  return jwtDecode(token);
};
