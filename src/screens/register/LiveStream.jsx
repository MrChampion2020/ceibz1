// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import ReactPlayer from 'react-player';

// // Socket.io connection
// const socket = io.connect('http://localhost:5000');

// const LiveStream = () => {
//   // State to handle user input
//   const [userInfo, setUserInfo] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     location: '',
//     participants: 1,
//   });
  
//   // State to check if form is submitted and access is granted
//   const [accessGranted, setAccessGranted] = useState(false);
  
//   // State to handle the current active stream
//   const [stream, setStream] = useState(null);
  
//   // State for handling comments
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   // Fetch the active stream from the backend once the form is submitted
//   useEffect(() => {
//     if (accessGranted) {
//       const fetchStream = async () => {
//         try {
//           const response = await axios.get('http://localhost:5000/api/get-stream');
//           setStream(response.data.stream);
//         } catch (error) {
//           console.error('Error fetching stream: ', error);
//         }
//       };

//       fetchStream();
//     }
//   }, [accessGranted]);

//   // Fetch past comments and listen for real-time comments once access is granted
//   useEffect(() => {
//     if (accessGranted) {
//       // Fetch past comments
//       const fetchComments = async () => {
//         const response = await axios.get('http://localhost:5000/api/comments');
//         setComments(response.data);
//       };

//       fetchComments();

//       // Listen for new real-time comments via Socket.io
//       socket.on('comment', (comment) => {
//         setComments((prev) => [...prev, comment]);
//       });
//     }
//   }, [accessGranted]);

//   // Handle user input form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Post the user info to register before accessing the stream
//       await axios.post('http://localhost:5000/api/register', userInfo);
//       setAccessGranted(true); // Grant access to the stream
//     } catch (error) {
//       console.error('Error submitting user info: ', error);
//     }
//   };

//   // Handle new comment submission
//   const handleSendComment = () => {
//     if (newComment.trim() === '') return;
    
//     socket.emit('comment', { name: userInfo.name, comment: newComment });
//     setNewComment(''); // Clear the comment input after sending
//   };

//   return (
//     <div>
//       {/* If access is not granted, show the user input form */}
//       {!accessGranted ? (
//         <form onSubmit={handleSubmit}>
//           <h2>Enter your details to access the live stream:</h2>
//           <input
//             type="text"
//             placeholder="Name"
//             required
//             value={userInfo.name}
//             onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             value={userInfo.email}
//             onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             required
//             value={userInfo.phone}
//             onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             required
//             value={userInfo.location}
//             onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
//           />
//           <input
//             type="number"
//             placeholder="Number of participants"
//             required
//             min="1"
//             value={userInfo.participants}
//             onChange={(e) => setUserInfo({ ...userInfo, participants: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//       ) : (
//         <div>
//           {/* Live Stream Section */}
//           {stream ? (
//             <div>
//               {stream.type === 'webcam' ? (
//                 <div>
//                   <h2>Webcam Stream</h2>
//                   <video autoPlay controls style={{ width: '500px' }} id="webcam-video" />
//                 </div>
//               ) : (
//                 <div>
//                   <h2>Stream via URL</h2>
//                   <ReactPlayer url={stream.url} playing controls width="500px" height="300px" />
//                 </div>
//               )}
//             </div>
//           ) : (
//             <h2>No active stream available</h2>
//           )}

//           {/* Comments Section */}
//           <div>
//             <h2>Comments</h2>
//             <div>
//               {comments.map((comment, index) => (
//                 <div key={index}>
//                   <strong>{comment.name}: </strong>
//                   {comment.comment}
//                 </div>
//               ))}
//             </div>

//             {/* Comment Input Field */}
//             <input
//               type="text"
//               placeholder="Your Comment"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <button onClick={handleSendComment}>Send Comment</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveStream;


import React, { useState, useEffect } from 'react';

const LiveStream = () => {
  const [currentStream, setCurrentStream] = useState({ type: null, url: null });

  // Fetch the current stream from the server
  useEffect(() => {
    fetch('/api/stream')
      .then((res) => res.json())
      .then((data) => setCurrentStream(data));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Live Stream</h1>

      {/* Display the current stream to users */}
      {currentStream.type === 'webcam' ? (
        <p>Webcam stream is active (Admin's webcam)</p>
      ) : currentStream.type === 'youtube' ? (
        <iframe
          width="500"
          height="300"
          src={currentStream.url}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Live stream"
        ></iframe>
      ) : (
        <p>No stream is currently active</p>
      )}
    </div>
  );
};

export default LiveStream;
