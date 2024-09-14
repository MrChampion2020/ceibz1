import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TbPrompt } from "react-icons/tb";
import RegistrationTop from "../../components/RegistrationTop";
import { useLocation } from "react-router-dom";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";

const PromptsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prompts = location.state ? location.state.prompts : null;
  const handleNext = () => {
    saveRegistrationProgress("Prompts", { prompts });
    navigate("/pre-final");
  };

  return (
    <>
      <RegistrationTop logo={TbPrompt} title="Write your profile answers" />
      <div className="flex flex-col justify-center items-center mt-[2%] mx-[33%]">
        {prompts ? (
          prompts.map((item, index) => (
            <button
              className="w-[450px] p-[12px] mt-[20px] border-2 border-gray-400 border-dashed"
              onClick={() => navigate("/show-prompts")}
            >
              <div className="text-sm font-bold text-gray-500">
                {item?.question}
              </div>
              <div className="text-xs font-medium text-gray-600">
                {item?.answer}
              </div>
            </button>
          ))
        ) : (
          <div>
            <button
              className="w-[450px] p-[12px] mt-[20px] border-2 border-gray-400 border-dashed"
              onClick={() => navigate("/show-prompts")}
            >
              <div className="text-sm font-bold text-gray-500">
                Select a Prompt
              </div>
              <div className="text-xs font-medium text-gray-600">
                And write your own answer
              </div>
            </button>
            <button
              className="w-[450px] p-[12px] mt-[20px] border-2 border-gray-400 border-dashed"
              onClick={() => navigate("/show-prompts")}
            >
              <div className="text-sm font-bold text-gray-500">
                Select a Prompt
              </div>
              <div className="text-xs font-medium text-gray-600">
                And write your own answer
              </div>
            </button>
            <button
              className="w-[450px] p-[12px] mt-[20px] border-2 border-gray-400 border-dashed"
              onClick={() => navigate("/show-prompts")}
            >
              <div className="text-sm font-bold text-gray-500">
                Select a Prompt
              </div>
              <div className="text-xs font-medium text-gray-600">
                And write your own answer
              </div>
            </button>
          </div>
        )}
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

export default PromptsScreen;
