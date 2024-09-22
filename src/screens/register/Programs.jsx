
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from "./logo.png";
import kingschat from "../../assets/kingschat.png";
import bannerImage1 from "../../assets/lwfsg.jpg"; // Add your images here
import bannerImage2 from "../../assets/pjoe.jpg"; // Add your images here
import bannerImage3 from "../../assets/lwfs.jpg"; // Add your images here
import galleryImage1 from "../../assets/child.jpg"; // Add your images here
import galleryImage2 from "../../assets/post_children.jpg"; // Add your images here
import galleryImage3 from "../../assets/post_ftm.jpg"; // Add your images here
import galleryImage4 from "../../assets/post_teens.jpg"; // Add your images here
import galleryImage5 from "../../assets/post_ftm.jpg"; // Add your images here
import galleryImage6 from "../../assets/pjoe1.jpg"; // Add your images here
import galleryImage7 from "../../assets/pjoe1.jpg"; // Add your images here
import galleryImage8 from "../../assets/pjoe.jpg"; // Add your images here
import { useNavigate } from "react-router-dom";

const ProgramScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigation = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  const banners = [bannerImage1, bannerImage2, bannerImage3];

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const galleryItems = [
    { src: galleryImage1, status: "Open" },
    { src: galleryImage2, status: "Closed" },
    { src: galleryImage3, status: "Open" },
    { src: galleryImage4, status: "Closed" },
    { src: galleryImage5, status: "Open" },
    { src: galleryImage6, status: "Closed" },
    { src: galleryImage7, status: "Open" },
    { src: galleryImage8, status: "Closed" },
  ];

  return (
    <div style={{ width: "100%", height: "100%", margin: "auto", overflow: "hidden" }}>
      {/* Header Section */}
      <header style={{ display: "flex", backgroundColor: "rgba(0, 0, 0, 0.4)", justifyContent: "space-between", alignItems: "center", padding: 20, zIndex: 1, borderBottom: "0.2px solid white" }}>
        <img src={logo} alt="Logo" style={{ width: "60px", height: "auto" }} />
        {isMobile ? (
          <div style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
          </div>
        ) : (
          <nav style={{ display: "flex", gap: "70px", color: "white", marginRight: "5%", fontWeight: 600 }}>
            <a href="#home" style={{ textDecoration: "none", color: "white" }} onClick={() => navigation("/")}>HOME</a>
            <a href="#about" style={{ textDecoration: "none", color: "white" }} onClick={() => navigation("/LiveStream")}>LIVE</a>
            <a href="#contact" style={{ textDecoration: "none", color: "white" }} onClick={() => navigation("/LiveStream")}>GIVE</a>
          </nav>
        )}
      </header>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <nav style={{ position: "absolute", left: 0, top: "100px", width: "60%", backgroundColor: "rgba(001, 005, 050, 0.9)", display: "flex", flexDirection: "column", padding: "30px", zIndex: 1 }}>
          <a href="#home" style={{ textDecoration: "none", color: "white", padding: "10px 0" }} onClick={toggleMenu}>HOME</a>
          <a href="#about" style={{ textDecoration: "none", color: "white", padding: "10px 0" }} onClick={() => navigation("/LiveStream")}>LIVE</a>
          <a href="#contact" style={{ textDecoration: "none", color: "white", padding: "10px 0" }} onClick={() => navigation("/LiveStream")}>GIVE</a>
        </nav>
      )}

      {/* Banner Carousel */}
      <div style={{ position: "relative", height: "300px", overflow: "hidden" }}>
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index}`}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: currentBannerIndex === index ? 1 : 0,
              transition: "opacity 0.5s ease-in-out"
            }}
          />
        ))}
      </div>

      {/* Gallery Section */}
      <div style={{ padding: "20px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "20px" }}>
        {galleryItems.map((item, index) => (
          <div
            key={index}
            onClick={() => alert(item.status)}
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}
          >
            <img src={item.src} alt={`Gallery ${index}`} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", padding: "20px", backgroundColor: "black", color: "white", gap: '20%' }}>
        {/* Social Media Links and Copyright */}
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <a href="https://kingschat.com" style={{ textDecoration: "none" }}>
            <img src={kingschat} alt="KingsChat Logo" style={{ width: "24px", height: "auto" }} />
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
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <p>&copy; {new Date().getFullYear()} 
            <a href="#" style={{ textDecoration: "none", padding: '6px' }} onClick={() => navigation("/")}>
              Christ Embassy Ibadan Zone 1
            </a>
            | All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProgramScreen;
