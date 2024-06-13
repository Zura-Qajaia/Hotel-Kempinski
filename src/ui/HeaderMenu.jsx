import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import DarkModeToggle from "./DarkModeToggle";
import { useLanguage } from "../LanguageContext";
import Button from "./Button";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const { logout } = useKindeAuth();
  const navigate = useNavigate();
  const { language, switchLanguage } = useLanguage();
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/login")}>
          <HiOutlineUser />
        </ButtonIcon>
        <ButtonIcon onClick={logout}>
          <CiLogout />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Button onClick={switchLanguage}>
          {language === "english" ? "Switch to Italian" : "Switch to English"}
        </Button>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
