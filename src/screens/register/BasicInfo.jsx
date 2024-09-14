import React from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loveAnimation from "../../assets/love.json";
const BasicInfo = () => {
  const navigation = useNavigate();
  const handleNext = () => {
    navigation("/name");
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
      <div className="flex flex-col justify-center items-center bg-white mt-9 px-4 font-mono">
        <div className="flex flex-col justify-center items-center text-4xl font-semibold mt-2 mb-5">
          <div className="mb-5">You're one of a kind.</div>
          <div>Your profile should be too.</div>
        </div>
        <div className="flex justify-center items-center mb-5">
          <Lottie
            options={defaultOptions}
            height={260}
            width={300}
            className="w-80 h-80"
          />
        </div>
        <div className="flex justify-center items-center mb-5 text-gray-500 font-bold">
          Lets start with some basic information about you, Don't worry you can
          always change this later.
        </div>
        <div>
          <button onClick={handleNext} className="bg-blue-500 h-12 w-64 border-none rounded-3xl justify-center items-center self-center mt-5 text-white text-xl font-bold font-sans">
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
