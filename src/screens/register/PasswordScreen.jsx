import React, { useState } from "react";
import { TbPasswordUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import RegistrationTop from "../../components/RegistrationTop";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const handleNext = () => {
    if (password.trim() !== "") {
      saveRegistrationProgress("Password", { password });
      console.log("Password: ", password, " saved");
    }
    navigation("/birth");
  };
  return (
    <>
      <RegistrationTop
        logo={TbPasswordUser} title="Create a password"
      />
      <div className="mt-6 ml-52 w-[40%] flex flex-col justify-center items-center">
        <input
          type="password"
          name="password"
          className="w-full text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
          id="password"
          autoFocus={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <div className="mt-[3%] ml-[60%]">
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

export default PasswordScreen;
