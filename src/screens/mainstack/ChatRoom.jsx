import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCcDiscover, FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { PiSmileyBold } from "react-icons/pi";
import API_URL from "./config";

const ChatRoom = () => {
  const scrollViewRef = useRef();
  const [message, setMessage] = useState("");
  const navigation = useNavigate();
  const location = useLocation();
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io(`${API_URL}`);

    socketRef.current.on("connect", () => {
      console.log("Connected to the Socket.IO server");
    });

    socketRef.current.on("receiveMessage", (newMessage) => {
      console.log("new Message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = async (senderId, receiverId) => {
    socketRef.current.emit("sendMessage", { senderId, receiverId, message });
    setMessage("");
    setTimeout(() => {
      fetchMessages();
    }, 200);
  };

  const fetchMessages = async () => {
    try {
      const senderId = location.state.senderId;
      const receiverId = location.state.receiverId;

      const response = await axios.get(
        `${API_URL}/messages`,
        {
          params: { senderId, receiverId },
        }
      );

      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching the messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  });

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    });

    observer.observe(scrollViewRef.current, { childList: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between pl-[20px] pr-[20px] pt-[10px] pb-[10px] bg-slate-50 border-b-2 border-b-slate-200 ">
        <div className="flex flex-row items-center justify-center text-2xl font-semibold gap-3 ">
          <IoMdArrowRoundBack onClick={() => {navigation(-1)}}  />
          <div className="text-3xl font-semibold">{location?.state?.name}</div>
        </div>
        <div className="flex flex-row items-center justify-center text-lg font-semibold gap-3 ">
          <FaVideo /> <IoCall />
        </div>
      </div>
      <div
        ref={scrollViewRef}
        className="h-[72.5vh] w-[100%] pt-[10px] px-[10px] overflow-y-auto overflow-x-hidden"
      >
        {messages?.map((item, index) => (
          <div
            key={index}
            className={
              item?.senderId === location?.state?.senderId
                ? "flex justify-end rounded-md m-[3px]"
                : "flex justify-start rounded-md m-[3px]"
            }
          >
            <div
              className={
                item?.senderId === location?.state?.senderId
                  ? "flex w-fit justify-end bg-[#3db811] px-[10px] py-[5px] max-w-[60%] rounded-md"
                  : "flex w-fit justify-start bg-[#0c2db0] px-[10px] py-[5px] max-w-[60%] rounded-md"
              }
            >
              <div className="inline-block">
                <p className="text-lg text-left text-white font-medium">
                  {item?.message}
                </p>
                <p className=" text-xs text-right text-[#F0F0F0] mt-[2px]">
                  {formatTime(item?.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-row justify-center items-center py-[10px] px-[10px] bg-slate-300">
        <PiSmileyBold className="bg-white rounded-full p-[2px] text-black text-3xl" />
        <input
          className="w-[90%] h-[40px] rounded-full bg-white p-[10px] focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-[#3db811] text-white rounded-full p-[2px] h-[40px] w-[10%] focus:outline-none"
          onClick={() =>
            sendMessage(location?.state?.senderId, location?.state?.receiverId)
          }
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
