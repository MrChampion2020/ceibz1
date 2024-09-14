import React, { useEffect, useState } from "react";
import RegistrationTop from "../../components/RegistrationTop";
import { useNavigate } from "react-router-dom";
import { MdOutlineHome } from "react-icons/md";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";

const HomeTownScreen = () => {
  const [homeTown, setHomeTown] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    const progressData = getRegistrationProgress("HomeTown");
    if (progressData) {
      setHomeTown(progressData.homeTown || "");
      console.log("HomeTownScreen: ", progressData, " loaded");
    }
  }, []);
  const handleNext = () => {
    if (homeTown.trim() !== "") {
      saveRegistrationProgress("HomeTown", { homeTown });
      console.log("HomeTown: ", { homeTown }, " saved");
    }
    navigation("/photo");
  };
  return (
    <div>
      <RegistrationTop logo={MdOutlineHome} title="What's your hometown?" />
      <div className="mt-6 ml-52 w-[40%] flex flex-col justify-center items-center">
        <input
          type="text"
          name="homeTown"
          className="w-full text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
          id="homeTown"
          autoFocus={true}
          value={homeTown}
          onChange={(e) => setHomeTown(e.target.value)}
          placeholder="HomeTown"
        />
      </div>
      <div className="mt-[3%] ml-[60%]">
        <button
          className="bg-blue-500 h-12 w-60 border-none rounded-full justify-center items-center self-center mt-5 text-white text-lg font-bold font-sans"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeTownScreen;
