import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UserChat from "../../components/UserChat";
import API_URL from "../../config"

const ChatScreen = () => {
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/get-matches/${userId}`
      );
      setMatches(response.data.matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);

  // Replace useFocusEffect with useEffect
  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);
  
  return (
    <>
      <div className="font-bold text-3xl ml-[4%] mt-[1%]">Your Matches</div>
      <div className="ml-[7%] mt-[1%]">
        {matches?.map((item, index) => (
          <UserChat key={index} userId={userId} item={item} />
        ))}
      </div>
    </>
  );
};

export default ChatScreen;
