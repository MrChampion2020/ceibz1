/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null); // For newly selected image preview
  const [images, setImages] = useState([]); // For all uploaded images
  const [cameraMode, setCameraMode] = useState(false); // Toggle between camera and file upload
  const [cameraFacingMode, setCameraFacingMode] = useState('environment'); // Toggle between front and back camera

  const webcamRef = React.useRef(null);

  // Handle file selection for preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Show preview for the selected file
  };

  // Handle form submission and file upload
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile); // 'image' is the key that the backend expects

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Image uploaded successfully!');
      setSelectedFile(null); // Clear the selected file
      setPreview(null); // Clear the preview
      fetchImages(); // Refresh image list after upload
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  // Fetch all images from the backend
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setImages(response.data); // Set images from the server
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Capture the image from the webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], `camera-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
        setSelectedFile(file); // Treat this as the selected file to upload
        setPreview(URL.createObjectURL(file)); // Show preview
      });
  };

  // Switch between front and back cameras
  const toggleCameraFacingMode = () => {
    setCameraFacingMode((prevMode) => (prevMode === 'user' ? 'environment' : 'user'));
  };

  // Fetch images when the component is first mounted
  useEffect(() => {
    fetchImages(); // Load images from the server
  }, []);

  return (
    <div>
      <h2>Upload an Image</h2>

      {cameraMode ? (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: cameraFacingMode,
            }}
            style={{ width: '100%', height: '300px' }}
          />
          <button onClick={toggleCameraFacingMode}>
            Switch to {cameraFacingMode === 'user' ? 'Back' : 'Front'} Camera
          </button>
          <button onClick={captureImage}>Capture Photo</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      )}

      {preview && (
        <div>
          <h3>Image Preview:</h3>
          <img src={preview} alt="Preview" style={{ width: '200px' }} />
        </div>
      )}

      <button onClick={() => setCameraMode(!cameraMode)}>
        {cameraMode ? 'Cancel Camera' : 'Use Camera'}
      </button>

      <div>
        <h3>Uploaded Images:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image) => (
            <div key={image._id} style={{ margin: '10px' }}>
              <img
                src={`http://localhost:5000${image.path}`}
                alt={image.filename}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
*/






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ImageUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [images, setImages] = useState([]);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     setPreview(URL.createObjectURL(file)); // Preview the image
//   };

//   // Handle form submission and file upload
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       alert('Please select a file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', selectedFile); // 'image' is the key that the backend will expect

//     try {
//       // Make POST request to upload the image
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log(response.data);
//       alert('Image uploaded successfully!');
//       fetchImages(); // Refresh image list after upload
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       alert('Failed to upload image');
//     }
//   };

//   // Fetch all images from the backend
//   const fetchImages = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/images');
//       setImages(response.data);
//     } catch (error) {
//       console.error('Error fetching images:', error);
//     }
//   };

//   // Fetch images on component mount
//   useEffect(() => {
//     fetchImages();
//   }, []);

//   return (
//     <div>
//       <h2>Upload an Image</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>

//       {preview && (
//         <div>
//           <h3>Image Preview:</h3>
//           <img src={preview} alt="Preview" style={{ width: '200px' }} />
//         </div>
//       )}

//       <div>
//         <h3>Uploaded Images:</h3>
//         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//           {images.map((image) => (
//             <div key={image._id} style={{ margin: '10px' }}>
//               <img
//                 src={`http://localhost:5000${image.path}`}
//                 alt={image.filename}
//                 style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;












// import React, { useState, useEffect} from 'react';
// import { useMediaQuery } from 'react-responsive';
// import logo from './logo.jpg'; // Adjust the path if needed
// import pastorVideo from "../../assets/pastor.mp4";
// import transparentImage from '../../assets/chuch.jpg'; // Replace with your background image
// import church from '../../assets/church.jpg'; // Replace with carousel images
// import pastorjoe from '../../assets/pjoe.jpg';
// import carousel3 from '../../assets/pjoe1.jpg';
// import chuch from '../../assets/chuch.jpg';
// import { useNavigate } from "react-router-dom";


//   const LoginScreen = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
//   const [showFullText3, setShowFullText3] = useState(false);
//   const [showFullText4, setShowFullText4] = useState(false);
//   const [currentDay, setCurrentDay] = useState(''); // For Section 5 - Schedule
//   const [carouselIndex, setCarouselIndex] = useState(0);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const navigation = useNavigate();

//   const carouselImages = [
//     { src: church, text: 'Teens Church' },
//     { src: pastorjoe, text: 'Foundation School' },
//     { src: carousel3, text: 'Children Church' }
//   ];

//   const handleNextSlide = () => {
//     setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
//   };

