import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, allowedRoles }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const role = useSelector((state) => state.user.role);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/error" replace />;
  }

  return <Element />;
};

export default ProtectedRoute;
