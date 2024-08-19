import { useState } from "react";
import { useLogin } from "../api/auth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useLogin();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return <Navigate to="/" replace />;
  }

  const from = location.state?.from?.pathname || "/";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(
      { emailAddress: email, password },
      {
        onSuccess: (data) => {
          setUser(data);
          navigate(from, { replace: true });
        },
      }
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
}

export default Login;
