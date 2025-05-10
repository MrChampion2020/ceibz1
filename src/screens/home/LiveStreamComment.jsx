// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ThumbsUp, Heart, MessageCircle } from 'lucide-react'

// const socket = io('http://localhost:8000'); // Replace with your server URL

// export default function LiveStreamComment({ streamId }) {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [replyContent, setReplyContent] = useState('');
//   const [replyingTo, setReplyingTo] = useState(null);

//   useEffect(() => {
//     fetchComments();

//     socket.on('commentAdded', (comment) => {
//       setComments(prevComments => [comment, ...prevComments]);
//     });

//     socket.on('reactionAdded', (updatedComment) => {
//       setComments(prevComments =>
//         prevComments.map(comment =>
//           comment._id === updatedComment._id ? updatedComment : comment
//         )
//       );
//     });

//     socket.on('replyAdded', ({ commentId, reply }) => {
//       setComments(prevComments =>
//         prevComments.map(comment =>
//           comment._id === commentId
//             ? { ...comment, replies: [...comment.replies, reply] }
//             : comment
//         )
//       );
//     });

//     return () => {
//       socket.off('commentAdded');
//       socket.off('reactionAdded');
//       socket.off('replyAdded');
//     };
//   }, [streamId]);

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get(`/api/user/comments/${streamId}`);
//       setComments(response.data);
//     } catch (error) {
//       console.error('Failed to fetch comments:', error);
//     }
//   };

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;
//     try {
//       const response = await axios.post(`/api/user/comment/${streamId}`, { content: newComment });
//       setNewComment('');
//       socket.emit('newComment', response.data);
//     } catch (error) {
//       console.error('Failed to submit comment:', error);
//     }
//   };

//   const handleReaction = async (commentId, reactionType) => {
//     try {
//       const response = await axios.put(`/api/user/comment/${commentId}/reaction`, { reactionType });
//       socket.emit('newReaction', response.data);
//     } catch (error) {
//       console.error('Failed to add reaction:', error);
//     }
//   };

//   const handleReply = async (commentId) => {
//     if (!replyContent.trim()) return;
//     try {
//       const response = await axios.post(`/api/user/comment/${commentId}/reply`, { content: replyContent });
//       setReplyContent('');
//       setReplyingTo(null);
//       socket.emit('newReply', { commentId, reply: response.data });
//     } catch (error) {
//       console.error('Failed to add reply:', error);
//     }
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white">
//       <h2 className="text-xl font-bold mb-4">Comments</h2>
//       <form onSubmit={handleSubmitComment} className="flex items-start space-x-4 mb-6">
//         <Avatar className="w-10 h-10">
//           <AvatarImage src="/placeholder-user.jpg" alt="User" />
//           <AvatarFallback>U</AvatarFallback>
//         </Avatar>
//         <div className="flex-grow">
//           <Textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             className="w-full mb-2"
//           />
//           <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Comment</Button>
//         </div>
//       </form>
//       <div className="space-y-6">
//         {comments.map(comment => (
//           <div key={comment._id} className="flex space-x-4">
//             <Avatar className="w-10 h-10">
//               <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.username}`} alt={comment.username} />
//               <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
//             </Avatar>
//             <div className="flex-grow">
//               <div className="flex items-center space-x-2 mb-1">
//                 <span className="font-semibold">{comment.username}</span>
//                 <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
//               </div>
//               <p className="mb-2">{comment.content}</p>
//               <div className="flex items-center space-x-4 mb-2">
//                 <button
//                   onClick={() => handleReaction(comment._id, 'thumbsUp')}
//                   className={`flex items-center space-x-1 ${comment.reactions.thumbsUp > 0 ? 'text-blue-600' : 'text-gray-500'}`}
//                 >
//                   <ThumbsUp className="w-4 h-4" />
//                   <span>{comment.reactions.thumbsUp}</span>
//                 </button>
//                 <button
//                   onClick={() => handleReaction(comment._id, 'heart')}
//                   className={`flex items-center space-x-1 ${comment.reactions.heart > 0 ? 'text-red-600' : 'text-gray-500'}`}
//                 >
//                   <Heart className="w-4 h-4" />
//                   <span>{comment.reactions.heart}</span>
//                 </button>
//                 <button
//                   onClick={() => setReplyingTo(comment._id)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   Reply
//                 </button>
//               </div>
//               {replyingTo === comment._id && (
//                 <div className="mb-4">
//                   <Textarea
//                     value={replyContent}
//                     onChange={(e) => setReplyContent(e.target.value)}
//                     placeholder="Write a reply..."
//                     className="w-full mb-2"
//                   />
//                   <Button onClick={() => handleReply(comment._id)} className="bg-blue-600 hover:bg-blue-700 text-white">Reply</Button>
//                 </div>
//               )}
//               {comment.replies.length > 0 && (
//                 <div className="ml-8 space-y-4">
//                   {comment.replies.map((reply, index) => (
//                     <div key={index} className="flex space-x-4">
//                       <Avatar className="w-8 h-8">
//                         <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${reply.username}`} alt={reply.username} />
//                         <AvatarFallback>{reply.username.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <div className="flex items-center space-x-2 mb-1">
//                           <span className="font-semibold">{reply.username}</span>
//                           <span className="text-sm text-gray-500">{new Date(reply.createdAt).toLocaleString()}</span>
//                         </div>
//                         <p>{reply.content}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }








