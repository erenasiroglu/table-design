import React, { useState } from "react";
import { useRouter } from "next/router";
import "../src/app/styles/login.css";
import loginImage from "../src/app/images/login.jpg";
import googleIcon from "../src/app/images/google-icon.png";
import Image from "next/image";

export const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
        setError(data.error || "Invalid email or password");
      }
    } catch (error) {
      setError("Please try again later.");
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="loginContainer">
      <Image src={loginImage} alt="Login" className="loginImage"></Image>
      <div className="loginFormContainer">
        <form onSubmit={handleLogin} className="loginForm">
          <h2>Welcome!</h2>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="googleSignIn"
          >
            <Image
              src={googleIcon}
              alt="Google Icon"
              className="googleIcon"
            ></Image>
            Continue with Google
          </button>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
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
            Don`t have an account?{" "}
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
