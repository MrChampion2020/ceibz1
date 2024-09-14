import React from "react";

const RegistrationTop = (props) => {
  return (
    <>
      <div className="mt-10" >
        <div className="flex items-center ml-14">
          <div className="flex justify-center items-center w-12 h-12 border-black border-2 rounded-full "> <props.logo className="text-2xl" /> </div>
          <img
            className="w-24 h-24"
            src="https://cdn-icons-png.flaticon.com/128/10613/10613685.png"
            alt="..."
          />
        </div>
        <div className="text-2xl font-bold ml-20" >{props.title}</div>
      </div>
    </>
  );
};

export default RegistrationTop;