//   const schedule = {
//     Monday: "Bible Study at 6 PM",
//     Tuesday: "Prayer Meeting at 7 PM",
//     Wednesday: "Fellowship at 5 PM",
//     Thursday: "Worship Service at 6 PM",
//     Friday: "Youth Service at 7 PM",
//     Saturday: "Evangelism at 9 AM",
//     Sunday: "Main Service at 10 AM"
//   };

//   const textSection3 = "Christ Embassy is not just a local assembly; it’s a vision. The Lord has called us to fulfill a very definite purpose, which is to take His divine presence to the peoples and nations of the world, and to demonstrate the character of His Spirit everywhere. When you worship with us, you learn more than just the letters of the Word; you’re imparted with and impacted by the Spirit of the Word. As we share God’s Word, it takes root in you, and you become exactly what the Lord wants you to be. The Holy Spirit gets a hold of your life, and His vision becomes real to you and in your life.";
//   const textSection4 = "Christ Embassy is not just a local assembly; it’s a vision. The Lord has called us to fulfill a very definite purpose, which is to take His divine presence to the peoples and nations of the world, and to demonstrate the character of His Spirit everywhere. When you worship with us, you learn more than just the letters of the Word; you’re imparted with and impacted by the Spirit of the Word. As we share God’s Word, it takes root in you, and you become exactly what the Lord wants you to be. The Holy Spirit gets a hold of your life, and His vision becomes real to you and in your life.";


//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       {/* Background video */}
//       <div style={{
//         position: 'relative',
//         height: '100vh',
//         width: '100vw',
//         overflow: 'hidden',
//       }}>
//         <video style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100vh',
//           objectFit: 'cover',
//         }} autoPlay muted loop>
//           <source src={pastorVideo} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Overlay Header and Content */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//           <header style={{
//             display: 'flex',
//             backgroundColor: 'rgba(0, 0, 0, 0.4)',
//             justifyContent: 'space-between',
//             width: '100%',
//             alignItems: 'center',
//             padding: 20,
//             zIndex: 1,
//             borderBottom: '0.2px solid white' 
//           }}>
//             <img src={logo} alt="Church Logo" style={{ width: '60px', height: 'auto' }} />
//             {isMobile ? (
//               <div style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} onClick={toggleMenu}>
//                 {menuOpen ? 'Close Menu' : 'Open Menu'}
//               </div>
//             ) : (
//               <nav style={{ display: 'flex', gap: '70px', color: 'white', marginRight: '5%', fontWeight: 600 }}>
//                 <a href="#live" style={{ textDecoration: 'none', color: 'white' } }
//                    onClick={() => {
//                     navigation("/LiveStream", {
                      
//                     });}}
//                 >LIVE</a>
//                 <a href="#ministries" style={{ textDecoration: 'none', color: 'white' }}>MINISTRIES</a>
//                 <a href="#testimonies" style={{ textDecoration: 'none', color: 'white' }}>TESTIMONIES</a>
//                 <a href="#programs" style={{ textDecoration: 'none', color: 'white' }}>PROGRAMS</a>
//                 <a href="#give" style={{ textDecoration: 'none', color: 'white'}}>GIVE</a>
//               </nav>
//             )}
//           </header>

//           {/* Overlay Text and Action Button */}
//           <div style={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
//             <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Join Live Service</h1>
//             <button 
//             onClick={() => {
//               navigation("/LiveStream", {
                
//               });}}

//             style={{
//               padding: '15px 30px',
//               backgroundColor: 'orange',
//               color: 'white',
//               fontSize: '1.2rem',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               marginBottom: '70px'
//             }}>Watch Live Now</button>
//           </div>

//           {/* Dropdown Menu for Mobile */}
//           {menuOpen && isMobile && (
//             <nav style={{
//               position: 'absolute',
//               top: '60px',
//               width: '100%',
//               backgroundColor: 'rgba(0, 0, 0, 0.8)',
//               display: 'flex',
//               flexDirection: 'column',
//               padding: '20px',
//             }}>
//               <a href="#live" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Live</a>
//               <a href="#ministries" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Ministries</a>
//               <a href="#testimonies" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Testimonies</a>
//               <a href="#programs" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Programs</a>
//               <a href="#give" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Give</a>
//             </nav>
//           )}
//         </div>
//       </div>

//       {/* Individual Sections */}
//       <div style={{ width: '100%', height: '50%' }}>
//       {/* Section 1: About */}
//       <div style={{ padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center' }}>
//         <img src={pastorjoe} alt="Pastor Joe" style={{ width: '600px', height: '500px', marginRight: '20px' }} />
//         <div style={{ flex: 1 }}>
//           <h2  style={{ fontSize: 50, fontWeight: 900, marginBottom: 30 }}>Today with Pastor Joe</h2>
//           <p>The man of God Highly Esteemed Pastor Joe Agbaje is the highly revered Pastor of Christ Embassy 
//             Ibadan Zone 1, an ardent follower of the President of the Loveworld Nation Rev. Chris Oyakhilome DSc. DSc. DD. 
//             <br/>
            
