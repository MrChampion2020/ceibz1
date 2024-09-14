import React from "react";
import { useNavigate } from "react-router-dom";

const UserChat = ({ item, userId }) => {
  const navigation = useNavigate();
  return (
    <>
      <div
        className="flex items-center border-b-[1px] border-[#bebebe] pt-[1%] pb-[1%] cursor-pointer"
        onClick={() => {
          navigation("/user/chat-room", {
            state: {
              image: item?.imageUrls[0],
              name: item?.firstName,
              receiverId: item?._id,
              senderId: userId,
            },
          });
        }}
      >
        <img
          src={item?.imageUrls[0]}
          alt="profile"
          className="h-[50px] w-[50px] rounded-full"
        />
        <div className="ml-[4%]">
          <div className="font-bold text-lg">
            {item?.firstName} {item?.lastName}
          </div>
          <div className="text-[#666] text-sm mt-[1%]">
            Chat with {item?.firstName}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChat;
