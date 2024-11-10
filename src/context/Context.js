
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const ContextProvider = ({ children }) => {
  const CLIENT_ID = "70d6f68bf619491ca54a08666f8a86e5";
  const REDIRECT_URI = "https://statifyprojectbyhan.netlify.app";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [itemDetails, setItemDetails] = useState({})

  const logInAddress = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read%20user-read-recently-played%20user-read-currently-playing`;

  const getToken = () => {
    const hash = window.location.hash;
    let token = "";
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      console.log(token);
      setToken(token);
  }};

  const logOut = () => {
    setToken("");
    window.localStorage.removeItem("");
    navigate('/')
  };

  const displayItem = (item) => {
    setShowDetails(true);
    setItemDetails(item);
    console.log(itemDetails)
  }


  return (
    <DataContext.Provider value={{ token, setToken, logOut, logInAddress, getToken, showDetails, setShowDetails, itemDetails, setItemDetails, displayItem }}>
      {children}
    </DataContext.Provider>
  );
};


export const useData = () => {
  return useContext(DataContext);
};
