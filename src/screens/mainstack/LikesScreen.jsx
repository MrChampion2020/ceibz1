import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import API_URL from "../../config"


const LikesScreen = () => {
  const navigation = useNavigate();
  const [option, setOption] = useState("Recent");
  const [userId, setUserId] = useState("");
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  const fetchReceivedLikes = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/recieved-likes/${userId}`
      );
      const recievedLikes = response.data.recievedLikes;

      setLikes(recievedLikes);
    } catch (error) {
      console.log("Error in fetching recieved likes ", error);
    }
  };
  console.log("Likes", likes);

  useEffect(() => {
    if (userId) {
      fetchReceivedLikes();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchReceivedLikes();
    }
  }, [userId]);
  return (
    <>
      <div className="font-bold text-3xl ml-[4%] mt-[1%]">Likes You</div>
      <div>
        {likes.length === 0 && (
          <div className="font-bold text-2xl flex justify-center mt-[1%]">
            No likes yet
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between">
        <div>
          {likes.length > 0 ? (
            <div
              className="flex flex-col justify-start mt-[5%] ml-[50%] border-2 border-black w-[400px] h-[500px] p-[10px] bg-slate-50"
              onClick={() => {
                navigation("/user/handle-like", {
                  state: {
                    name: likes[0].userId?.firstName,
                    image: likes[0].image,
                    imageUrls: likes[0].userId?.imageUrls,
                    prompts: likes[0].userId?.prompts,
                    userId: userId,
                    selectedUserId: likes[0].userId?._id,
                    likes: likes?.length,
                  },
                });
              }}
            >
              <div className="text-lg font-semibold text-slate-600 bg-slate-200 border-2 border-slate-400 border-dashed p-[3px] pl-[10px] pr-[10px] w-[200px]">
                Liked your photo
              </div>
              <div className="text-3xl font-bold ml-[5%] mt-[2%] mb-[2%]">
                {likes[0].userId?.firstName}
              </div>
              <img
                className="h-[500px] w-[400px] object-cover"
                src={likes[0].userId?.imageUrls[0]}
                alt=""
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col items-center w-[500px] mr-[2%] mt-[1.5%]">
          {likes.length > 0 ? (
            <div className="mb-2 text-3xl font-semibold">Up Next</div>
          ) : (
            <></>
          )}
          <div className="grid grid-cols-2 gap-5">
            {likes.slice(1).map((like, index) => (
              <div
                onClick={() => {
                  alert("You can only view the first like for now");
                }}
                className="border-2 border-black p-[10px] w-[250px] h-[350px] "
              >
                {like.comment ? (
                  <div className="text-base font-semibold text-slate-600 bg-slate-200 border-2 border-slate-400 border-dashed p-[2px] pl-[7px] pr-[7px] w-[150px]">
                    {like?.comment}
                  </div>
                ) : (
                  <div className="text-base font-semibold text-slate-600 bg-slate-200 border-2 border-slate-400 border-dashed p-[2px] pl-[7px] pr-[7px] w-[150px]">
                    Liked your photo
                  </div>
                )}
                <div className="text-xl font-bold ml-[5%] mt-[2%] mb-[2%]">
                  {like?.userId?.firstName}
                </div>
                <img
                  key={index}
                  className="h-[260px] w-[230px] object-cover"
                  src={like.userId?.imageUrls[0]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LikesScreen;
