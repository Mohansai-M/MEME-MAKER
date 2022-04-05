import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import UserCheck from "./UserCheck";
export const ProjectContext = createContext();

const ProjectProvider = (props) => {
  const [Token, setToken] = useState([]);
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/user/refresh_token", {
          withCredentials: true,
        });
        setToken(res.data.accesstoken);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, [])

   const state = {
     token: [Token, setToken],
     useCheck: UserCheck(Token),
   };

  return (
    <ProjectContext.Provider value={ state }>
      {props.children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };
