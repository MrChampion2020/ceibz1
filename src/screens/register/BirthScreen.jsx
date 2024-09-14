import React, { useEffect, useRef, useState } from "react";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import RegistrationTop from "../../components/RegistrationTop";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";
const BirthScreen = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const buttonRef = useRef(null);
  const navigation = useNavigate();

  const handleDayChange = (text) => {
    setDay(text);
    if (text.length === 2) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = (text) => {
    setMonth(text);
    if (text.length === 2) {
      yearRef.current.focus();
    }
  };

  const handleYearChange = (text) => {
    setYear(text);
    if (text.length === 4) {
      buttonRef.current.focus();
    }
  };
  useEffect(() => {
    const progressData = getRegistrationProgress("Birth");
    if (progressData) {
      const { dateOfBirth } = progressData;
      if (dateOfBirth) {
        const [d, m, y] = dateOfBirth.split("/");
        setDay(d);
        setMonth(m);
        setYear(y);
        console.log("BirthScreen: ", progressData, " loaded");
      }
    }
  }, []);
  function handleNext() {
    if (day.trim() !== "" && month.trim() !== "" && year.trim() !== "") {
      const dateOfBirth = `${day}/${month}/${year}`;
      saveRegistrationProgress("Birth", { dateOfBirth });
      console.log("BirthScreen: ", { dateOfBirth }, " saved");
    }
    navigation("/location");
  }
  return (
    <>
      <RegistrationTop
        logo={LiaBirthdayCakeSolid}
        title="What's your date of birth"
      />
      <div className="mt-6 ml-52 w-[40%] flex flex-row justify-center items-center">
        <input
          type="number"
          name="day"
          className="w-[12%] m-[1%] text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
          id="day"
          autoFocus={true}
          value={day}
          onChange={(e) => handleDayChange(e.target.value)}
          placeholder="DD"
        />
        <input
          ref={monthRef}
          type="number"
          name="month"
          className="w-[12%] m-[1%] text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
          id="month"
          value={month}
          onChange={(e) => handleMonthChange(e.target.value)}
          placeholder="MM"
        />
        <input
          ref={yearRef}
          type="number"
          name="year"
          className="w-[20%] m-[1%] text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
          id="year"
          value={year}
          onChange={(e) => handleYearChange(e.target.value)}
          placeholder="YYYY"
        />
      </div>
      <div className="mt-[3%] ml-[60%]">
        <button
          ref={buttonRef}
          onClick={handleNext}
          className="bg-blue-500 h-12 w-60 border-none rounded-full justify-center items-center self-center mt-5 text-white text-lg font-bold font-sans"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BirthScreen;
