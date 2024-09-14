import React, { useEffect, useState } from "react";
import { PiNotebookBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import RegistrationTop from "../../components/RegistrationTop";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";

const GenderScreen = () => {
  const [gender, setGender] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    const progressData = getRegistrationProgress("Gender");
    if (progressData) {
      setGender(progressData.gender || "");
      console.log("GenderScreen: ", progressData, " loaded");
    }
  }, []);
  const handleNext = () => {
    if (gender.trim() !== "") {
      saveRegistrationProgress("Gender", { gender });
    }
    navigation("/type");
  };
  return (
    <>
      <RegistrationTop
        logo={PiNotebookBold}
        title="Which gender describes you the best?"
      />
      <div className="text-[20px] ml-[10%] font-semibold text-gray-500">
        Users are matched based on these three gender groups. You can add more
        about your gender afterwards.
      </div>
      <div className="flex flex-col justify-center w-[80%] ml-[10%] mt-[3%]">
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setGender("Men")}
        >
          <div className="pl-[20px] text-lg font-bold">Men</div>
          {gender === "Men" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setGender("Women")}
        >
          <div className="pl-[20px] text-lg font-bold">Women</div>
          {gender === "Women" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-b-2 border-gray-400 pb-[10px]"
          onClick={() => setGender("Non Binary")}
        >
          <div className="pl-[20px] text-lg font-bold">Non Binary</div>
          {gender === "Non Binary" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
      </div>
      <div className="mt-[3%] ml-[71.5%]">
        <button
          onClick={handleNext}
          className="bg-blue-500 h-12 w-60 border-none rounded-full justify-center items-center self-center mt-5 text-white text-lg font-bold font-sans"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default GenderScreen;
