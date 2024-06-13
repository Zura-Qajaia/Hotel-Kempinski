import React, { useReducer, useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { useLanguage } from "../LanguageContext";
import Row from "../ui/Row";
import image1 from "./../pages/1.jpeg";
import image2 from "./../pages/2.jpeg";
import image3 from "./../pages/3.jpeg";
import image4 from "./../pages/4.jpeg";
import image5 from "./../pages/5.jpeg";
import image6 from "./../images/vip.jpeg";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import "./cabins.css";
import StarRating from "./StarRating";
import Button from "../ui/Button";
import Modal from "../ui/Modal"; // Import the Modal component
import Tag from "../ui/Tag";
import { toast } from "react-hot-toast";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import ProfileCard from "./ProfileCard";

// Define action types
const actionTypes = {
  SET_SORT_BY: "SET_SORT_BY",
  SET_FILTER_BY_CAPACITY: "SET_FILTER_BY_CAPACITY",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
  SET_MAX_PRICE: "SET_MAX_PRICE",
  SET_AMENITIES_FILTER: "SET_AMENITIES_FILTER",
  INCREMENT_BOOKING: "INCREMENT_BOOKING",
  SET_SELECTED_ROOM: "SET_SELECTED_ROOM",
  SET_NIGHTS: "SET_NIGHTS",
};

// Initial state for rooms
const initialState = {
  rooms: [
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
  ],
  sortBy: null,
  filterByCapacity: null,
  searchTerm: "",
  maxPrice: null,
  filterByAmenities: [],
  bookings: [],
  totalPrice: 0,
  selectedRoom: null,
  nights: 1,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SORT_BY:
      return { ...state, sortBy: action.payload };
    case actionTypes.SET_FILTER_BY_CAPACITY:
      return { ...state, filterByCapacity: action.payload };
    case actionTypes.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case actionTypes.SET_MAX_PRICE:
      return { ...state, maxPrice: action.payload };
    case actionTypes.SET_AMENITIES_FILTER:
      return { ...state, filterByAmenities: action.payload };
    case actionTypes.INCREMENT_BOOKING: {
      const updatedBookings = [...state.bookings, action.payload];
      const updatedTotalPrice = updatedBookings.reduce(
        (total, room) => total + room.price * room.nights,
        0
      );
      return {
        ...state,
        bookings: updatedBookings,
        totalPrice: updatedTotalPrice,
        selectedRoom: null,
        nights: 1,
      };
    }
    case actionTypes.SET_SELECTED_ROOM:
      return { ...state, selectedRoom: action.payload };
    case actionTypes.SET_NIGHTS:
      return { ...state, nights: action.payload };
    default:
      return state;
  }
};

