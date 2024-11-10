import React, { useEffect } from "react";
import { useData } from "../context/Context";
import { Link } from "react-router-dom";
import logo from "../images/statify-logo.png"

function NavBar() {
  const { token, logOut, setToken, logInAddress } = useData();

  useEffect(() => {
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
    getToken();
  }, []);

  return (
    <div className="nav">
      {!token ? (
        <div className="nav-bar">
          <Link to="/" className="logo">
            <img src={logo} alt="" className="logo"/>
          </Link>
          <Link to={logInAddress} className="auth-button">
            Login to Spotify
          </Link>
        </div>
      ) : (
        <div className="nav-bar">
          <Link to="/" className="logo">
            <img src={logo} alt="" className="logo"/>
          </Link>
          <div className="nav-buttons">
          <Link to="/myprofile" className="nav-item">
              My Profile
            </Link>
            <Link to="/browse" className="nav-item">
              Browse
            </Link>
            <a onClick={logOut} className="auth-button" href="https://www.spotify.com/logout/">
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
