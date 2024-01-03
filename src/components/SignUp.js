import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 50px;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignUpInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const SignUpButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "https://server-beta-cyan.vercel.app/api/auth/signup";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("Signup successful!");
        window.location.href = "/login";
      } else {
        console.error("Signup failed:", response);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
      <SignUpForm onSubmit={handleSignUp}>
        <SignUpInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <SignUpInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SignUpButton type="submit">Sign Up</SignUpButton>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;
