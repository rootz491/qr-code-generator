import { Navigate } from "react-router-dom";
import { getUserType } from "../services/auth";
const Protected = ({ children }) => {
  if (getUserType() !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