//             Over the years he has demonstarted the power of the word in teaching and healing the sick and in setting the captives 
//             free. Every meeting with him is epoc making! </p>

//           <div style={{ display: 'flex', gap: '10px' }}>
//             <button style={{ padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none' }}>Read More</button>
//             <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Contact</button>
//           </div>
//         </div>
//       </div>

//       {/* Section 2: Our Vision */}
//       <div style={{
//         backgroundImage: `url(${transparentImage})`,
//         backgroundSize: 'cover',
//         height: '100vh',
//         width: '100%',
//         display: 'block',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '80px',
//         margin: 'auto'
//       }}>
//         <h1 style={{ color: 'white', fontSize: '40px', padding: 20, textAlign: 'center'}}>Our Vision</h1>

//         <br />
//         <p style={{ color: 'white', fontSize: '1.5rem' }}>
//         Christ Embassy is not just a local assembly; it’s a vision. 
//         The Lord has called us to fulfill a very definite purpose,
//          which is to take His divine presence to the peoples and nations of the world,
//           and to demonstrate the character of His Spirit everywhere. When you worship with us,
//            you learn more than just the letters of the Word; 
//            you’re imparted with and impacted by the Spirit of the Word. 
//            As we share God’s Word, it takes root in you, 
//            and you become exactly what the Lord wants you to be.
//          The Holy Spirit gets a hold of your life,
//           and His vision becomes real to you and in your life.

//         </p>
//       </div>

//       {/* Section 3: 1000-word Paragraph with Expand Button */}
//       <div style={{ padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center' }}>
//         <img src={chuch} alt="Section 3" style={{ width: '50%', height: '300px', marginRight: '20px' }} />
//         <div style={{ flex: 1 }}>
//           <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 600, marginBottom: 40}}>Testimony</h1>
//           <p>{showFullText3 ? textSection3 : `${textSection3.slice(0, 100)}...`}</p>
//           <button onClick={() => setShowFullText3(!showFullText3)} style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none' }}>
//             {showFullText3 ? 'Show Less' : 'Show More'}
//           </button>
//         </div>
//       </div>

//       {/* Section 4: 1000-word Paragraph with Expand Button */}
//       <div style={{ padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center' }}>
//         <img src={church} alt="Section 4" style={{ width: '50%', height: '300px', marginRight: '20px' }} />
//         <div style={{ flex: 1 }}>
//           <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 600, marginBottom: 40 }}>
//             Testimony
//             </h1>
//           <p>{showFullText4 ? textSection4 : `${textSection4.slice(0, 100)}...`}</p>
//           <button onClick={() => setShowFullText4(!showFullText4)} style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none' }}>
//             {showFullText4 ? 'Show Less' : 'Show More'}
//           </button>
//         </div>
//       </div>

//       {/* Section 5: Schedule with Buttons */}
//       <div style={{
//         backgroundImage: `url(${transparentImage})`,
//         backgroundSize: 'cover',
//         padding: '50px',
//         textAlign: 'center',
//         width: '100%',
//         height: '100vh'
//       }}>
//         <h1 style={{ color: 'white', fontSize: '2rem' }}>Our Schedule</h1>

//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px', padding: 40}}>
//           {Object.keys(schedule).map((day) => (
//             <button key={day} onClick={() => setCurrentDay(day)} style={{
//               padding: '10px 20px',
//               backgroundColor: 'orange',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//             }}>{day}</button>
//           ))}
//         </div>
//         <div style={{ color: 'white', fontSize: '1.2rem' }}>
//           {currentDay && <p>{schedule[currentDay]}</p>}
//         </div>
//       </div>

//       {/* Section 6: Carousel */}
//       <div style={{ padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center' }}>
//         <img src={carouselImages[carouselIndex].src} alt="Carousel" style={{ width: '60%', height: '300px', marginRight: '20px' }} />
//         <div style={{ flex: 1 }}>
//           <h2>{carouselImages[carouselIndex].text}</h2>
//         </div>
//       </div>
//       {/* Automatically change carousel every 5 seconds */}
//       {useEffect(() => {
//         const interval = setInterval(handleNextSlide, 5000);
//         return () => clearInterval(interval);
//       }, [carouselIndex])}
//     </div>

