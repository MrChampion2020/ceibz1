import React, { useEffect, useState } from "react";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { useDropzone } from "react-dropzone";
import RegistrationTop from "../../components/RegistrationTop";
import {
  saveRegistrationProgress,
  getRegistrationProgress,
} from "../../registrationUtils";

const PhotoScreen = () => {
  const [imageUrls, setImageUrls] = useState(["", "", "", "", "", ""]);
  const [imageUrl, setImageUrl] = useState("");
  const navigation = useNavigate();

  const handleAddImage = () => {
    // Find the first empty slot in the array
    const index = imageUrls.findIndex((url) => url === "");
    if (index !== -1) {
      const updatedUrls = [...imageUrls];
      updatedUrls[index] = imageUrl;
      setImageUrls(updatedUrls);
      setImageUrl("");
    }
  };

  useEffect(() => {
    const progressData = getRegistrationProgress("Photos");
    if (progressData && progressData.imageUrls) {
      setImageUrls(progressData.imageUrls || ["", "", "", "", "", ""]);
      console.log("PhotoScreen: ", progressData, " loaded");
    }
  }, []);

  const handleNext = () => {
    saveRegistrationProgress("Photos", { imageUrls });
    navigation("/prompts");
  };
  return (
    <>
      <RegistrationTop
        logo={MdOutlineVideoCameraBack}
        title="Upload your photos"
      />
      <div className="flex flex-row ml-[10%] mt-[2%]">
        <div className="flex flex-col">
          <div className="flex flex-row">
            {imageUrls?.slice(0, 3).map((url, index) => (
              <div key={index}>
                {url ? (
                  <div className="w-[130px] h-[130px] border-none rounded-xl m-2 flex items-center justify-center">
                    <img className="w-full h-full rounded-xl" src={url} />
                  </div>
                ) : (
                  <div className="w-[130px] h-[130px] border-2 border-dashed border-black rounded-xl m-2 flex items-center justify-center">
                    <BiImageAdd className="w-[80%] h-[80%] p-[25%]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-row">
            {imageUrls?.slice(3, 6).map((url, index) => (
              <div key={index}>
                {url ? (
                  <div className="w-[130px] h-[130px] border-none rounded-xl m-2 flex items-center justify-center">
                    <img className="w-full h-full rounded-xl" src={url} />
                  </div>
                ) : (
                  <div className="w-[130px] h-[130px] border-2 border-dashed border-black rounded-xl m-2 flex items-center justify-center">
                    <BiImageAdd className="w-[80%] h-[80%] p-[25%]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-[5%]">
          <input
            type="text"
            autoFocus={true}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter your image url"
            className="w-[400px] h-[100px] border-2 border-black rounded-xl p-[2%] focus:outline-none"
          />
          <button
            className="bg-blue-500 h-[50px] w-[250px] rounded-full justify-center items-center self-center mt-[20px] text-white text-lg font-bold font-sans"
            onClick={handleAddImage}
          >
            Add Image
          </button>
        </div>
      </div>
      <div className="ml-[74%]">
        <button
          className="bg-blue-500 h-[50px] w-[250px] rounded-full justify-center items-center self-center mt-[20px] text-white text-lg font-bold font-sans"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PhotoScreen;
