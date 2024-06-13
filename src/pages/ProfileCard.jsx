import styled from "styled-components";
import { useLanguage } from "./../LanguageContext";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import image1 from "./../pages/1.jpeg";
import image2 from "./../pages/2.jpeg";
import image3 from "./../pages/3.jpeg";
import image4 from "./../pages/4.jpeg";
import image5 from "./../pages/5.jpeg";
import image6 from "./../images/vip.jpeg";
import ButtonIcon from "../../src/ui/ButtonIcon";
const ProfileCardContainer = styled.div`
  background-color: var(--color-grey-100);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileCardTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const ProfileCardBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileCardItem = styled.div`
  margin-bottom: 10px;
`;

const RoomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
  }

  p {
    margin: 0;
  }

  .room-details {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
const rooms = [
  {
    id: 1,
    name: "Standard Room",
    image: image1,
    price: 100,
    capacity: 2,
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
  },
  {
    id: 2,
    name: "Deluxe Room",
    image: image2,
    price: 150,
    capacity: 3,
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Balcony"],
  },
  {
    id: 3,
    name: "Suite Room",
    image: image3,
    price: 200,
    capacity: 4,
    amenities: ["Wi-Fi", "TV", "Air Conditioning", "Balcony", "Mini Bar"],
  },
  {
    id: 4,
    name: "Family Room",
    image: image4,
    price: 250,
    capacity: 5,
    amenities: [
      "Wi-Fi",
      "TV",
      "Air Conditioning",
      "Balcony",
      "Mini Bar",
      "Kitchenette",
    ],
  },
  {
    id: 5,
    name: "Economy Room",
    image: image5,
    price: 80,
    capacity: 2,
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
  },
  {
    id: 6,
    name: "VIP Room",
    image: image6,
    price: 600,
    capacity: 1,
    amenities: ["Wi-Fi", "TV", "Air Conditioning"],
  },
];

const ProfileCard = ({ Counter, Price, image, bookedRoomIds, onDelete }) => {
  const { translations } = useLanguage();
  let totalPrice = 0;
  let totalNights = 0;
  const bookedRooms = rooms
    .map((room) => {
      const t = bookedRoomIds.find((el) => el.id === room.id);
      if (!t) {
        return;
      } else {
        return { ...room, minNights: t.minNights };
      }
    })
    .filter((el) => el);
  console.log(bookedRooms);
  bookedRooms.forEach((room) => {
    totalNights += room.minNights;
    console.log(room.minNights);
    totalPrice += room.minNights * room.price;
    console.log(totalPrice);
  });

  // Filter booked rooms based on IDs

  return (
    <ProfileCardContainer>
      <ProfileCardTitle>
        {translations.numberofnights} : {totalNights}
      </ProfileCardTitle>
      <ProfileCardBody>
        <ProfileCardItem>
          <FaCartPlus />
          {translations.totalPrice} : {totalPrice}$
        </ProfileCardItem>

        {bookedRooms.map((room) => (
          <RoomContainer key={room.id}>
            <img src={room.image} alt={room.name} />
            <div className="room-details">
              <p>{room.name}</p>
              <p>{room.price}$</p>
              <span>
                {translations.numberofnights} : {room.minNights}
              </span>
            </div>
            <ButtonIcon>
              <FaTrash
                className="delete-button"
                onClick={() => onDelete(room.id)}
              />
            </ButtonIcon>
          </RoomContainer>
        ))}
      </ProfileCardBody>
    </ProfileCardContainer>
  );
};

export default ProfileCard;
