import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config"


const ProfileScreen = () => {
  const navigation = useNavigate();
  const [userId, setUserId] = useState("");
  const [currentProfile, setCurrentProfile] = useState(null);
  useEffect(() => {
    console.log("hi");
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Use localStorage instead of AsyncStorage
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);
  const { token, isLoading, setToken } = useContext(AuthContext);
  useEffect(() => {
    // Check if the token is set and not in loading state
    if (!token) {
      // Navigate to the login screen
      navigation("/");
    }
  }, [token, navigation]);

  const getUserDetails = async () => {
    try {
      // Make a GET request to the endpoint with the userId parameter
      const response = await axios.get(
        `${API_URL}/users/${userId}`
      );

      // Check if the response contains the user data
      if (response.status === 200) {
        // Extract the user data from the response
        const userData = response.data;

        // Handle the user data as needed (e.g., set state, display in UI)
        console.log("User details:", userData);

        setCurrentProfile(userData); // Return the user data if needed
      } else {
        console.error("Error fetching user details:", response.data.message);
        return null; // Return null or handle the error appropriately
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      return null; // Return null or handle the error appropriately
    }
  };

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = () => {
    try {
      localStorage.removeItem("token"); // Use localStorage instead of AsyncStorage
      console.log("AuthToken cleared successfully");

      setToken("");
      // Perform any necessary actions after clearing the authToken
    } catch (error) {
      console.error("Failed to clear AuthToken:", error);
    }
  };
  let dayValue, monthValue, yearValue, age;
  const dateOfBirth = currentProfile?.dateOfBirth;
  if (dateOfBirth) {
    [dayValue, monthValue, yearValue] = dateOfBirth.split("/");
    age = 2024 - yearValue;
  }
  return (
    <>
      <div className="mx-[4%] mt-[1%] flex flex-row justify-between items-center">
        <div className="font-bold text-3xl">
          {currentProfile?.firstName} {currentProfile?.lastName}
        </div>
        <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer">
          Logout
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center gap-4 w-[700px] ml-[7%] mt-[2%]">
            {currentProfile?.imageUrls?.slice(0, 2).map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={item}
                  alt="profile"
                  className="w-[300px] h-[400px] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 w-[700px] ml-[7%] mt-[2%]">
            {currentProfile?.imageUrls?.slice(2, 4).map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={item}
                  alt="profile"
                  className="w-[300px] h-[400px] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center gap-4 w-[700px] ml-[7%] mt-[2%]">
            {currentProfile?.imageUrls?.slice(4, 6).map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={item}
                  alt="profile"
                  className="w-[300px] h-[400px] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-start w-[400px] mr-[4%] mt-[2%] gap-4">
          <div className="flex flex-row gap-2 font-bold text-xl">
            Name:
            <div className="font-semibold">
              {currentProfile?.firstName} {currentProfile?.lastName}
            </div>
          </div>
          <div className="flex flex-row gap-2 font-bold text-xl">
            Age:
            <div className="font-semibold">{age}</div>
          </div>
          <div className="flex flex-row gap-2 font-bold text-xl">
            Gender:
            <div className="font-semibold">{currentProfile?.gender}</div>
          </div>
          <div className="flex flex-row gap-2 font-bold text-xl">
            Sexuality:
            <div className="font-semibold">{currentProfile?.type}</div>
          </div>
          <div className="flex flex-row gap-2 font-bold text-xl">
            Hometown:
            <div className="font-semibold">{currentProfile?.homeTown}</div>
          </div>
          <div className="flex flex-row gap-2 font-bold text-xl">
            Looking for:
            <div className="font-semibold">{currentProfile?.lookingFor}</div>
          </div>

          <div>
            {currentProfile?.prompts.slice(0, 3).map((prompt) => (
              <div
                key={prompt.id}
                className="bg-slate-100 w-[360px] p-[5%] pl-[8%] border-2 border-slate-200 border-dashed rounded-md mb-[5%]"
              >
                <div className="text-lg font-semibold ">{prompt.question}</div>
                <div className="text-xl font-bold">{prompt.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-[1%]" />
    </>
  );
};

export default ProfileScreen;
