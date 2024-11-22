import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); // Redirect to the homepage on successful login
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#87CEEB",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div style={{marginBottom: "1rem"}}>
            <input
              type="text"
              placeholder="Username"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{marginBottom: "1rem"}}>
            <input
              type="password"
              placeholder="Password"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#6dd1f8",
              color: "white",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4ec5f4")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#abdbee")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