//       {/* Footer */}
//       <footer style={{
//         display: 'flex',
//         justifyContent: 'space-around',
//         padding: '20px',
//         backgroundColor: 'black',
//         color: 'white',
//       }}>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
//           <a href="#live" style={{ color: 'white', textDecoration: 'none' }}>Live Video</a>
//           <a href="#give" style={{ color: 'white', textDecoration: 'none' }}>Give</a>
//           <a href="#partnership" style={{ color: 'white', textDecoration: 'none' }}>Partnership</a>
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a>
//           <a href="#testimonies" style={{ color: 'white', textDecoration: 'none' }}>Testimonies</a>
//           <a href="#services" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
//           <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
//         </div>
//       </footer>

//     </div>
//   );
// };

// export default LoginScreen;



// import React, { useState, useEffect } from 'react';
// import { useMediaQuery } from 'react-responsive';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import logo from './logo.jpg';
// import pastorVideo from '../../assets/pastor.mp4';
// import transparentImage from '../../assets/church.jpg';
// import church from '../../assets/church.jpg';
// import pastorjoe from '../../assets/pjoe.jpg';
// import carousel3 from '../../assets/pjoe1.jpg';
// import chuch from '../../assets/chuch.jpg';

// // Google Maps iframe
// const GoogleMap = () => (
//   <div style={{ width: '100%', height: '400px', marginTop: '50px' }}>
//     <iframe
//       title="Church Location"
//       width="100%"
//       height="100%"
//       frameBorder="0"
//       style={{ border: 0 }}
//       src="https://www.google.com/maps/embed/v1/place?q=Christ+Embassy&key=YOUR_API_KEY"
//       allowFullScreen
//     />
//   </div>
// );

// const LoginScreen = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showFullText3, setShowFullText3] = useState(false);
//   const [showFullText4, setShowFullText4] = useState(false);
//   const [currentDay, setCurrentDay] = useState(''); 
//   const [carouselIndex, setCarouselIndex] = useState(0);
//   const [showMinistries, setShowMinistries] = useState(false); 
//   const [activeSection, setActiveSection] = useState(null);
//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

//   const carouselImages = [
//     { src: church, text: 'Teens Church' },
//     { src: pastorjoe, text: 'Foundation School' },
//     { src: carousel3, text: 'Children Church' }
//   ];

//   const handleNextSlide = () => {
//     setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
//   };

//   const schedule = {
//     Monday: "Bible Study at 6 PM",
//     Tuesday: "Prayer Meeting at 7 PM",
//     Wednesday: "Fellowship at 5 PM",
//     Thursday: "Worship Service at 6 PM",
//     Friday: "Youth Service at 7 PM",
//     Saturday: "Evangelism at 9 AM",
//     Sunday: "Main Service at 10 AM"
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll('.section');
//       sections.forEach((section, index) => {
//         const rect = section.getBoundingClientRect();
//         if (rect.top < window.innerHeight) {
//           setActiveSection(index + 1); 
//         }
//       });
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       {/* Background video */}
//       <div style={{
//         position: 'relative',
//         height: '100vh',
//         width: '100vw',
//         overflow: 'hidden',
//       }}>
//         <video style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100vh',
//           objectFit: 'cover',
//         }} autoPlay muted loop>
//           <source src={pastorVideo} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Overlay Header and Content */}
//         <div style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//         }}>
//           <header style={{
//             display: 'flex',
//             backgroundColor: 'rgba(0, 0, 0, 0.4)',
//             justifyContent: 'space-between',
//             width: '100%',
//             alignItems: 'center',
//             padding: 20,
//             zIndex: 1,
//             borderBottom: '0.2px solid white'
//           }}>
//             <img src={logo} alt="Church Logo" style={{ width: '60px', height: 'auto' }} />
//             {isMobile ? (
//               <div style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
//                 <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
//               </div>
//             ) : (
//               <nav style={{ display: 'flex', gap: '70px', color: 'white', marginRight: '5%', fontWeight: 600 }}>
//                 <a href="#live" style={{ textDecoration: 'none', color: 'white' }}>LIVE</a>
//                 <div 
//                   onMouseEnter={() => setShowMinistries(true)} 
//                   onMouseLeave={() => setShowMinistries(false)} 
//                   style={{ position: 'relative', cursor: 'pointer' }}
//                 >
//                   <a href="#ministries" style={{ textDecoration: 'none', color: 'white' }}>MINISTRIES</a>
//                   {showMinistries && (
//                     <div style={{ position: 'absolute', top: '30px', left: 0, backgroundColor: 'white', color: 'black', padding: '10px', zIndex: 1 }}>
//                       <a href="#foundation" style={{ display: 'block', marginBottom: '10px' }}>Foundation School</a>
//                       <a href="#youth" style={{ display: 'block', marginBottom: '10px' }}>Youth Ministry</a>
//                       <a href="#children" style={{ display: 'block' }}>Children Ministry</a>
//                     </div>
//                   )}
//                 </div>
//                 <a href="#testimonies" style={{ textDecoration: 'none', color: 'white' }}>TESTIMONIES</a>
//                 <a href="#programs" style={{ textDecoration: 'none', color: 'white' }}>PROGRAMS</a>
//                 <a href="#give" style={{ textDecoration: 'none', color: 'white'}}>GIVE</a>
//               </nav>
//             )}
//           </header>

