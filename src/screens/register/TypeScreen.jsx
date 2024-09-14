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

const TypeScreen = () => {
  const [type, setType] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    const progressData = getRegistrationProgress("Type");
    if (progressData) {
      setType(progressData.type || "");
      console.log("TypeScreen: ", progressData, " loaded");
    }
  }, []);
  const handleNext = () => {
    if (type.trim() !== "") {
      saveRegistrationProgress("Type", { type });
    }
    navigation("/dating");
  };
  return (
    <>
      <RegistrationTop logo={PiNotebookBold} title="What's your sexuality?" />
      <div className="text-[20px] ml-[10%] font-semibold text-gray-500">
        Users are matched based on the sexuality available below. You can add
        more about your sexuality afterwards.
      </div>
      <div className="flex flex-col justify-center w-[80%] ml-[10%] mt-[3%]">
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setType("Straight")}
        >
          <div className="pl-[20px] text-lg font-bold">Straight</div>
          {type === "Straight" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setType("Gay")}
        >
          <div className="pl-[20px] text-lg font-bold">Gay</div>
          {type === "Gay" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setType("Lesbian")}
        >
          <div className="pl-[20px] text-lg font-bold">Lesbian</div>
          {type === "Lesbian" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-b-2 border-gray-400 pb-[10px]"
          onClick={() => setType("Bisexual")}
        >
          <div className="pl-[20px] text-lg font-bold">Bisexual</div>
          {type === "Bisexual" ? (
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

export default TypeScreen;
