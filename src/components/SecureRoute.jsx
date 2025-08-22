import { Navigate } from "react-router-dom";

function SecureRoute({ children }) {
  // this components wraped around Inventory to protect it from unauthorized access
  const token = localStorage.getItem("jwtToken"); // checking for jwt token
  if (!token) {
    // redirect to login page if token not exists
    return <Navigate to="/login" replace />;
  }
  return children; //proceed to load the inventory if token is present
}

export default SecureRoute;
