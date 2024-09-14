import React, { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import RegistrationTop from "../../components/RegistrationTop";
import { useNavigate } from "react-router-dom";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";

const EmailScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    const progressData = getRegistrationProgress("Email");
    if (progressData) {
      setEmail(progressData.email || "");
      console.log("EmailScreen: ", progressData, " loaded");
    }
  }, []);
  const handleNext = () => {
    if (email.trim() !== "") {
      saveRegistrationProgress("Email", { email });
      console.log("EmailScreen: ", { email }, " saved");
    }
    navigation("/password");
  };
  return (
    <>
      <RegistrationTop
        logo={MdOutlineMailOutline}
        title="Please Provide a Valid Email"
      />
      <div className="mt-6 ml-52 w-[40%] flex flex-col justify-center items-center">
        <input
          type="email"
          name="email"
          className="w-full text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
          id="email"
          autoFocus={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
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

export default EmailScreen;
