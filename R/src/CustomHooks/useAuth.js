import { useContext, useDebugValue } from 'react';
import AuthContext from '../Pages/SignInUp/context/AuthProvider';

const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.userLog ? "Logged In" : "Logged out")
    return useContext(AuthContext);
}

export default useAuth