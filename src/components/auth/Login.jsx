import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../api/axios";
import UserContext from "../../context/UserContext";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const history = useHistory();

  const { setAuthUser } = useContext(UserContext);

  // login method
  const login = async (credentials) => {
    try {
      const res = await axios.post("/api/user/login", {
        ...credentials,
      });
      await localStorage.setItem("token", res.data.token);
      await setAuthUser({ ...res.data.user });
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = () => {
    login(values);
    history.push("/");
  };

  return (
    <div className="container">
      <h2 className="is-size-2 has-text-centered">Login</h2>
      <div className="container">
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              className="input"
              type="email"
              placeholder="abc@example.com"
            />
          </div>
        </div>
        <div className="field mb-5">
          <label className="label">Password</label>
          <div className="control">
            <input
              name="password"
              value={values.password}
              onChange={handleChange}
              className="input"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <button className="button is-link is-medium" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
