import styled from "styled-components";
import FormRowVertical from "./FormRowVertical";
const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const src = "/logo.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
      <FormRowVertical>
        <StyledLogo></StyledLogo>
        <span>Hotel</span>
      </FormRowVertical>
    </StyledLogo>
  );
}

export default Logo;
