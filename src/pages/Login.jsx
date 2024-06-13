import { useState } from "react";
import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  function handleLoginFormClose() {
    setIsLoginFormVisible(false);
  }

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      {isLoginFormVisible ? (
        <LoginForm onClose={handleLoginFormClose} />
      ) : (
        <>
          <p>You are logged in!</p>
          <Link to="/cabins">Go to Cabins</Link>
        </>
      )}
    </LoginLayout>
  );
}

export default Login;
