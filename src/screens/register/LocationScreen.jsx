import React, { useEffect, useState } from "react";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RegistrationTop from "../../components/RegistrationTop";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";

const LocationScreen = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const navigation = useNavigate();
  const handleNext = () => {
    if (country.trim() !== "" && city.trim() !== "") {
      saveRegistrationProgress("Location", { country, city });
      console.log("Location: ", country, city, " saved");
    }
    navigation("/gender");
  };
  const [markerLocation, setMarkerLocation] = useState({
    lat: 53.35,
    lng: 18.8,
  });
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
  }
  const handleCountryChange = async (text) => {
    setCountry(text);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${text}?fullText=true`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { latlng } = data[0];
        if (latlng && latlng.length === 2) {
          const latitude = latlng[0];
          const longitude = latlng[1];
          setMarkerLocation({ lat: latitude, lng: longitude });
        }
      }
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };
  const handleCityChange = async (cityName) => {
    setCity(cityName);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          cityName
        )}&format=json&limit=1`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        if (data[0].lat && data[0].lon) {
          const { lat, lon } = data[0];
          setMarkerLocation({
            lat: parseFloat(lat),
            lng: parseFloat(lon),
          });
        }
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };
  return (
    <>
      <RegistrationTop
        logo={MdOutlineEditLocationAlt}
        title="Enter Your Location"
      />
      <div className="mt-6 ml-52 flex flex-col gap-3">
        <div className="flex flex-row">
          <div className="w-[40%] flex flex-col justify-center items-center">
            <input
              type="text"
              name="country"
              className="w-full text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
              id="country"
              autoFocus={true}
              value={country}
              onChange={(e) => handleCountryChange(e.target.value)}
              placeholder="Enter country name"
            />
            <input
              type="text"
              name="city"
              className="w-full text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
              id="city"
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder="Enter city name"
            />
          </div>
          <div className=" mt-[4%] ml-[15%] ">
            <button
              onClick={handleNext}
              className="bg-blue-500 h-12 w-60 border-none rounded-full justify-center items-center self-center mt-5 text-white text-lg font-bold font-sans"
            >
              Next
            </button>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <MapContainer
            center={markerLocation}
            zoom={5}
            style={{ height: "300px", width: "80%" }}
          >
            <ChangeView center={markerLocation} zoom={5} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerLocation}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default LocationScreen;
