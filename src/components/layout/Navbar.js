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
          <h3 className="is-size-3 ml-4 mb-1">PollApp</h3>
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

      {authUser ? (
        <div className="navbar-start ml-6">
          <Link to="/polls/add" className="is-size-4 navbar-item">
            Create Poll
          </Link>
        </div>
      ) : (
        ""
      )}

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-end">
          {authUser ? (
            <div className="navbar-item">
              <h4 className=" is-size-3 mr-4">Welcome {authUser.name}</h4>
              <button onClick={logout} className="navbar-item button">
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/login">
                  Login
                </Link>
                <Link className="button is-light" to="/signup">
                  Sign Up
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