//           {/* Overlay Text and Action Button */}
//           <div style={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
//             <h1 style={{ fontSize: '16px', marginBottom: '20px' }}>Join Live Service</h1>
//             <button style={{
//               padding: '15px 30px',
//               backgroundColor: 'orange',
//               color: 'white',
//               fontSize: '1.2rem',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               marginBottom: '70px'
//             }}>Watch Live Now</button>
//           </div>

//           {/* Dropdown Menu for Mobile */}
//           {menuOpen && isMobile && (
//             <nav style={{
//               position: 'absolute',
//               top: '60px',
//               width: '100%',
//               backgroundColor: 'rgba(0, 0, 0, 0.8)',
//               display: 'flex',
//               flexDirection: 'column',
//               padding: '20px',
//             }}>
//               <a href="#live" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={() => setMenuOpen(false)}>Live</a>
//               <a href="#ministries" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={() => setMenuOpen(false)}>Ministries</a>
//               <a href="#testimonies" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={() => setMenuOpen(false)}>Testimonies</a>
//               <a href="#programs" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={() => setMenuOpen(false)}>Programs</a>
//               <a href="#give" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={() => setMenuOpen(false)}>Give</a>
//             </nav>
//           )}
//         </div>
//       </div>

//       {/* Individual Sections */}
//       <div style={{ width: '100%', height: '50%' }}>
//         {/* Section 1: About */}
//         <div className={`section ${activeSection === 1 ? 'active' : ''}`} style={{
//           padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'center', alignItems: 'center', transition: 'all 0.6s ease-in-out', transform: activeSection === 1 ? 'translateY(0)' : 'translateY(20px)',
//           opacity: activeSection === 1 ? 1 : 0
//         }}>
//           <img src={pastorjoe} alt="Pastor Joe" style={{ width: isMobile ? '100%' : '600px', height: '500px', marginRight: '20px' }} />
//           <div style={{ flex: 1 }}>
//             <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 30 }}>Today with Pastor Joe</h2>
//             <p>Christ Embassy is not just a local assembly; it’s a vision. 
//               The Lord has called us to fulfill a very definite purpose, 
//               which is to take His divine presence to the peoples and nations of the world,
//                and to demonstrate the character of His Spirit everywhere. 
//                When you worship with us, you learn more than just the letters of the Word;
//                 you’re imparted with and impacted by the Spirit of the Word. 
//                 As we share God’s Word, it takes root in you, and you become exactly what the Lord wants you to be. 
//               The Holy Spirit gets a hold of your life, and His vision becomes real to you and in your life.</p>
//             <div style={{ display: 'flex', gap: '10px' }}>
//               <button style={{ padding: '10px 20px', backgroundColor: 'grey', color: 'white', border: 'none' }}>Read More</button>
//               <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none' }}>Contact</button>
//             </div>
//           </div>
//         </div>

//         {/* Section 2: Our Vision */}
//         <div style={{
//           backgroundImage: `url(${transparentImage})`,
//           backgroundSize: 'cover',
//           height: '100vh',
//           width: '100%',
//           padding: '80px',
//           margin: 'auto',
//           opacity: activeSection === 2 ? 1 : 0,
//           transform: activeSection === 2 ? 'translateY(0)' : 'translateY(20px)',
//           transition: 'all 0.6s ease-in-out',
//         }}>
//           <h1 style={{ color: 'white', fontSize: '40px', padding: 20, textAlign: 'center'}}>Our Vision</h1>
//           <p style={{ color: 'white', fontSize: '1.5rem' }}>
//           Christ Embassy is not just a local assembly; it’s a vision. 
//          The Lord has called us to fulfill a very definite purpose,
//          which is to take His divine presence to the peoples and nations of the world,
//           and to demonstrate the character of His Spirit everywhere.
//           </p>
//         </div>

//         {/* Section 3 */}
//         <div className={`section ${activeSection === 3 ? 'active' : ''}`} style={{
//           padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'center', alignItems: 'center', transition: 'all 0.6s ease-in-out', transform: activeSection === 3 ? 'translateY(0)' : 'translateY(20px)',
//           opacity: activeSection === 3 ? 1 : 0
//         }}>
//           <img src={chuch} alt="Section 3" style={{ width: isMobile ? '100%' : '50%', height: '300px', marginRight: '20px' }} />
//           <div style={{ flex: 1 }}>
//             <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 600, marginBottom: 40}}>Testimony</h1>
//             <p>{showFullText3 ? 'Full content of section 3...' : `Preview of section 3...`}</p>
//             <button onClick={() => setShowFullText3(!showFullText3)} style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none' }}>
//               {showFullText3 ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         </div>

