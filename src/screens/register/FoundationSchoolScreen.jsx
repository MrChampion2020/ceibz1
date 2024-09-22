import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter} from 'react-icons/fa';
import logo from "./logo.png";
import kingschat from "../../assets/kingschat.png";
import bannerImage from "../../assets/church.jpg";
import galleryImage1 from "../../assets/bag11.jpg";
import galleryImage2 from "../../assets/cerf.png";
import galleryImage3 from "../../assets/certificate.jpg";
import galleryImage4 from "../../assets/post_ftm.jpg";
import galleryImage5 from "../../assets/bag11.jpg";
import { useNavigate } from "react-router-dom";

const FoundationSchoolScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedClass, setSelectedClass] = useState(""); // Declare selectedClass state
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [showMinistries, setShowMinistries] = useState(false);
  const [activeSection, setActiveSection] = useState(null);


  const galleryImages = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
    galleryImage5,
  ];

  // Define content for each class
  const classContent = {
    Class1: "The New Creation",
    Class2: "The Holy Spirit & You",
    Class3: "Foundational Doctrines of Christ",
    Class4: "Evangelism & The Cell Ministry",
    Class5: "Christian Character & prosperity",
    Class6: "The Local Assembly & Christ Embassy",
    Class7: "New Media Technology",
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const navigation = useNavigate();

  return (
    <div style={{ width: "100%", height: "100%", margin: 'auto', overflow: 'hidden' }}>
      {/* Header Section */}
      <header
        style={{
          display: "flex",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          padding: 20,
          zIndex: 1,
          height: '40%',
          borderBottom: "0.2px solid white",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
        }}

      >
        <img
          src={logo}
          alt="Church Logo"
          style={{ width: "60px", height: "auto" }}
          onClick={() => {
            navigation("/");
          }}
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
              onClick={() => navigation("/")}
            >
              HOME
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
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    padding: "5px",
                    zIndex: 2,
                  }}
                >
                  <a
                    href="#foundation"
                    style={{ display: "block", marginBottom: "10px" }}
                    onClick={() => navigation("/foundationSchool")}
                  >
                    Foundation School
                  </a>
                  <a
                    href="#youth"
                    style={{ display: "block", marginBottom: "10px" }}
                    onClick={() => navigation("/teens")}
                  >
                    Teens Ministry
                  </a>
                  <a
                    href="#children"
                    style={{ display: "block" }}
                    onClick={() => navigation("/children")}
                  >
                    Children Ministry
                  </a>
                </div>
              )}
            </div>
            <a
              href="#testimonies"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => {
                navigation("/Contact");
              }}>
              CONTACT
            </a>
            <a
              href="#programs"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => {
                navigation("/Programs");
              }}
            >
              PROGRAMS
            </a>
            <a href="#give" style={{ textDecoration: "none", color: "white" }}
            onClick={() => {
              navigation("/give");
            }}
            >
              GIVE
            </a>
          </nav>
        )}
        
      </header>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <nav
          style={{
            position: "absolute",
            left: 0,
            top: "100px",
            width: "60%",
            backgroundColor: "rgba(001, 005, 050, 0.9)",
            display: "flex",
            flexDirection: "column",
            padding: "30px",
            zIndex: 1

          }}
        >
          <a
            href=""
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 0",
            }}
            onClick={() => {
              navigation("/");
            }}
          >
            HOME
          </a>
          <a
            href=""
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 0",
            }}
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
                    href=""
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
                        href=""
                        style={{ display: "block", marginBottom: "10px" }}
                        onClick={() => {
                          navigation("/foundationSchool");
                        }}
                      >
                        Foundation School
                      </a>

                      <a
                        href=""
                        style={{ display: "block", marginBottom: "10px" }}
                        onClick={() => {
                          navigation("/teens");
                        }}
                      >
                        Teens Ministry
                      </a>
                      <a
                        href=""
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
            href=""
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 0",
            }}
            onClick={() => {
              navigation("/Contact");
            }}
          >
            CONTACT US
          </a>
          <a
            href=""
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 0",
            }}
            onClick={() => {
              navigation("/Programs");
            }}
          >
            PROGRAMS
          </a>
          <a
            href=""
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 0",
            }}
            onClick={() => {
              navigation("/give");
            }}
          >
            GIVE
          </a>
        </nav>
      )}

      {/* Gallery Section */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "98%",
          padding: "20px",
          margin: 'auto'
        }}
      >
        <button
          onClick={handlePreviousImage}
          style={{
            position: "absolute",
            left: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            padding: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div style={{ display: "flex", overflow: "hidden", width: "100%" }}>
          {isMobile ? (
            <div style={{ display: "block", width: "100%" }}>
              <img
                src={galleryImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                style={{
                  width: "90vw",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <img
                src={galleryImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                style={{
                  width: "50%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <img
                src={
                  galleryImages[(currentImageIndex + 1) % galleryImages.length]
                }
                alt={`Gallery ${
                  ((currentImageIndex + 1) % galleryImages.length) + 1
                }`}
                style={{
                  width: "50%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleNextImage}
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "none",
            padding: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      {/* Text and Class Selection Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          padding: "10px",
        }}
      >
        {/* Left Content Area (70% width) */}
        <div
          style={{
            flex: 0.7,
            padding: "20px",
            width: isMobile ? "96%" : "60%",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              fontWeight: "900",
              marginBottom: "30px",
            }}
          >
            What is Foundation School?
          </h2>
          <p>
            In foundation school, members are taught the basic doctrines of
            Christ. They are equipped for the work of the ministry. The bible
            also admonishes that we be not children tossed to and fro by every
            wind of doctrine…hence the need to equip the saints. Knowledge is
            vital, and it marks the difference between success and failure. To
            have a successful Christian life, you require the basic knowledge to
            equip you for this walk with God. And that’s why we invite people to
            join the foundation school, because in the foundation school, you’d
            be taught the basic doctrines of Christ that’ll equip you for the
            higher life in God.
          </p>
          {/* Class Selection */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            {[
              "Class1",
              "Class2",
              "Class3",
              "Class4",
              "Class5",
              "Class6",
              "Class7",
            ].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: selectedClass === cls ? "blue" : "orange",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Display class content */}
          {selectedClass && (
            <div style={{ marginTop: "30px", textAlign: "left" }}>
              {/* <h3>{selectedClass}</h3> */}
              <p>{classContent[selectedClass]}</p>
            </div>
          )}
        </div>

        {/* Right Content Area (30% width) */}
        <div
          style={{
            flex: 0.3,
            padding: "20px",
            textAlign: "center",
            backgroundColor: "blue",
            color: "white",
            height: "40vh",
            width: isMobile ? "96%" : "25%",
            marginTop: isMobile ? "20px" : "0",
          }}
        >
          <h1
            style={{
              padding: "20px 10px",
              fontSize: "20px",
              fontWeight: 600,
              color: "white",
            }}
          >
            We are Here to Help!
          </h1>
          <p
            style={{
              padding: "20px 10px",
              fontSize: "14px",
              color: "white",
            }}
          >
            Join our Live stream services weekly and get engaged!
          </p>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              borderRadius: "2px",
              cursor: "pointer",
              border: '1px solid white'
            }}
            onClick={() => {
              navigation("/LiveStream");
            }}
          >
            Watch Now
          </button>
        </div>
      </div>

      
      
      {/* Section 6: Useful Links */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backgroundSize: "cover",
          padding: "30px 15px",
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
            style={{ 
              width: '100%', 
              textDecoration: "none", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',  // Ensures the icon and text are aligned vertically
              gap: '10px',           // Adds spacing between the icon and the text
              color: 'inherit',      // Ensures link color stays consistent
              fontSize: '16px',      // Adjust the font size to ensure consistent icon size
              lineHeight: '1.5',
             }}
            onClick={() => {
              navigation("/");
            }}
          >
           <FaMapMarkerAlt /> CVHQ+R4, Ibadan 200285, Oyo
          </a>
          <a
            href=""
            style={{ 
              width: '100%', 
              textDecoration: "none", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',  // Ensures the icon and text are aligned vertically
              gap: '10px',           // Adds spacing between the icon and the text
              color: 'inherit',      // Ensures link color stays consistent
              fontSize: '16px',      // Adjust the font size to ensure consistent icon size
              lineHeight: '1.5',
            }}
            onClick={() => {
              navigation("/");
            }}
          >
           <FaPhoneAlt />  +234 0000 0000 00000
          </a>
          <a
            href=""
            style={{ 
              width: '100%', 
              textDecoration: "none", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',  // Ensures the icon and text are aligned vertically
              gap: '10px',           // Adds spacing between the icon and the text
              color: 'inherit',      // Ensures link color stays consistent
              fontSize: '16px',      // Adjust the font size to ensure consistent icon size
              lineHeight: '1.5',
             }}
            onClick={() => {
              navigation("/Contact");
            }}
          >
           <FaEnvelope /> info@ceibz1.com
          </a>
          <a
            href=""
            style={{ 
              width: '100%', 
              textDecoration: "none", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',  // Ensures the icon and text are aligned vertically
              gap: '10px',           // Adds spacing between the icon and the text
              color: 'inherit',      // Ensures link color stays consistent
              fontSize: '16px',      // Adjust the font size to ensure consistent icon size
              lineHeight: '1.5',
             }}
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
         
          <div style={{ display: "flex", padding: '5px', flexDirection: "row", gap: "20px", margin: isMobile ? "auto" : "5%"}}>
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
        <div style={{ display: "flex", flexDirection: "row", padding: '5px', gap: "10px", margin: isMobile ? "auto" : "auto"}}>
          {/* <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a> */}
         
            <p>&copy; {new Date().getFullYear()} 
              
            <a
            href=""
            style={{ textDecoration: "none", padding: '6px', fontSize: '14px'}}
            onClick={() => {
              navigation("/");
            }}
          >
            Christ Embassy Ibadan Zone 1
          </a>
    </p>

        </div>
      </footer>
    </div>
  );
};

export default FoundationSchoolScreen;
