import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Heading from "../ui/Heading";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image1 from "../images/1.jpeg";
import Image2 from "../images/2.jpeg";
import Image3 from "../images/3.jpeg";
import Button from "../ui/Button";
import { useLanguage } from "../LanguageContext";
import CenteredContainer from "./CenteredContainer";

const DashboardWrapper = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: #333;
`;

const InfoText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
`;

const ShowMoreContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const MoreInfoText = styled.p`
  font-size: 1rem;
  color: #444;
  margin: 10px 0;
`;

const StyledButton = styled(Button)`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Dashboard = () => {
  const [showMore, setShowMore] = useState(false);
  const { translations } = useLanguage();
  const handleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const images = [
    {
      original: Image1,
      thumbnail: Image1,
    },
    {
      original: Image2,
      thumbnail: Image2,
    },
    {
      original: Image3,
      thumbnail: Image3,
    },
  ];

  return (
    <DashboardWrapper>
      <StyledHeading as="h1">{translations.dashboardTitle}</StyledHeading>
      <InfoText>{translations.hotelInfo}</InfoText>
      <ImageGallery items={images} />

      <CenteredContainer>
        <ShowMoreContainer>
          <StyledButton onClick={handleShowMore}>
            {translations.showMore}
          </StyledButton>
          {showMore && (
            <div>
              <MoreInfoText>
                <strong>{translations.price}:</strong> $200 per night
              </MoreInfoText>
              <MoreInfoText>
                <strong>{translations.guests}:</strong> 2 {translations.guests}
              </MoreInfoText>
              <MoreInfoText>
                <strong>{translations.amenities}:</strong> Wi-Fi, Parking,
                Breakfast
              </MoreInfoText>
              <MoreInfoText>
                <strong>{translations.availability}:</strong>{" "}
                {translations.available}
              </MoreInfoText>
            </div>
          )}
          <Link to="/cabins">
            <StyledButton>{translations.bookNow}</StyledButton>
          </Link>
        </ShowMoreContainer>
      </CenteredContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