//         {/* Section 4 */}
//         <div className={`section ${activeSection === 4 ? 'active' : ''}`} style={{
//           padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'center', alignItems: 'center', transition: 'all 0.6s ease-in-out', transform: activeSection === 4 ? 'translateY(0)' : 'translateY(20px)',
//           opacity: activeSection === 4 ? 1 : 0
//         }}>
//           <img src={church} alt="Section 4" style={{ width: isMobile ? '100%' : '50%', height: '300px', marginRight: '20px' }} />
//           <div style={{ flex: 1 }}>
//             <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 600, marginBottom: 40 }}>Testimony</h1>
//             <p>{showFullText4 ? 'Full content of section 4...' : `Preview of section 4...`}</p>
//             <button onClick={() => setShowFullText4(!showFullText4)} style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none' }}>
//               {showFullText4 ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         </div>

//         {/* Section 5: Schedule with Boxes and Buttons */}
//         <div style={{
//           backgroundImage: `url(${transparentImage})`,
//           backgroundSize: 'cover',
//           padding: '50px',
//           textAlign: 'center',
//           width: '100%',
//           height: '100vh'
//         }}>
//           <h1 style={{ color: 'white', fontSize: '2rem' }}>Our Schedule</h1>

//           <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px', padding: 40 }}>
//             {Object.keys(schedule).map((day) => (
//               <button key={day} onClick={() => setCurrentDay(day)} style={{
//                 padding: '10px 20px',
//                 backgroundColor: 'orange',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '5px',
//               }}>{day}</button>
//             ))}
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', height: '40%' }}>
//             {Object.keys(schedule).map((day, index) => (
//               <div key={index} style={{
//                 width: '100px',
//                 height: '100px',
//                 backgroundColor: 'rgba(255,255,255,0.2)',
//                 color: 'white',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 fontSize: '1.5rem',
//                 borderRadius: '5px'
//               }}>
//                 {currentDay === day ? schedule[day] : '--:--'}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Section 6: Carousel */}
//         <div className={`section ${activeSection === 6 ? 'active' : ''}`} style={{
//           padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'center', alignItems: 'center', transition: 'all 0.6s ease-in-out', transform: activeSection === 6 ? 'translateY(0)' : 'translateY(20px)',
//           opacity: activeSection === 6 ? 1 : 0
//         }}>
//           <img src={carouselImages[carouselIndex].src} alt="Carousel" style={{ width: isMobile ? '100%' : '60%', height: '300px', marginRight: '20px' }} />
//           <div style={{ flex: 1 }}>
//             <h2>{carouselImages[carouselIndex].text}</h2>
//           </div>
//         </div>

//         {/* Google Map Section */}
//         <GoogleMap />
//       </div>

//       {/* Footer */}
//       <footer style={{
//         display: 'flex',
//         justifyContent: 'space-around',
//         padding: '20px',
//         backgroundColor: 'black',
//         color: 'white',
//       }}>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
//           <a href="#live" style={{ color: 'white', textDecoration: 'none' }}>Live Video</a>
//           <a href="#give" style={{ color: 'white', textDecoration: 'none' }}>Give</a>
//           <a href="#partnership" style={{ color: 'white', textDecoration: 'none' }}>Partnership</a>
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a>
//           <a href="#testimonies" style={{ color: 'white', textDecoration: 'none' }}>Testimonies</a>
//           <a href="#services" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
//           <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LoginScreen;




import React, { useState, useEffect } from 'react'; 
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.jpg';
import pastorVideo from "../../assets/pastor.mp4";
import transparentImage from '../../assets/christembassy.jpg';
import church from '../../assets/church.jpg';
import pastorjoe from '../../assets/pjoe.jpg';
import carousel3 from '../../assets/pjoe1.jpg';
import chuch from '../../assets/chuch.jpg';

const LoginScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [showFullText3, setShowFullText3] = useState(false);
  const [showFullTextJoe, setShowFullTextJoe] = useState(false); // Read more toggle for Pastor Joe section
  const [showFullText4, setShowFullText4] = useState(false);
  const [currentDay, setCurrentDay] = useState(''); 
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showMinistries, setShowMinistries] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const carouselImages = [
    { src: church, text: 'Teens Church' },
    { src: pastorjoe, text: 'Foundation School' },
    { src: carousel3, text: 'Children Church' }
  ];

  const handleNextSlide = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const schedule = {
    Monday: "--:--",
    Tuesday: "--:--",
    Wednesday: "6:PM",
    Thursday: "--:--",
    Friday: "6:PM",
    Saturday: "--:--",
    Sunday: "10:30 AM"
  };

  const textSectionJoe = `The man of God Highly Esteemed Pastor Joe Agbaje is the highly revered Pastor of Christ Embassy 
  Ibadan Zone 1, an ardent follower of the President of the Loveworld Nation Rev. Chris Oyakhilome DSc. DSc. DD. 
  Over the years, he has demonstrated the power of the Word in teaching, healing the sick, and setting captives free. 
  Every meeting with him is epoch-making!`;

  const textSection3 = "Christ Embassy is not just a local assembly; it’s a vision...";
  const textSection4 = "Christ Embassy is not just a local assembly; it’s a vision...";

  // Helper to trigger section animation when scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setActiveSection(index + 1); // Trigger the animation
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNextSlide, 5000); // Carousel changes every 5 seconds
    return () => clearInterval(interval);
  }, [carouselIndex]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Background video */}
      <div style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}>
        <video style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
        }} autoPlay muted loop>
          <source src={pastorVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Header and Content */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <header style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            padding: 20,
            zIndex: 1,
            borderBottom: '0.2px solid white'
          }}>
            <img src={logo} alt="Church Logo" style={{ width: '60px', height: 'auto' }} />
            {isMobile ? (
              <div style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} onClick={toggleMenu}>
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
              </div>
            ) : (
              <nav style={{ display: 'flex', gap: '70px', color: 'white', marginRight: '5%', fontWeight: 600 }}>
                <a href="#live" style={{ textDecoration: 'none', color: 'white' }}>LIVE</a>
                <div 
                  onMouseEnter={() => setShowMinistries(true)} 
                  onMouseLeave={() => setShowMinistries(false)} 
                  style={{ position: 'relative', cursor: 'pointer' }}
                >
                  <a href="#ministries" style={{ textDecoration: 'none', color: 'white' }}>MINISTRIES</a>
                  {showMinistries && (
                    <div style={{ position: 'absolute',  width: '180px', top: '30px', left: 0, backgroundColor: 'rgba(0, 0, 0, 0.05)', color: 'white', padding: '10px', zIndex: 2 }}>
                      <a href="#foundation" style={{ display: 'block', marginBottom: '10px' }}>Foundation School</a>
                      <a href="#youth" style={{ display: 'block', marginBottom: '10px' }}>Youth Ministry</a>
                      <a href="#children" style={{ display: 'block' }}>Children Ministry</a>
                    </div>
                  )}
                </div>
                <a href="#testimonies" style={{ textDecoration: 'none', color: 'white' }}>TESTIMONIES</a>
                <a href="#programs" style={{ textDecoration: 'none', color: 'white' }}>PROGRAMS</a>
                <a href="#give" style={{ textDecoration: 'none', color: 'white'}}>GIVE</a>
              </nav>
            )}
          </header>

          {/* Overlay Text and Action Button */}
          <div style={{ textAlign: 'center', color: 'white', zIndex: 1 }}>
            <h1 style={{ fontSize: '30px', marginBottom: '20px' }}>Join Live Service</h1>
            <button style={{
              padding: '15px 30px',
              backgroundColor: 'orange',
              color: 'white',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '70px'
            }}>Watch Live Now</button>
          </div>

          {/* Dropdown Menu for Mobile */}
          {menuOpen && isMobile && (
            <nav style={{
              position: 'absolute',
              top: '100px',
              left: 0,
              width: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px',
              fontSize: '16px'
            }}>
              <a href="#live" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Live</a>
              <a href="#ministries" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Ministries</a>
              <a href="#testimonies" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Testimonies</a>
              <a href="#programs" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Programs</a>
              <a href="#give" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Give</a>
            </nav>
          )}
        </div>
      </div>

      {/* Individual Sections */}
      <div style={{ width: '100%', height: '50%' }}>
        {/* Section 1: About */}
        <div className={`section ${activeSection === 1 ? 'active' : ''}`} style={{
          padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center', alignItems: 'center', transition: 'transform 0.6s ease-in-out', transform: activeSection === 1 ? 'translateY(0)' : 'translateY(30px)'
        }}>
          <img src={pastorjoe} alt="Pastor Joe" style={{ width: isMobile ? '100%' : '50%', height: '500px', marginRight: '20px' }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 30 }}>Today with Pastor Joe</h2>
            <p>{showFullTextJoe ? textSectionJoe : `${textSectionJoe.slice(0, 100)}...`}</p>
            <button onClick={() => setShowFullTextJoe(!showFullTextJoe)} style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none' }}>
              {showFullTextJoe ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>

        {/* Section 2: Our Vision */}
        <div style={{
          backgroundImage: `url(${transparentImage})`,
          backgroundSize: 'cover',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          height: '100vh',
          width: '100%',
          padding: '20px 50px',
          margin: 'auto',
          transition: 'transform 0.6s ease-in-out', transform: activeSection === 2 ? 'translateY(0)' : 'translateY(30px)'
        }}>
          <h1 style={{ color: 'white', fontSize: '40px', padding: 10, textAlign: 'center'}}>Our Vision</h1>
          <p style={{ color: 'white', fontSize: '20px', overflow: 'hidden' }}>
          Christ Embassy is not just a local assembly; it’s a vision. 
     The Lord has called us to fulfill a very definite purpose,
      which is to take His divine presence to the peoples and nations of the world,
       and to demonstrate the character of His Spirit everywhere. When you worship with us,
       you learn more than just the letters of the Word; 
      you’re imparted with and impacted by the Spirit of the Word. 
      As we share God’s Word, it takes root in you, 
       and you become exactly what the Lord wants you to be.
     The Holy Spirit gets a hold of your life,
      and His vision becomes real to you and in your life.
          </p>
        </div>

        {/* Section 3 */}
        <div className={`section ${activeSection === 3 ? 'active' : ''}`} style={{
          padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center', alignItems: 'center', transition: 'transform 0.6s ease-in-out', transform: activeSection === 3 ? 'translateY(0)' : 'translateY(30px)'
        }}>
          <img src={chuch} alt="Section 3" style={{ width: isMobile ? '100%' : '50%', height: '300px', marginRight: '20px' }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 600, marginBottom: 40}}>Testimony</h1>
            <p>{showFullText3 ? textSection3 : `${textSection3.slice(0, 100)}...`}</p>
            <button onClick={() => setShowFullText3(!showFullText3)} style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none' }}>
              {showFullText3 ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>

        {/* Section 4 */}
        <div className={`section ${activeSection === 4 ? 'active' : ''}`} style={{
          padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center', alignItems: 'center', transition: 'transform 0.6s ease-in-out', transform: activeSection === 4 ? 'translateY(0)' : 'translateY(30px)'
        }}>
          <img src={church} alt="Section 4" style={{ width: isMobile ? '100%' : '50%', height: '300px', marginRight: '20px' }} />
          <div style={{ flex: 1 }}>
            <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 600, marginBottom: 40 }}>Testimony</h1>
            <p>{showFullText4 ? textSection4 : `${textSection4.slice(0, 100)}...`}</p>
            <button onClick={() => setShowFullText4(!showFullText4)} style={{ padding: '10px 20px', backgroundColor: 'orange', color: 'white', border: 'none' }}>
              {showFullText4 ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>

        {/* Section 5: Schedule with Buttons */}
        <div style={{
          backgroundImage: `url(${transparentImage})`,
          backgroundSize: 'cover',
          padding: '50px',
          textAlign: 'center',
          width: '100%',
          height: '100vh',
          transition: 'transform 0.6s ease-in-out', transform: activeSection === 5 ? 'translateY(0)' : 'translateY(30px)'
        }}>
          <h1 style={{ color: 'white', fontSize: '2rem' }}>Our Schedule</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '20px', padding: 40 }}>
            {Object.keys(schedule).map((day) => (
              <button key={day} onClick={() => setCurrentDay(day)} style={{
                padding: '10px 20px',
                backgroundColor: 'orange',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}>{day}</button>
            ))}
          </div>
          
          {/* Schedule Response Boxes */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '20px' }}>
            {Object.keys(schedule).map((day, index) => (
              <div key={index} style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px'
              }}>
                {currentDay === day ? schedule[day] : '--:--'}
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Carousel */}
        <div className={`section ${activeSection === 6 ? 'active' : ''}`} style={{
          padding: '50px', display: 'flex', flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center', alignItems: 'center', transition: 'transform 0.6s ease-in-out', transform: activeSection === 6 ? 'translateY(0)' : 'translateY(30px)'
        }}>
          <img src={carouselImages[carouselIndex].src} alt="Carousel" style={{ width: isMobile ? '100%' : '60%', height: '300px', marginRight: '20px' }} />
          <div style={{ flex: 1 }}>
            <h2>{carouselImages[carouselIndex].text}</h2>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        backgroundColor: 'black',
        color: 'white',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
          <a href="#live" style={{ color: 'white', textDecoration: 'none' }}>Live Video</a>
          <a href="#give" style={{ color: 'white', textDecoration: 'none' }}>Give</a>
          <a href="#partnership" style={{ color: 'white', textDecoration: 'none' }}>Partnership</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a>
          <a href="#testimonies" style={{ color: 'white', textDecoration: 'none' }}>Testimonies</a>
          <a href="#services" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
          <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
        </div>
      </footer>
    </div>
  );
};

export default LoginScreen;