// // import React, { useState, useEffect, useRef } from "react";
// // import io from "socket.io-client";
// // import { jwtDecode } from 'jwt-decode'; // Correct named import

// // const socket = io("http://localhost:8000"); // Use your server URL

// // const CommentForm = ({ streamId }) => {
// //   const [comments, setComments] = useState([]);
// //   const [newComment, setNewComment] = useState("");
// //   const commentRef = useRef(null);

// //   // Fetch the username from the token
// //   const getUsernameFromToken = () => {
// //     const token = localStorage.getItem('authToken');
// //     if (token) {
// //       const decoded = jwtDecode(token); // Correct usage
// //       return decoded.username; // Assuming 'username' is stored in the token
// //     }
// //     return null;
// //   };

// //   // Fetch comments for the current stream
// //   useEffect(() => {
// //     fetch(`http://localhost:8000/api/user/comments/${streamId}`)
// //       .then((res) => res.json())
// //       .then((data) => setComments(data))
// //       .catch((err) => console.error("Error fetching comments:", err));
// //   }, [streamId]);

// //   // Listen for new comments and reactions in real-time
// //   useEffect(() => {
// //     socket.on("newComment", (comment) => {
// //       setComments((prevComments) => [...prevComments, comment]);
// //       scrollToBottom(); // Scroll to the latest comment
// //     });

// //     socket.on("reactionUpdated", (updatedComment) => {
// //       setComments((prevComments) =>
// //         prevComments.map((comment) =>
// //           comment._id === updatedComment._id ? updatedComment : comment
// //         )
// //       );
// //     });

// //     return () => {
// //       socket.off("newComment");
// //       socket.off("reactionUpdated");
// //     };
// //   }, []);

// //   // Scroll to the bottom when new comments are added
// //   const scrollToBottom = () => {
// //     if (commentRef.current) {
// //       commentRef.current.scrollTop = commentRef.current.scrollHeight;
// //     }
// //   };

// //   // Post a new comment
// //   const handleCommentSubmit = () => {
// //     const username = getUsernameFromToken(); // Get the username from the token
// //     if (!username) {
// //       alert('You must be logged in to comment');
// //       return;
// //     }

// //     fetch(`http://localhost:8000/api/user/comment/${streamId}`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "Authorization": `Bearer ${localStorage.getItem('authToken')}`, // Send the token
// //       },
// //       body: JSON.stringify({ username, content: newComment }),
// //     })
// //       .then((res) => res.json())
// //       .then(() => {
// //         setNewComment(""); // Clear the input field
// //       })
// //       .catch((err) => console.error("Error posting comment:", err));
// //   };

