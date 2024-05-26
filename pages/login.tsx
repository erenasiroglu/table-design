// login.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import "../src/app/styles/login.css";
import loginImage from "../src/app/images/glitch.svg";
import Image from "next/image";

export const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password") {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className="loginContainer">
      <Image src={loginImage} alt="Login" className="loginImage"></Image>
      <div className="loginFormContainer">
        <form onSubmit={handleLogin} className="loginForm">
          <h2>Login</h2>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit">Login</button>
          <p className="signupText">
            Dont have an account?{" "}
            <a onClick={handleSignUp} className="signupLink">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
