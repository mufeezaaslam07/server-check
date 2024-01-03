// src/components/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <Title>Welcome to My Todo App</Title>
      <ButtonContainer>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </ButtonContainer>
    </HomePageContainer>
  );
};

export default HomePage;