// //   // Handle reactions
// //   const handleReaction = (commentId, reactionType) => {
// //     fetch(`http://localhost:8000/api/user/comment/${commentId}/reaction`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
// //       },
// //       body: JSON.stringify({ reactionType }),
// //     }).catch((err) => console.error("Error updating reaction:", err));
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h2>Comments</h2>
// //       <div
// //         ref={commentRef}
// //         style={{
// //           maxHeight: "400px",
// //           overflowY: "auto",
// //           border: "1px solid #ccc",
// //           padding: "10px",
// //         }}
// //       >
// //         {comments.map((comment) => (
// //           <div key={comment._id} style={styles.comment}>
// //             <p>
// //               <strong>{comment.username}</strong>: {comment.content}
// //             </p>
// //             <div>
// //               <button
// //                 onClick={() => handleReaction(comment._id, "thumbsUp")}
// //                 style={styles.reactionButton}
// //               >
// //                 👍 {comment.reactions.thumbsUp || 0}
// //               </button>
// //               <button
// //                 onClick={() => handleReaction(comment._id, "heart")}
// //                 style={styles.reactionButton}
// //               >
// //                 ❤️ {comment.reactions.heart || 0}
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //       <div>
// //         <textarea
// //           value={newComment}
// //           onChange={(e) => setNewComment(e.target.value)}
// //           placeholder="Add a comment..."
// //           rows="3"
// //           style={styles.textarea}
// //         />
// //         <button onClick={handleCommentSubmit} style={styles.submitButton}>
// //           Submit
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     padding: "10px",
// //     maxWidth: "600px",
// //     margin: "0 auto",
// //     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// //   },
// //   comment: {
// //     marginBottom: "20px",
// //     padding: "10px",
// //     border: "1px solid #ddd",
// //     borderRadius: "8px",
// //     backgroundColor: "#f9f9f9",
// //   },
// //   reactionButton: {
// //     marginRight: "10px",
// //     padding: "5px 10px",
// //     border: "none",
// //     borderRadius: "5px",
// //     cursor: "pointer",
// //     backgroundColor: "#f0f0f0",
// //   },
// //   textarea: {
// //     width: "100%",
// //     padding: "10px",
// //     marginBottom: "10px",
// //     borderRadius: "4px",
// //     border: "1px solid #ccc",
// //   },
// //   submitButton: {
// //     padding: "10px 20px",
// //     backgroundColor: "#28a745",
// //     color: "#fff",
// //     border: "none",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //   },
// // };

// // export default CommentForm;



import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

const LiveStreamComment = ({ streamId, userName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const commentRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/user/comments/${streamId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [streamId]);

  useEffect(() => {
    socket.on("newComment", (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
      scrollToBottom();
    });

    socket.on("reactionUpdated", (updatedComment) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        )
      );
    });

    return () => {
      socket.off("newComment");
      socket.off("reactionUpdated");
    };
  }, []);

  const scrollToBottom = () => {
    if (commentRef.current) {
      commentRef.current.scrollTop = commentRef.current.scrollHeight;
    }
  };

  const handleCommentSubmit = () => {
    if (!newComment) return;

    fetch(`http://localhost:8000/api/user/comment/${streamId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ username: userName, content: newComment }),
    })
      .then((res) => res.json())
      .then(() => {
        setNewComment("");
      })
      .catch((err) => console.error("Error posting comment:", err));
  };

  const handleReaction = (commentId, reactionType) => {
    fetch(`http://localhost:8000/api/user/comment/${commentId}/reaction`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({ reactionType }),
    }).catch((err) => console.error("Error updating reaction:", err));
  };

  return (
    <div>
      <h2>Comments</h2>
      <div ref={commentRef} style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc" }}>
        {comments.map((comment) => (
          <div key={comment._id} style={{ marginBottom: "20px" }}>
            <p><strong>{comment.username}</strong>: {comment.content}</p>
            <div>
              <button onClick={() => handleReaction(comment._id, "thumbsUp")}>👍 {comment.reactions.thumbsUp || 0}</button>
              <button onClick={() => handleReaction(comment._id, "heart")}>❤️ {comment.reactions.heart || 0}</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default LiveStreamComment;
