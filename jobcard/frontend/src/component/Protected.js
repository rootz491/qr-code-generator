import { Navigate } from "react-router-dom";

const Protected = ({children }) => {
  
  const isAdmin = false;
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
}

export default Protected;

