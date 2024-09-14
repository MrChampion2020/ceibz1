import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "react-lottie";
import loveAnimation from "../../assets/love.json";
import API_URL from "../../config"


const SendLikeScreen = () => {
  const [comment, setComment] = useState("");
  const navigation = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;
  console.log("userId: ", userId);
  const likeProfile = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/like-profile`,
        {
          userId: location.state.userId,
          likedUserId: location.state.likedUserId,
          image: location?.state?.image,
          comment: comment,
        }
      );
      console.log(response.data.message); // Log success message
      if (response.status == 200) {
        navigation(-1);
      }
      // Handle success: Update UI, show notifications, etc.
    } catch (error) {
      console.error("Error liking profile:", error);
      // Handle error: Show error message, retry logic, etc.
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loveAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="font-bold text-3xl ml-[4%] mt-[1%]">
        {location?.state?.name}
      </div>
      <div className="flex flex-row justify-around items-center mt-[2%]">
        <img
          className="w-[350px] h-[450px] object-cover rounded-xl"
          src={location?.state?.image}
        />
        <div className="flex flex-col justify-center items-center">
        <Lottie
            options={defaultOptions}
            height={260}
            width={310}
            className="w-[20px] h-[20px]"
          />
          <input
            className="border-2 border-gray-400 rounded-lg p-2 w-[400px] mb-2 h-[50px] pl-[15px] pr-[15px]"
            placeholder="Add a comment"
            autoFocus={true}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full" 
          onClick={likeProfile} >Send Like</button>
        </div>
      </div>
    </>
  );
};

export default SendLikeScreen;
