import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter} from 'react-icons/fa';
import logo from "./logo.png";
import kingschat from "../../assets/kingschat.png";
import bannerImage from "../../assets/pjoe.jpg";
import { useNavigate } from "react-router-dom";

const ContactScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMinistries, setShowMinistries] = useState(false); // Added state for ministries dropdown
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigation = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file.name);
      }
    };
  
    const handleIconClick = () => {
      document.getElementById('fileInput').click();
    };
  

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        overflow: "hidden",
      }}
    >
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
          borderBottom: "0.2px solid white",
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
        }}
      >
        <img src={logo} alt="Logo" style={{ width: "60px", height: "auto" }} />
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
              href="#home"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => navigation("/")}
            >
              HOME
            </a>
            <a href="#about" style={{ textDecoration: "none", color: "white" }}
            onClick={() => {
              navigation("/LiveStream");
            }}>
              LIVE
            </a>
            <a
              href="#contact"
              style={{ textDecoration: "none", color: "white" }}
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
            zIndex: 1,
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

      {/* Contact Form Section */}
      <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px", textAlign: 'center', color: 'blue' }}
        >
          Contact Us
        </h2>
         <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          <input
            type="text"
            placeholder="Name"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="tel"
            placeholder="Phone"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Location"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Title"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <div style={{ padding: '10px', border: '1px solid #ccc', width: '100%', maxWidth: '600px' }}>
      {/* Textarea for message input */}
      <textarea
        placeholder="Type your message..."
        style={{
          width: '100%',
          height: '100px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      ></textarea>

      {/* Attachment Section */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', gap: '10px' }}>
        {/* Paperclip Icon */}
        <FontAwesomeIcon
          icon={faPaperclip}
          style={{ fontSize: '18px', cursor: 'pointer' }}
          onClick={handleIconClick}
        />

        {/* Hidden File Input */}
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Placeholder for selected file name */}
        {selectedFile ? (
          <span style={{ fontSize: '14px', color: '#555' }}>{selectedFile}</span>
        ) : (
          <span style={{ fontSize: '14px', color: '#888' }}>Add file</span>
        )}
      </div>
    </div>
          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </form> 
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
              navigation("/give");
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
              navigation("/Programs");
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
            style={{ width: '100%', 
              textDecoration: "none", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',  // Ensures the icon and text are aligned vertically
              gap: '10px',           // Adds spacing between the icon and the text
              color: 'inherit',      // Ensures link color stays consistent
              fontSize: '16px',      // Adjust the font size to ensure consistent icon size
              lineHeight: '1.5', }}
            onClick={() => {
              navigation("/");
            }}
          >
           <FaPhoneAlt />  +234 0000 0000 00000
          </a>
          <a
            href=""
            style={{ width: '100%', 
              textDecoration: "none", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',  // Ensures the icon and text are aligned vertically
              gap: '10px',           // Adds spacing between the icon and the text
              color: 'inherit',      // Ensures link color stays consistent
              fontSize: '16px',      // Adjust the font size to ensure consistent icon size
              lineHeight: '1.5', }}
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
            style={{ 
              width: '100%', 
              textDecoration: "none", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center',  // Ensures the icon and text are aligned vertically
              gap: '10px',           // Adds spacing between the icon and the text
              color: 'inherit',      // Ensures link color stays consistent
              fontSize: '16px',      // Adjust the font size to ensure consistent icon size
              lineHeight: '1.5', }}
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
         
          <div style={{ display: "flex", padding: '5px', flexDirection: "row", gap: "30px", margin: isMobile ? "auto" : "auto"}}>
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
        <div style={{ display: "flex", padding: '5px', flexDirection: "row", gap: "10px", margin: isMobile ? "auto" : "auto"}}>
          {/* <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a> */}
         
            <p>&copy; {new Date().getFullYear()} 
              
            <a
            href=""
            style={{ textDecoration: "none", padding: '6px'}}
            onClick={() => {
              navigation("/");
            }}
          >
            Christ Embassy Ibadan Zone 1
          </a> </p>

        </div>
      </footer>
    </div>
  );
};

export default ContactScreen;
