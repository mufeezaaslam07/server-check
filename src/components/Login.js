// src/components/Login.js
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 50px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const LoginButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const Login = () => {
  const { setLoggedInUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "https://server-beta-cyan.vercel.app/api/auth/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token, User } = await response.json();
        console.log("Login successful! User:", User, "Token:", token);

        if (User) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(User));
          console.log("Data stored in localStorage");
        } else {
          console.error("User data is not available.");
        }

        // console.log("Token in localStorage:", localStorage.getItem("token"));
        // console.log("User in localStorage:", localStorage.getItem("user"));

        setLoggedInUser(User);

        navigate("/dashboard");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin}>
        <LoginInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">Login</LoginButton>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
