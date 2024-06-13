import React, { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import Button from "./../../ui/Button";
import Profile from "../../pages/Profile";
const LoginForm = () => {
  const { login, register, isLoading, isAuthenticated, user, logout } =
    useKindeAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  console.log(user);
  console.log(isAuthenticated);
  console.log(isLoading);

  useEffect(() => {
    if (isAuthenticated) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  return (
    <>
      {isLoading && <p>Loading...</p>}

      {!isLoading && !isAuthenticated && (
        <>
          <Button onClick={register} type="button">
            Register
          </Button>
          <Button onClick={login} type="button">
            Log In
          </Button>
        </>
      )}

      {!isLoading && isAuthenticated && <Profile />}
    </>
  );
};

const Login = () => {
  return <LoginButtons />;
};

export default LoginForm;
