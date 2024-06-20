import React, { useState } from "react";
import { useRouter } from "next/router";
import "../src/app/styles/login.css";
import googleIcon from "../src/app/images/google-icon.png";
import signUpImage from "../src/app/images/login.jpg";
import Image from "next/image";

export const SignUp: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: name, email, password }),
        });

        if (response.ok) {
          router.push("/");
        } else {
          const data = await response.json();
          setError(data.error || "Sign-up failed");
        }
      } catch (error) {
        setError("Please try again later.");
      }
    } else {
      setError("Please fill out all fields");
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Backend URL'si
  };

  return (
    <div className="loginContainer">
      <Image src={signUpImage} alt="Sign Up" className="loginImage"></Image>
      <div className="loginFormContainer">
        <form onSubmit={handleSignUp} className="loginForm">
          <h2>Create your account and design your table</h2>
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
            Full Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email Address
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
          <button type="submit">Sign Up</button>
          <p className="signupText">
            Already have an account?{" "}
            <a onClick={() => router.push("/login")} className="signupLink">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
