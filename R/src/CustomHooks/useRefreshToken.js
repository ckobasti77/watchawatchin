import { useEffect } from "react";
import axios from "../axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  

  const refresh = async () => {
    const response = await axios.get("/refresh");
    console.log(response);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
