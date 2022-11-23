import axios from '../axios';
import useAuth from './useAuth';
import useLocalStorage from './useLocalStorage';

const useLogout = () => {
    const { setAuth } = useAuth();


    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout')
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;