import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";
// const UserProtected = ({ children }) => {
// 	if (getUserType() !== "admin" || getUserType() !== "user") {
// 		return <Navigate to="/auth" />;
// 	}
// 	return children;
// };

const UserProtected = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  }
  return <Navigate to="/auth" />;
};

export default UserProtected;

// if isAuthenticated is true, then return children or else return <Navigate to="/auth" />;
