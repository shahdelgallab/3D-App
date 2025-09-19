import React from'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoutes = ({ role }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view this page.");
      navigate("/login", { replace: true });
    } else if (role && user.role !== role) {
      toast.error("You are not authorized to access this page.");
      navigate("/", { replace: true });
    }
  }, [user, role, navigate]);

  if (user && (!role || user.role === role)) {
    return <Outlet />;
  }
  
  return null; 
};

export default ProtectedRoutes;