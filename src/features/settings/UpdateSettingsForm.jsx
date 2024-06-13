import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { styled } from "styled-components";
import { useState } from "react";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLanguage } from "./../../../src/LanguageContext";
import StarRating from "../../pages/StarRating";
import Checkbox from "./../../ui/Checkbox";
function UpdateSettingsForm() {
  const { translations } = useLanguage();
  const StyledLink = styled(Link)`
    color: #ffffff;
    text-decoration: none;
    padding: 10px 20px;
    background-color: #007bff;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  `;
  const ThankYouMessage = styled.div`
    margin-top: 20px;
  `;
  const [showThankYou, setShowThankYou] = useState(false);
  const handleButtonClick = (e) => {
    e.preventDefault();
    // Show the thank you message
    setShowThankYou(true);

    // Optionally, you can also perform any other actions here (e.g., submit data to a server)
  };
  return (
    <Form>
      <FormRow label={translations.howMuchDoYouLikeThisHotel}>
        <Input type="text" id="min-nights" />
      </FormRow>

      <FormRow label={translations.howManyDaysYouStay}>
        <Input type="number" id="max-nights" />
      </FormRow>

      <FormRow label={translations.areYouGoingToUseThisApplicationAgain}>
        <Input type="text" id="max-guests" />
      </FormRow>

      <FormRow label={translations.howMuchDidYouSpendHere}>
        <Input type="number" id="breakfast-price" />
      </FormRow>
      <FormRow label={translations.howYouWouldLikeBerlinHotel}>
        <StarRating maxRating={10} size={24} />
      </FormRow>
      <Checkbox>{translations.agree}</Checkbox>

      <FormRowVertical>
        <Button onClick={handleButtonClick}>{translations.submit}</Button>
        <StyledLink
          to="https://www.kempinski.com/en/hotel-adlon"
          style={{ textAlign: "center" }}
        >
          {translations.officialPage}
        </StyledLink>
        <StyledLink
          to="mailto:hotel.adlon@kempinski.com"
          style={{ textAlign: "center" }}
        >
          hotel.adlon@kempinski.com
        </StyledLink>
        <StyledLink href="tel:+493022610" style={{ textAlign: "center" }}>
          Call +49 (0)30 22 610
        </StyledLink>
      </FormRowVertical>
      {showThankYou && (
        <ThankYouMessage>
          {translations.thankYouForSupportingUs}
        </ThankYouMessage>
      )}
    </Form>
  );
}

export default UpdateSettingsForm;
