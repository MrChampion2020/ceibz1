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

const LookingFor = () => {
  const [lookingFor, setLookingFor] = useState("");
  const navigaton = useNavigate();
  useEffect(() => {
    const progressData = getRegistrationProgress("LookingFor");
    if (progressData) {
      setLookingFor(progressData.lookingFor || "");
      console.log("LookingFor: ", progressData, " loaded");
    }
  }, []);
  const handleNext = () => {
    if (lookingFor.trim() !== "") {
      saveRegistrationProgress("LookingFor", { lookingFor });
      console.log("LookingFor: ", { lookingFor }, " saved");
    }
    navigaton("/hometown");
  };
  return (
    <>
      <RegistrationTop logo={PiNotebookBold} title="Who do you want to date?" />

      <div className="flex flex-col justify-center w-[80%] ml-[10%] mt-[3%">
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setLookingFor("Life Partner")}
        >
          <div className="pl-[20px] text-lg font-bold">Life Partner</div>
          {lookingFor === "Life Partner" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setLookingFor("Long-term Relationship")}
        >
          <div className="pl-[20px] text-lg font-bold">
            Long-term Relationship
          </div>
          {lookingFor === "Long-term Relationship" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() => setLookingFor("Short-term Relationship")}
        >
          <div className="pl-[20px] text-lg font-bold">
            Short-term Relationship
          </div>
          {lookingFor === "Short-term Relationship" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() =>
            setLookingFor("Long-term Relationship open to short-term")
          }
        >
          <div className="pl-[20px] text-lg font-bold">
            Long-term Relationship open to short-term
          </div>
          {lookingFor === "Long-term Relationship open to short-term" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-gray-400"
          onClick={() =>
            setLookingFor("Short-term Relationship open to long-term")
          }
        >
          <div className="pl-[20px] text-lg font-bold">
            Short-term Relationship open to long-term
          </div>
          {lookingFor === "Short-term Relationship open to long-term" ? (
            <FaRegCheckCircle className="text-[20px] mr-[10px]" />
          ) : (
            <FaRegCircle className="text-[20px] mr-[10px]" />
          )}
        </div>
        <div
          className="flex flex-row justify-between items-center mt-[10px] pt-[10px] border-t-2 border-b-2 border-gray-400 pb-[10px]"
          onClick={() => setLookingFor("Figuring out my dating goals")}
        >
          <div className="pl-[20px] text-lg font-bold">
            Figuring out my dating goals
          </div>
          {lookingFor === "Figuring out my dating goals" ? (
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

export default LookingFor;
