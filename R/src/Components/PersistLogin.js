import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../CustomHooks/useRefreshToken";
import useAuth from "../CustomHooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [auth]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading 
              ? <p>Loading . . .</p> 
              : <Outlet />}</>
};

export default PersistLogin;
