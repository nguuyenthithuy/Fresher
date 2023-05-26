import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import NotPermitted from "./Notpermitted";


const CheckProteted = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin')
    const user = useSelector(state => state.account.user);
    const userRole = user.role;

    if (isAdminRoute && userRole === 'ADMIN') {
        return (
            <>{props.children}</>
        )
    }
    else {
        return (
            <NotPermitted />
        )
    }
}


const ProtectedRoute = (props) => {
    const isAuthentited = useSelector(state => state.account.isAuthentited)
    return (
        <>
            {isAuthentited === true ?
                <>
                    <CheckProteted>
                        {props.children}
                    </CheckProteted>
                </>
                :
                <Navigate to="/login" replace />
            }
        </>
    )
}
export default ProtectedRoute;