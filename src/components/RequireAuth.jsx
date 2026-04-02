import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const RequireAuth = ({ allowedRole }) => {
    const { authUser } = useAuthContext();
    const location = useLocation();

    return allowedRole.find((role) => [authUser.user.role].includes(role)) ? (
        <Outlet />
      ) : authUser? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      );
}

export default RequireAuth