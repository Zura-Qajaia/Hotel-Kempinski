import React from "react";
import styled from "styled-components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useLanguage } from "./../LanguageContext";
import Button from "../ui/Button";

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border: 1px solid #ddd;
  border-radius: 15px;
  max-width: 600px;
  margin: 50px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
  border: 3px solid #ccc;
`;

const ProfileInfo = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const ProfileText = styled.span`
  display: block;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const ProfileButton = styled(Button)`
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #555;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #d9534f;
`;

const Profile = () => {
  const { translations } = useLanguage();
  const { user, isAuthenticated, isLoading, logout } = useKindeAuth();
  console.log(user);
  if (isLoading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return isAuthenticated ? (
    <ProfileWrapper>
      <ProfileImage src={user.picture} alt="Profile Picture" />
      <ProfileInfo>
        <ProfileText>{user.given_name}</ProfileText>
        <ProfileText>{user.family_name}</ProfileText>
        <ProfileText>{user.email}</ProfileText>
      </ProfileInfo>
      <ProfileButton onClick={logout}>{translations.Logout}</ProfileButton>
    </ProfileWrapper>
  ) : (
    <ErrorMessage>Please sign in or register!</ErrorMessage>
  );
};

export default Profile;