// Selector function to apply sorting, filtering, and searching
const applySortingAndFiltering = (
  rooms,
  sortBy,
  filterByCapacity,
  searchTerm,
  maxPrice,
  filterByAmenities
) => {
  let sortedAndFilteredRooms = [...rooms];

  // Filter by capacity
  if (filterByCapacity !== null) {
    sortedAndFilteredRooms = sortedAndFilteredRooms.filter(
      (room) => room.capacity >= filterByCapacity
    );
  }

  // Filter by max price
  if (maxPrice !== null) {
    sortedAndFilteredRooms = sortedAndFilteredRooms.filter(
      (room) => room.price <= maxPrice
    );
  }

  // Filter by search term
  if (searchTerm !== "") {
    sortedAndFilteredRooms = sortedAndFilteredRooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by amenities
  if (filterByAmenities.length > 0) {
    sortedAndFilteredRooms = sortedAndFilteredRooms.filter((room) =>
      filterByAmenities.every((amenity) => room.amenities.includes(amenity))
    );
  }

  // Sort by criteria
  if (sortBy === "price-asc") {
    sortedAndFilteredRooms.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    sortedAndFilteredRooms.sort((a, b) => b.price - a.price);
  } else if (sortBy === "capacity-asc") {
    sortedAndFilteredRooms.sort((a, b) => a.capacity - b.capacity);
  } else if (sortBy === "capacity-desc") {
    sortedAndFilteredRooms.sort((a, b) => b.capacity - a.capacity);
  } else if (sortBy === "name-asc") {
    sortedAndFilteredRooms.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    sortedAndFilteredRooms.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sortedAndFilteredRooms;
};

const Img = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const StyledHeader = styled.header`
  background-color: var(--color-grey-100);
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-200);
  color: var(--text-color);
`;

const SearchField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-grey-300);
  border-radius: 20px;
  outline: none;
  font-size: 16px;
  background-color: var(--color-grey-50);
  color: var(--text-color);

  &:focus {
    border-color: var(--color-brand-600);
  }
`;

const RoomCard = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: var(--shadow-lg);
  }
`;

const RoomDetails = styled.div`
  padding: 1rem;
  color: var(--text-color);
`;

const RoomHeader = styled.h2`
  margin: 0.5rem 0;
  color: var(--text-color);
`;

const RoomText = styled.p`
  margin: 0.5rem 0;
  color: var(--text-color);
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  button {
    background: var(--color-brand-600);
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
  }

  span {
    margin: 0 1rem;
    font-size: 1.2rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const CheckboxContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: gainsboro;
  flex-direction: column;
  padding: 1rem 0.5rem;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Cabins = () => {
  const { isAuthenticated } = useKindeAuth();
  const { translations } = useLanguage();
  const [bookedRoomIds, setBookedRoomIds] = useState([]);
  const [minNights, setMinNights] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedRoomImage, setSelectedRoomImage] = useState(null);
  const handleDelete = (roomId) => {
    const deletedRoom = state.bookings.find((room) => room.id === roomId);

    if (deletedRoom) {
      // Calculate the new total price by subtracting the price of the deleted room multiplied by its number of nights
      const newTotalPrice =
        state.totalPrice - deletedRoom.price * deletedRoom.nights;

      // Calculate the new booking count
      const newBookingCount = state.bookings.length - 1;

      // Remove the deleted room from the booked rooms list
      const updatedBookings = state.bookings.filter(
        (room) => room.id !== roomId
      );

      // Update the state with the new total price, booking count, and booked rooms list
      dispatch({
        type: actionTypes.INCREMENT_BOOKING,
        payload: updatedBookings,
        totalPrice: newTotalPrice,
        bookingCount: newBookingCount,
      });

      // Remove the deleted room ID from the booked room IDs list
      setBookedRoomIds((prevIds) => prevIds.filter((id) => id.id !== roomId));
    }
  };

  const sortedAndFilteredRooms = applySortingAndFiltering(
    state.rooms,
    state.sortBy,
    state.filterByCapacity,
    state.searchTerm,
    state.maxPrice,
    state.filterByAmenities
  );

  const handleBookNow = (room) => {
    dispatch({ type: actionTypes.SET_SELECTED_ROOM, payload: room });
    dispatch({
      type: actionTypes.INCREMENT_BOOKING,
      payload: { ...room, nights: state.nights, totalPrice: totalPrice },
    });

    setSelectedRoomImage(room.image);
  };

  const handleConfirmBooking = () => {
    toast.success("Successfully Booked");
    const bookingDetails = {
      ...state.selectedRoom,
      nights: state.nights,
      totalPrice: state.selectedRoom.price * state.nights,
    };
    dispatch({ type: actionTypes.INCREMENT_BOOKING, payload: bookingDetails });
    setBookedRoomIds([
      ...bookedRoomIds.filter((el) => el.id !== state.selectedRoom.id),

      { id: state.selectedRoom.id, minNights },
    ]);
  };

  const handleAmenitiesChange = (amenity) => {
    const newAmenities = state.filterByAmenities.includes(amenity)
      ? state.filterByAmenities.filter((a) => a !== amenity)
      : [...state.filterByAmenities, amenity];
    dispatch({ type: actionTypes.SET_AMENITIES_FILTER, payload: newAmenities });
  };

  const handleMinNightsChange = (e) => {
    // Ensure that the entered value is a positive integer
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setMinNights(value); // Update the state variable with the new value
    }
  };

  return (
    <>
      <StyledHeader>
        <SearchField
          type="text"
          placeholder={translations.searchRooms}
          value={state.searchTerm}
          onChange={(e) =>
            dispatch({
              type: actionTypes.SET_SEARCH_TERM,
              payload: e.target.value,
            })
          }
        />
      </StyledHeader>
      <Heading as="h1">{translations.allRooms}</Heading>
      <FilterContainer>
        <Row type="horizontal">
          <div className="selector">
            <label>{translations.sortBy}</label>
            <select
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_SORT_BY,
                  payload: e.target.value,
                })
              }
            >
              <option value="">{translations.sortByDefault}</option>
              <option value="price-asc">
                {translations.sortByPriceAscending}
              </option>
              <option value="price-desc">
                {translations.sortByPriceDescending}
              </option>
              <option value="capacity-asc">
                {translations.sortByCapacityAscending}
              </option>
              <option value="capacity-desc">
                {translations.sortByCapacityDescending}
              </option>
              <option value="name-asc">
                {translations.sortByNameAscending}
              </option>
              <option value="name-desc">
                {translations.sortByNameDescending}
              </option>
            </select>
          </div>
          <div className="selector">
            <label>{translations.filterByCapacity}</label>
            <select
              onChange={(e) =>
                dispatch({
                  type: actionTypes.SET_FILTER_BY_CAPACITY,
                  payload: e.target.value ? parseInt(e.target.value, 10) : null,
                })
              }
            >
              <option value="">{translations.filterByCapacityDefault}</option>
              <option value="2">2+ {translations.guests}</option>
              <option value="3">3+ {translations.guests}</option>
              <option value="4">4+ {translations.guests}</option>
              <option value="5">5+ {translations.guests}</option>
            </select>
          </div>
        </Row>
        <FilterSection>
          <label>{translations.filterByAmenities}</label>
          <CheckboxContainer>
            {[
              "Wi-Fi",
              "TV",
              "Air Conditioning",
              "Balcony",
              "Mini Bar",
              "Kitchenette",
            ].map((amenity) => (
              <div style={{ display: "inline" }} key={amenity}>
                <input
                  type="checkbox"
                  id={amenity}
                  checked={state.filterByAmenities.includes(amenity)}
                  onChange={() => handleAmenitiesChange(amenity)}
                />
                <label style={{ display: "inline" }} htmlFor={amenity}>
                  {amenity}
                </label>
              </div>
            ))}
          </CheckboxContainer>
        </FilterSection>
      </FilterContainer>
      {sortedAndFilteredRooms.map((room) => (
        <RoomCard key={room.id}>
          {state.selectedRoom && state.selectedRoom.id === room.id ? (
            <RoomDetails>
              <RoomHeader>{room.name}</RoomHeader>
              <FormRow label={translations.howMuchDoYouLikeThisHotel}>
                <Input type="text" id="min-nights" />
              </FormRow>
              <FormRow label={translations.howManyDaysYouStay}>
                <Input
                  type="number"
                  id="min-nights"
                  value={minNights}
                  onChange={handleMinNightsChange}
                />
              </FormRow>
              <Counter></Counter>
              <Button onClick={handleConfirmBooking}>
                {translations.confirmBooking}
              </Button>
            </RoomDetails>
          ) : (
            <RoomDetails>
              <Img src={room.image} alt={room.name} />
              <span>Number of room: {room.id}</span>
              <RoomHeader>{room.name}</RoomHeader>
              <RoomText>
                {translations.price}: {room.price}$
              </RoomText>
              <RoomText>
                {translations.capacity}: {room.capacity} {translations.guests}
              </RoomText>
              <RoomText>
                {translations.amenities}: {room.amenities.join(", ")}
              </RoomText>
              <StarRating maxRating={10} size={24} />
              {isAuthenticated ? (
                <Button onClick={() => handleBookNow(room)}>
                  {translations.bookNow}
                </Button>
              ) : (
                <></>
              )}
              <Tag>
                {room.id === 6 ? translations.room1 : translations.room2}
              </Tag>
            </RoomDetails>
          )}
        </RoomCard>
      ))}
      <ProfileCard
        Counter={state.bookings.length}
        Price={state.totalPrice}
        image={selectedRoomImage}
        minNights={minNights}
        bookedRoomIds={bookedRoomIds}
        onDelete={handleDelete} // Pass booked room IDs as prop
      />
    </>
  );
};

export default Cabins;
