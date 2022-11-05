import { Navigate } from "react-router-dom";
import { getUserType } from "../services/auth";
const UserProtected = ({ children }) => {
	if (getUserType() !== "admin" || getUserType() !== "user") {
		return <Navigate to="/auth" />;
	}
	return children;
};

export default UserProtected;
