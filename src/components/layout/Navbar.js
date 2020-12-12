import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Navbar = () => {
  const { authUser, setAuthUser } = useContext(UserContext);

  // logout method
  const logout = () => {
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  return (
    <nav
      className="navbar is-link"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <h3 className="is-size-3 ml-4 mb-1">My App</h3>
        </Link>

        <Link
          to="#"
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          {authUser ? (
            <div>
              <h4 className=" is-size-4 navbar-item">
                <strong>{authUser.name}</strong>
              </h4>
              <button className="navbar-item button ">
                <strong>Logout</strong>
              </button>
            </div>
          ) : (
            <div>
              <div className="navbar-item">
                <Link to="/login">
                  <strong>Login</strong>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/signup">
                  <strong>Sign Up</strong>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
