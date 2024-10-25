import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ReactElement, useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
    children?: ReactElement
    requiredRole?: string
    redirectTo?: string
    isPublic?: boolean
}

const ProtectedRoute = ({ children, redirectTo = "/sign-in", requiredRole, isPublic = false }: Props) => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isPublic && !isAuthenticated) {
            toast.error("Please log in first to access this page", { duration: 3000 });
            navigate(redirectTo);
        } else if (isPublic && isAuthenticated) {
            navigate("/");
        } else if (isAuthenticated && requiredRole && user?.role !== requiredRole) {
            toast.error("You do not have the required permissions to access this page", { duration: 3000 });
            navigate(redirectTo);
        }
    }, [isAuthenticated, requiredRole, user, navigate, redirectTo, isPublic]);
    if ((isAuthenticated && (!requiredRole || user?.role === requiredRole)) || isPublic) {
        return children;
    }
    return null;
};
export default ProtectedRoute;