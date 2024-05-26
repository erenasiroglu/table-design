// signup.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import "../src/app/styles/login.css"; // Reuse the same CSS as login page
import signUpImage from "../src/app/images/glitch.svg"; // Reuse the same image as login page
import Image from "next/image";

export const SignUp: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Mock API call for sign-up
    // Replace with actual API call logic
    if (email && password) {
      router.push("/dashboard");
    } else {
      setError("Sign-up failed");
    }
  };

  return (
    <div className="loginContainer">
      <Image src={signUpImage} alt="Sign Up" className="loginImage"></Image>
      <div className="loginFormContainer">
        <form onSubmit={handleSignUp} className="loginForm">
          <h2>Sign Up</h2>
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
