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

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter} from 'react-icons/fa';
import logo from "./logo.png";
import pastorVideo from "../../assets/pastor.mp4";
import transparentImage from "../../assets/christembassy.jpg";
import church from "../../assets/church.jpg";
import kingschat from "../../assets/kingschat.png";
import chuch from "../../assets/church.jpg";
import pastorjoe from "../../assets/pjoe.jpg";
import teens from "../../assets/lwfs.jpg";
import children from "../../assets/child.jpg";
import lwfs from "../../assets/teens.jpg";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [showFullText3, setShowFullText3] = useState(false);
  const [showFullTextJoe, setShowFullTextJoe] = useState(false); // Read more toggle for Pastor Joe section
  const [showFullText4, setShowFullText4] = useState(false);
  const [currentDay, setCurrentDay] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showMinistries, setShowMinistries] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigation = useNavigate();

  const carouselImages = [
    { src: lwfs, text: "The Loveworld Teens Church " },
    { src: teens, text: "Loveworld Foundation School" },
    { src: children, text: "Loveworld Children Church" },
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
    Sunday: "10:30 AM",
  };

  const textSectionJoe = `The man of God Highly Esteemed Pastor Joe Agbaje is the highly revered Zonal Pastor of Christ Embassy 
  Ibadan Zone 1, an ardent follower of the President of the Loveworld Nation Rev. Chris Oyakhilome DSc. DSc. DD. 
  Over the years, he has demonstrated the power of the Word in teaching, healing the sick, and setting the captives free. 
  Every meeting with him is epoch-making! `;

  const textSection3 =
    "Christ Embassy is not just a local assembly; I witnessed this in mz life ever since I joined the ministry";
  const textSection4 =
    "Christ Embassy is not just a local assembly; it’s a vision come true for me and mz entire family! On a daily basis we experience the love of God!";

  // Helper to trigger section animation when scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setActiveSection(index + 1); // Trigger the animation
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNextSlide, 5000); // Carousel changes every 5 seconds
    return () => clearInterval(interval);
  }, [carouselIndex]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Background video */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <video
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
          autoPlay
          muted
          loop
        >
          <source src={pastorVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Header and Content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <header
            style={{
              display: "flex",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
              padding: 20,
              zIndex: 1,
              borderBottom: "0.2px solid white",
            }}
          >
            <img
              src={logo}
              alt="Church Logo"
              style={{ width: "60px", height: "auto" }}
              onClick={() => navigation("/")}
            />
            {isMobile ? (
              <div
                style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
              </div>
            ) : (
              <nav
                style={{
                  display: "flex",
                  gap: "70px",
                  color: "white",
                  marginRight: "5%",
                  fontWeight: 600,
                }}
              >
                <a
                  href="#live"
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={() => {
                    navigation("/LiveStream");
                  }}
                >
                  LIVE
                </a>
                <div
                  onMouseEnter={() => setShowMinistries(true)}
                  onMouseLeave={() => setShowMinistries(false)}
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <a
                    href="#ministries"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    MINISTRIES
                  </a>
                  {showMinistries && (
                    <div
                      style={{
                        position: "absolute",
                        width: "180px",
                        top: "20px",
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.005)",
                        color: "white",
                        padding: "5px",
                        zIndex: 2,
                      }}
                    >
                      <a
                        href="#foundation"
                        style={{ display: "block", marginBottom: "10px" }}
                        onClick={() => {
                          navigation("/foundationSchool");
                        }}
                      >
                        Foundation School
                      </a>

                      <a
                        href="#youth"
                        style={{ display: "block", marginBottom: "10px" }}
                        onClick={() => {
                          navigation("/teens");
                        }}
                      >
                        Teens Ministry
                      </a>
                      <a
                        href="#children"
                        style={{ display: "block" }}
                        onClick={() => {
                          navigation("/children");
                        }}
                      >
                        Children Ministry
                      </a>
                    </div>
                  )}
                </div>
                <a
                  href="#testimonies"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  TESTIMONIES
                </a>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  PROGRAMS
                </a>
                <a href="#" style={{ textDecoration: "none", color: "white" }}>
                  GIVE
                </a>
              </nav>
            )}
          </header>

          {/* Overlay Text and Action Button */}
          <div style={{ textAlign: "center", color: "white", zIndex: 1 }}>
            <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
              Join Live Service
            </h1>
            <button
              style={{
                padding: "15px 30px",
                backgroundColor: "orange",
                color: "white",
                fontSize: "1.2rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "70px",
              }}
              onClick={() => {
                navigation("/LiveStream");
              }}
            >
              Watch Live Now
            </button>
          </div>

          {/* Dropdown Menu for Mobile */}
          {menuOpen && isMobile && (
            <nav
              style={{
                position: "absolute",
                top: "100px",
                left: 0,
                width: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                flexDirection: "column",
                padding: "40px",
                fontSize: "16px",
              }}
            >
              <a
                href="#live"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10px 0",
                }}
                onClick={toggleMenu}
              >
                Live
              </a>
              {/* <a href="#ministries" style={{ textDecoration: 'none', color: 'white', padding: '10px 0' }} onClick={toggleMenu}>Ministries</a>
               */}

              <div
                onMouseEnter={() => setShowMinistries(true)}
                onMouseLeave={() => setShowMinistries(false)}
                style={{ position: "relative", cursor: "pointer" }}
              >
                <a
                  href="#ministries"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  MINISTRIES
                </a>
                {showMinistries && (
                  <div
                    style={{
                      position: "absolute",
                      width: "180px",
                      top: "20px",
                      left: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      color: "white",
                      padding: "5px",
                      zIndex: 2,
                    }}
                  >
                    <a
                      href="#foundation"
                      style={{ display: "block", marginBottom: "10px" }}
                      onClick={() => {
                        navigation("/foundationSchool");
                      }}
                    >
                      Foundation School
                    </a>

                    <a
                      href="#youth"
                      style={{ display: "block", marginBottom: "10px" }}
                      onClick={() => {
                        navigation("/teens");
                      }}
                    >
                      Teens Ministry
                    </a>
                    <a href="#children" style={{ display: "block" }}>
                      Children Ministry
                    </a>
                  </div>
                )}
              </div>
              <a
                href="#testimonies"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10px 0",
                }}
                onClick={toggleMenu}
              >
                Testimonies
              </a>
              <a
                href="#programs"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10px 0",
                }}
                onClick={toggleMenu}
              >
                Programs
              </a>
              <a
                href="#give"
                style={{
                  textDecoration: "none",
                  color: "white",
                  padding: "10px 0",
                }}
                onClick={toggleMenu}
              >
                Give
              </a>
            </nav>
          )}
        </div>
      </div>

      {/* Individual Sections */}
      <div
        id="about"
        style={{ width: "100%", height: "50%", marginBottom: "50px" }}
      >
        {/* Section 1: About */}
        <div
          className={`section ${activeSection === 1 ? "active" : ""}`}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.6s ease-in-out",
            transform:
              activeSection === 1 ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <img
            src={pastorjoe}
            alt="Pastor Joe Agbaje"
            style={{
              width: isMobile ? "100%" : "50%",
              height: "350px",
              marginRight: "5px",
            }}
          />
          <div style={{ flex: 1, padding: "20px" }}>
            <h2 style={{ fontSize: 30, fontWeight: 900, marginTop: 0 }}>
              Today with Pastor Joe
            </h2>
            <p>
              {showFullTextJoe
                ? textSectionJoe
                : `${textSectionJoe.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => setShowFullTextJoe(!showFullTextJoe)}
              style={{
                padding: "10px 20px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
              }}
            >
              {showFullTextJoe ? "Show Less" : "Read More"}
            </button>

            <button
              onClick={() => {
                navigation("/Contact");
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "darkgrey",
                color: "white",
                border: "none",
                marginLeft: "2%",
              }}
            >
              Write Pastor
            </button>
          </div>
        </div>

        {/* Section 2: Our Vision */}
        <div
          style={{
            position: "relative",
            backgroundImage: `url(${transparentImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // Ensures the background image stays static
            height: "70vh", // Takes full viewport height
            width: "100%",
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            padding: "10px",
          }}
        >
          {/* Scrollable Text Container */}
          <div
            style={{
              position: "relative",
              zIndex: 2, // Ensures the text stays above the background
              color: "white",
              width: "100%", // Text container takes 90% width
              height: "100%", // Text container takes 90% height
              overflowY: "scroll", // Enables scrolling inside the text container
              backgroundColor: "rgba(0, 0, 0, 0.2)", // Slight dark overlay for readability
              padding: "5px",
              borderRadius: "30px", // Adds some rounding to the container edges
              boxSizing: "border-box",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(1.5rem, 2vw, 3rem)", // Responsive font size
                fontWeight: 700,
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              Our Vision
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.5rem)", // Responsive font size
                lineHeight: 1.6, // Improves readability
                maxWidth: "100%",
                margin: "0 auto", // Center the text content
              }}
            >
              Christ Embassy is not just a local assembly; it’s a vision. The
              Lord has called us to fulfill a very definite purpose, which is to
              take His divine presence to the peoples and nations of the world,
              and to demonstrate the character of His Spirit everywhere.
            </p>

            <p
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                lineHeight: 1.6,
                maxWidth: "100%",
                margin: "20px auto 0 auto", // Center and add space above
              }}
            >
              When you worship with us, you learn more than just the letters of
              the Word; you’re imparted with and impacted by the Spirit of the
              Word. As we share God’s Word, it takes root in you, and you become
              exactly what the Lord wants you to be. The Holy Spirit gets a hold
              of your life, and His vision becomes real to you and in your life.
            </p>
          </div>
        </div>

        {/* Testimony 1 */}
        <div
          id="testimonies"
          className={`section ${activeSection === 3 ? "active" : ""}`}
          style={{
            marginTop: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.6s ease-in-out",
            transform:
              activeSection === 3 ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <img
            src={chuch}
            alt="Section 3"
            style={{
              width: isMobile ? "100%" : "50%",
              height: "300px",
              marginRight: "5px",
            }}
          />
          <div style={{ flex: 1 }}>
            <h1
              style={{
                textAlign: "center",
                fontSize: 40,
                fontWeight: 600,
                marginBottom: 40,
              }}
            >
              Testifier
            </h1>
            <p>
              {showFullText3
                ? textSection3
                : `${textSection3.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => setShowFullText3(!showFullText3)}
              style={{
                padding: "10px 20px",
                backgroundColor: "orange",
                color: "white",
                border: "none",
              }}
            >
              {showFullText3 ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>

        {/* testimony 2 */}
        <div
          className={`section ${activeSection === 4 ? "active" : ""}`}
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.6s ease-in-out",
            transform:
              activeSection === 4 ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <img
            src={church}
            alt="Section 4"
            style={{
              width: isMobile ? "100%" : "50%",
              height: "300px",
              marginRight: "5px",
            }}
          />
          <div style={{ flex: 1 }}>
            <h1
              style={{
                textAlign: "center",
                fontSize: 40,
                fontWeight: 600,
                marginBottom: 40,
              }}
            >
              Testifier
            </h1>
            <p>
              {showFullText4
                ? textSection4
                : `${textSection4.slice(0, 100)}...`}
            </p>
            <button
              onClick={() => setShowFullText4(!showFullText4)}
              style={{
                padding: "10px 20px",
                backgroundColor: "orange",
                color: "white",
                border: "none",
              }}
            >
              {showFullText4 ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>

        {/* Section 5: Schedule with Buttons */}
        <div
          id="services"
          style={{
            position: "relative",
            backgroundImage: `url(${transparentImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // Static background
            height: "80vh", // Full height of the section
            width: "100vw", // Full width of the viewport
            marginTop: "40px", // Adds a gap at the top
            padding: "10px", // Adds padding around the content
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Vertically center the content
            alignItems: "center", // Horizontally center the content
            overflow: "hidden", // Prevents overflow
            boxSizing: "border-box",
          }}
        >
          {/* Section Title */}
          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              marginBottom: "2rem",
            }}
          >
            Our Schedule
          </h1>

          {/* Buttons for Days */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "2rem", // Adjusted for better layout
              width: "90%", // Takes 90% of the available width
              boxSizing: "border-box",
            }}
          >
            {Object.keys(schedule).map((day) => (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "clamp(0.8rem, 2.5vw, 1rem)", // Responsive button text size
                  cursor: "pointer",
                }}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Response Boxes */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              width: "90%", // Ensures response boxes are within the section
              boxSizing: "border-box",
            }}
          >
            {Object.keys(schedule).map((day, index) => (
              <div
                key={index}
                style={{
                  width: "clamp(60px, 10vw, 100px)", // Responsive width
                  height: "clamp(30px, 5vw, 50px)", // Responsive height
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  fontSize: "clamp(0.8rem, 2vw, 1.2rem)", // Responsive text size
                }}
              >
                {currentDay === day ? schedule[day] : "--:--"}
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Carousel */}
        <div
          className={`section ${activeSection === 6 ? "active" : ""}`}
          style={{
            height: "80vh", // Set the height to 80% of the viewport
            marginBottom: "30px",
            padding: "10px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Column on mobile, row on larger screens
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.6s ease-in-out",
            transform:
              activeSection === 6 ? "translateY(0px)" : "translateY(30px)",
            width: "100vw", // Full width of the viewport
            boxSizing: "border-box", // Include padding in width/height calculations
          }}
        >
          {/* Image area */}
          <div
            style={{
              flex: isMobile ? "0 0 50%" : "0 0 50%", // 50% of the space for image on both mobile and desktop
              height: "100%", // Full height for the image container
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={carouselImages[carouselIndex].src}
              alt="Carousel"
              style={{
                width: "100%", // Ensure image takes the full width of its container
                height: "100%", // Ensure image takes the full height of its container
                objectFit: "cover", // Make sure the image covers the container while maintaining aspect ratio
              }}
            />
          </div>

          {/* Text area */}
          <div
            style={{
              flex: "1", // Allow the text area to take the remaining space
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%", // Full height for the text content
              padding: "10px",
              width: "100%", // Ensure it stays within 90% width for all screen sizes
              boxSizing: "border-box",
              overflowY: "auto", // Allows the text content to scroll if it overflows
            }}
          >
            {/* Heading */}
            <h2
              style={{
                fontSize: "24px", // Responsive heading size
                padding: '10px',
                width: "100%",
              }}
            >
              {carouselImages[carouselIndex].text}
            </h2>

            {/* Paragraph */}
            <p
              style={{
                fontSize: "14px", // Responsive paragraph size
                padding: '5px', // Improves readability
                width: "100%", // Ensure paragraph content stays within 100% of the container
                height: "100%",
              }}
            >
              This section provides insights into the vision of the Loveworld
              Foundation School, teens ministry and children church activities.
              Join us every week to experience spiritual growth, fellowship, and
              real worship.
            </p>
          </div>
        </div>
      </div>



      {/* Section 6: Useful Links */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backgroundSize: "cover",
          padding: "30px",
          width: "100%",
          height: "100%",
          color: "white",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          margin: "auto",
          gap: '20px',
          transition: "transform 0.6s ease-in-out",
          transform: activeSection === 6 ? "translateY(0)" : "translateY(5px)",
        }}
      >
        {/* Column for Useful Links */}
        <div
          style={{
            flex: "0 0 30%", // 20% width for the left column
            textAlign: "left",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: isMobile ? "100%" : "30%",
          }}
        >
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/");
            }}
          >
            <img
              src={logo}
              alt="Church Logo"
              style={{ width: "40px", height: "auto" }}
              onClick={() => navigation("/")}
            />
          </a>
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/");
            }}
          >
            Christ Embassy Ibadan Zone 1
          </a>
        </div>

        {/* Column for Useful Links */}
        <div
          style={{
            flex: "0 0 30%", // 20% width for the left column
            textAlign: "left",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: isMobile ? "100%" : "30%",
          }}
        >
          <h1 style={{ fontSize: "16px", fontWeight: 700 }}>
            <b
              style={{
                paddingBottom: 8,
                borderBottom: "0.5px solid transparent",
                background:
                  "linear-gradient(to right, grey 50%, transparent 50%)",
                backgroundPosition: "0 100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "90% 0.5px", // Adjusts the size of the line
              }}
            >
              Useful
            </b>
            <b> Links</b>
          </h1>

          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/LiveStream");
            }}
          >
            Partnership
          </a>


          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/Contact");
            }}
          >
            Testify
          </a>

          
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/");
            }}
          >
            Programs
          </a>
          <a href="https://rhapsodyofrealities.org/" style={{ textDecoration: "none" }}>
            Rhapsody
          </a>
          <a
            href="https://healingstreams.tv/"
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("");
            }}
          >
            Healing Streams
          </a>
        </div>

        {/* Column for Useful Links */}
        <div
          style={{
            flex: "0 0 30%", // 20% width for the left column
            textAlign: "left",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: isMobile ? "100%" : "30%",
          }}
        >
          <h1 style={{ fontSize: "16px", fontWeight: 700 }}>
            <b
              style={{
                paddingBottom: 8,
                borderBottom: "0.5px solid transparent",
                background:
                  "linear-gradient(to right, grey 50%, transparent 50%)",
                backgroundPosition: "0 100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "80% 0.5px", // Adjusts the size of the line
              }}
            >
              Contact
            </b>
            <b> Us</b>
          </h1>

          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/");
            }}
          >
           <FaMapMarkerAlt /> CVHQ+R4, Ibadan 200285, Oyo
          </a>
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/");
            }}
          >
           <FaPhoneAlt />  +234 0000 0000 00000
          </a>
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/Contact");
            }}
          >
           <FaEnvelope /> info@ceibz1.com
          </a>
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/");
            }}
          >
          <FaGlobe />  www.ceibz1.com
          </a>
          <a
            href=""
            style={{ textDecoration: "none" }}
            onClick={() => {
              navigation("/Contact");
            }}
          >
            Pastor's Desk
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "black",
          color: "white",
          height: "70%",
          width: '100%',
          gap: '20%'
        }}
      >
         
          <div style={{ display: "flex", flexDirection: "row", gap: "10px", margin: isMobile ? "auto" : "0%"}}>
        <a href="https://kingschat.com" style={{ textDecoration: "none" }}>
        <img
              src={kingschat}
              alt="Church Logo"
              style={{ width: "24px", height: "auto" }}
              onClick={() => navigation("/")}
            />
  </a>
  <a href="https://www.facebook.com/ceibz1" style={{ textDecoration: "none" }}>
    <FaFacebook size={24} /> 
  </a>
  <a href="https://www.youtube.com/@ChristEmbassyibz1" style={{ textDecoration: "none" }}>
    <FaYoutube size={24} /> 
  </a>
  <a href="https://instagram.com" style={{ textDecoration: "none" }}>
    <FaInstagram size={24} /> 
  </a>
  <a href="https://twitter.com" style={{ textDecoration: "none" }}>
    <FaTwitter size={24} /> 
  </a>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px", margin: isMobile ? "auto" : "0%"}}>
          {/* <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a> */}
         
            <p>&copy; {new Date().getFullYear()} 
              
            <a
            href=""
            style={{ textDecoration: "none", padding: '6px', fontSize: isMobile ? "14px" : "14px"}}
            onClick={() => {
              navigation("/");
            }}
          >
            Christ Embassy Ibadan Zone 1
          </a>
                |  All Rights Reserved. </p>

        </div>
      </footer>
    </div>
  );
};

export default MainScreen;
