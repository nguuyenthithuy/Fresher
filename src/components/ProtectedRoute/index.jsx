import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const isAuthentited = useSelector(state => state.account.isAuthentited)
    return (
        <>
            {isAuthentited === true ?
                <>{props.children}</>
                :
                <Navigate to="/login" replace />
            }
        </>
    )
}
export default ProtectedRoute;