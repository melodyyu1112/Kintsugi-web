import React from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); // Redirect to the homepage on successful login
  };

  return (
    <div style={{textAlign: "center", padding: "2rem"}}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{marginBottom: "1rem"}}>
          <input
            type="text"
            placeholder="Username"
            required
            style={{padding: "0.5rem", fontSize: "1rem"}}
          />
        </div>
        <div style={{marginBottom: "1rem"}}>
          <input
            type="password"
            placeholder="Password"
            required
            style={{padding: "0.5rem", fontSize: "1rem"}}
          />
        </div>
        <button
          type="submit"
          style={{padding: "0.5rem 1rem", fontSize: "1rem"}}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
