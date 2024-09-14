import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config"


const HandleLikeScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location?.state);
  const createMatch = async () => {
    try {
      const currentUserId = location.state.userId; // Example currentUserId
      const selectedUserId = location.state.selectedUserId; // Example selectedUserId
      const response = await axios.post(
        `${API_URL}/create-match`,
        {
          currentUserId,
          selectedUserId,
        }
      );
      if (response.status === 200) {
        navigate(-1);
        // Handle success, such as updating UI or showing a success message
      } else {
        console.error("Failed to create match");
        // Handle failure, such as showing an error message
      }
    } catch (error) {
      console.error("Error creating match:", error);
      // Handle error, such as showing an error message
    }
  };
  const match = () => {
    const confirmMatch = window.confirm(
      `Accept Request? Match with ${location.state.name}`
    );
    if (confirmMatch) {
      createMatch();
    } else {
      console.log("Cancel Pressed");
    }
  };
  const unlikeProfile = async () => {
    try {
      const currentUserId = location.state.userId; // Example currentUserId
      const unlikedUserId = location.state.selectedUserId; // Example unlikedUserId
      await axios.post(
        `${API_URL}/unlike-profile`,
        {
          userId: currentUserId,
          unlikedUserId: unlikedUserId,
        }
      );
      navigate(-1);
    } catch (error) {
      console.error("Error unliking profile:", error);
    }
  };
  return (
    <>
      <div className="font-bold text-3xl ml-[4%] mt-[1%]">
        {location?.state?.name}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center gap-4 w-[700px] ml-[7%] mt-[2%]">
            {location?.state?.imageUrls?.slice(0, 2).map((item, index) => (
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
            {location?.state?.imageUrls?.slice(2, 4).map((item, index) => (
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
            {location?.state?.imageUrls?.slice(4, 6).map((item, index) => (
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
          <div>
            {location?.state?.prompts.slice(0, 3).map((prompt) => (
              <div
                key={prompt.id}
                className="bg-slate-100 w-[360px] p-[5%] pl-[8%] border-2 border-slate-200 border-dashed rounded-md mb-[5%]"
              >
                <div className="text-lg font-semibold ">{prompt.question}</div>
                <div className="text-xl font-bold">{prompt.answer}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center items-center gap-6">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-[40px] rounded-full"
              onClick={unlikeProfile}
            >
              Unlike
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-[40px] rounded-full"
              onClick={match}
            >
              Match
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HandleLikeScreen;
