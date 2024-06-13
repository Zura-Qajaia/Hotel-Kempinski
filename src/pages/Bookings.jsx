import { useLanguage } from "../LanguageContext";
import Button from "../ui/Button";
import Row from "../ui/Row";
import FormRowVertical from "./../../src/ui/FormRowVertical";
import image1 from "./../pages/1.jpeg";
import image2 from "./../pages/2.jpeg";
import image3 from "./../pages/3.jpeg";
import image4 from "./../pages/4.jpeg";
import image5 from "./../pages/5.jpeg";
function Bookings() {
  const { translations } = useLanguage();

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
  ];
  return (
    <>
      <h2>All bookings</h2>
      {rooms.map((room) => (
        <FormRowVertical>
          <li style={{ backgroundColor: "purple" }}>
            <Row type="horizontal">
              <span>Room number: {room.id}</span>
              <span>{room.name}</span>
            </Row>
            <Button>Book now</Button>
          </li>
        </FormRowVertical>
      ))}
    </>
  );
}

export default Bookings;
