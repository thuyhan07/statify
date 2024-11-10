import React, { useEffect } from "react";
import { useData } from "../context/Context";
import { Link } from "react-router-dom";
import logo from "../images/statify-logo.png"

function NavBar() {
  const { token, logOut, logInAddress, getToken } = useData();

  useEffect(() => {
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
