import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import logo from "./logo.png";
import kingschat from "../../assets/kingschat.png";
import bannerImage1 from "../../assets/pja.JPG"; // Add your images here
import bannerImage2 from "../../assets/pjoea.JPG"; // Add your images here
import bannerImage3 from "../../assets/gdop.jpg"; // Add your images here
import galleryImage1 from "../../assets/reachout.jpg"; // Add your images here
import galleryImage2 from "../../assets/healingstreams.jpg"; // Add your images here
import galleryImage3 from "../../assets/rownigeria.jpg"; // Add your images here
import galleryImage4 from "../../assets/gdop.jpg"; // Add your images here
import galleryImage5 from "../../assets/rowteevo.jpeg"; // Add your images here
import galleryImage6 from "../../assets/youth.png"; // Add your images here
import galleryImage7 from "../../assets/kids.jpg"; // Add your images here
import galleryImage8 from "../../assets/lwfs.jpg"; // Add your images here
import { useNavigate } from "react-router-dom";

const ProgramScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigation = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showMinistries, setShowMinistries] = useState(false);

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
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}

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
                href=""
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
                <div style={{ textDecoration: "none", color: "white" }}>
                  MINISTRIES
                </div>
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
                      href=""
                      style={{ display: "block", marginBottom: "10px" }}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default anchor behavior (reload)
                        navigation("/foundationSchool");
                      }}
                    >
                      Foundation School
                    </a>

                    <a
                      href=""
                      style={{ display: "block", marginBottom: "10px" }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigation("/teens");
                      }}
                    >
                      Teens Ministry
                    </a>

                    <a
                      href=""
                      style={{ display: "block" }}
                      onClick={(e) => {
                        e.preventDefault();
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
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => {
                  navigation("/Contact");
                }}
              >
                TESTIFY
              </a>
              <a
                href=""
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => {
                  navigation("/Programs");
                }}
              >
                PROGRAMS
              </a>
              <a
                href=""
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
              gap: 20,
              zIndex: 2
            }}
          >
            <a
              href=""
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 0",
              }}
              onClick={toggleMenu}
            >
              LIVE
            </a>
            <div
              onMouseEnter={() => setShowMinistries(true)}
              onMouseLeave={() => setShowMinistries(false)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <a style={{ textDecoration: "none", color: "white" }}>
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
                    zIndex: 1,
                    gap: 30,
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
              TESTIFY
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
      </div>

      {/* Banner Carousel */}
      <div
        style={{ position: "relative", height: isMobile ? "40vh" : "100vh", overflow: "hidden", objectFit: 'contain' }}
      >
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
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* Gallery Section */}
      <div
        style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        {galleryItems.map((item, index) => (
          <div
            key={index}
            onClick={() => alert(item.status)}
            style={{
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              height: isMobile ? "50vh" : "50vh",
            }}
          >
            <img
              src={item.src}
              alt={`Gallery ${index}`}
              style={{ width: "100%", height: isMobile ? "100%" : "auto", borderRadius: "10px" }}
            />
          </div>
        ))}
      </div>

      


      {/* Section 6: Useful Links */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backgroundSize: "cover",
          padding: "40px 15px",
          width: "100%",
          height: "100%",
          color: "white",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          margin: "auto",
          gap: "20px",
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
          <a
            href="https://rhapsodyofrealities.org/"
            style={{ textDecoration: "none" }}
          >
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
  style={{
    width: '100%', 
    textDecoration: "none", 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center',  // Ensures the icon and text are aligned vertically
    gap: '10px',           // Adds spacing between the icon and the text
    color: 'inherit',      // Ensures link color stays consistent
    fontSize: '16px',      // Adjust the font size to ensure consistent icon size
    lineHeight: '1.5',     // Adds some height consistency between text and icon
  }}
>
  <FaMapMarkerAlt style={{ fontSize: '18px' }} /> 
  CVHQ+R4, Ibadan 200285, Oyo
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
            <FaPhoneAlt /> +234 0000 0000 00000
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
            <FaGlobe /> www.ceibz1.com
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
          width: "100%",
          gap: "20%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            padding: '5px',
            margin: isMobile ? "auto" : "auto 5%",

          }}
        >
          <a href="https://kingschat.com" style={{ textDecoration: "none" }}>
            <img
              src={kingschat}
              alt="Church Logo"
              style={{ width: "24px", height: "auto" }}
              onClick={() => navigation("/")}
            />
          </a>
          <a
            href="https://www.facebook.com/ceibz1"
            style={{ textDecoration: "none" }}
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.youtube.com/@ChristEmbassyibz1"
            style={{ textDecoration: "none" }}
          >
            <FaYoutube size={24} />
          </a>
          <a href="https://instagram.com" style={{ textDecoration: "none" }}>
            <FaInstagram size={24} />
          </a>
          <a href="https://twitter.com" style={{ textDecoration: "none" }}>
            <FaTwitter size={24} />
          </a>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            margin: isMobile ? "auto" : "auto",
            padding: '5px'
          }}
        >
          {/* <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a> */}

          <p>
            &copy; {new Date().getFullYear()}
            <a
              href=""
              style={{
                textDecoration: "none",
                padding: "6px",
                fontSize: "14px",
              }}
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

export default ProgramScreen;
