// import React, { useState, useEffect } from "react";
// import RegistrationTop from "../../components/RegistrationTop";
// import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import {
//   saveRegistrationProgress,
//   getRegistrationProgress,
// } from "../../registrationUtils";
// const NameScreen = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const navigation = useNavigate();
//   useEffect(() => {
//     const progressData = getRegistrationProgress("Name");
//     if (progressData) {
//       setFirstName(progressData.firstName || "");
//       setLastName(progressData.lastName || "");
//       console.log("NameScreen: ", progressData, " loaded");
//     }
//   }, []);
//   const handleNext = () => {
//     if (firstName.trim() !== "") {
//       saveRegistrationProgress("Name", { firstName, lastName });
//       console.log("NameScreen: ", { firstName, lastName }, " saved");
//     }
//     navigation("/email");
//   };
//   return (
//     <>
//       <RegistrationTop
//         logo={MdOutlineDriveFileRenameOutline}
//         title="What's your name?"
//       />
//       <div className="mt-6 ml-52 w-[40%] flex flex-col justify-center items-center">
//         <input
//           type="text"
//           name="firstName"
//           className="w-full text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
//           id="firstName"
//           autoFocus={true}
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           placeholder="First Name (required)"
//         />
//         <input
//           type="text"
//           name="lastName"
//           className="w-full text-sm p-2 mt-5 border-b-2 border-b-black focus:outline-none"
//           id="lastName"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           placeholder="Last Name"
//         />
//       </div>
//       <div className="mt-[3%] ml-[60%]">
//         <button
//           onClick={handleNext}
//           className="bg-blue-500 h-12 w-60 border-none rounded-full justify-left items-center self-center mt-5 text-white text-lg font-bold font-sans"
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default NameScreen;


// import React, { useState, useRef } from 'react';

// const AdminScreen = () => {
//   const [streamOption, setStreamOption] = useState(null); // Track the selected streaming option
//   const [streamUrl, setStreamUrl] = useState(''); // For the URL stream
//   const videoRef = useRef(null); // For webcam video stream

//   // Function to start webcam stream using getUserMedia
//   const startWebcamStream = async () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         videoRef.current.srcObject = stream;
//         setStreamOption('webcam');
//       } catch (err) {
//         console.error('Error accessing webcam: ', err);
//       }
//     }
//   };

//   const handleStartUrlStream = () => {
//     setStreamOption('url');
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
      
//       {/* Select Streaming Option */}
//       <div>
//         <button onClick={startWebcamStream}>Stream with Webcam</button>
//         <button onClick={() => handleStartUrlStream()}>Stream with URL</button>
//       </div>

//       {/* If webcam is chosen */}
//       {streamOption === 'webcam' && (
//         <div>
//           <h2>Webcam Stream</h2>
//           <video ref={videoRef} autoPlay controls style={{ width: '500px' }} />
//         </div>
//       )}

//       {/* If URL is chosen */}
//       {streamOption === 'url' && (
//         <div>
//           <h2>Stream with URL</h2>
//           <input
//             type="text"
//             placeholder="Enter live stream URL (YouTube/Facebook)"
//             value={streamUrl}
//             onChange={(e) => setStreamUrl(e.target.value)}
//           />
//           {streamUrl && (
//             <div>
//               {/* Embed the URL */}
//               <iframe
//                 width="500"
//                 height="300"
//                 src={streamUrl}
//                 frameBorder="0"
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 title="Live stream"
//               ></iframe>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminScreen;



import React, { useState, useRef, useEffect } from 'react';

const AdminScreen = () => {
  const [streamOption, setStreamOption] = useState(null); // Track the selected streaming option
  const [streamUrl, setStreamUrl] = useState(''); // For the URL stream
  const [comments, setComments] = useState([]); // For storing comments
  const videoRef = useRef(null); // For webcam video stream

  // Function to start webcam stream using getUserMedia
  const startWebcamStream = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
        setStreamOption('webcam');
      } catch (err) {
        console.error('Error accessing webcam: ', err);
      }
    }
  };

  const handleStartUrlStream = () => {
    setStreamOption('url');
  };

  // Fetch comments from backend API
  useEffect(() => {
    fetch('/api/comments')
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Admin Dashboard</h1>
      
      {/* Select Streaming Option */}
      <div style={{ margin: '20px' }}>
        <button onClick={startWebcamStream} style={{ marginRight: '10px' }}>Stream with Webcam</button>
        <button onClick={() => handleStartUrlStream()}>Stream with URL</button>
      </div>

      {/* If webcam is chosen */}
      {streamOption === 'webcam' && (
        <div>
          <h2>Webcam Stream</h2>
          <video ref={videoRef} autoPlay controls style={{ width: '500px', height: '300px' }} />
        </div>
      )}

      {/* If URL is chosen */}
      {streamOption === 'url' && (
        <div>
          <h2>Stream with URL</h2>
          <input
            type="text"
            placeholder="Enter live stream URL (YouTube/Facebook)"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            style={{ width: '500px', height: '30px', margin: '10px' }}
          />
          {streamUrl && (
            <div>
              {/* Embed the URL */}
              <iframe
                width="500"
                height="300"
                src={streamUrl}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Live stream"
              ></iframe>
            </div>
          )}
        </div>
      )}

      {/* Comments section */}
      <div style={{ margin: '20px' }}>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>{comment.name}: {comment.comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminScreen;