import { Navigate } from "react-router-dom";
import { getUserType } from "../services/auth";
const AdminProtected = ({ children }) => {
	if (getUserType() !== "admin") {
		return <Navigate to="/auth" />;
	}
	return children;
};

export default AdminProtected;
