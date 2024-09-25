import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
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
import kingschat from "../../assets/kingschat.png";
import logo from './logo.png';
import video1 from '../../assets/kidsvideo.mp4';
import video2 from '../../assets/kidsvid.mp4';
import image1 from '../../assets/kids.jpg';
import image2 from '../../assets/kiddies.jpg';
import image3 from '../../assets/kiddieslw.png';

const Children = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [flippedIndex, setFlippedIndex] = useState(null); // To track which image is flipped
  const [currentDay, setCurrentDay] = useState(''); // For schedule buttons
  const [activeSection, setActiveSection] = useState(null);
  const [showMinistries, setShowMinistries] = useState(false);

  

  const navigation = useNavigate();

  const schedule = {
    Monday: "--:--",
    Tuesday: "--:--",
    Wednesday: "6 PM",
    Thursday: "--:--",
    Friday: "--:--",
    Saturday: "6PM",
    Sunday: "10:30 AM"
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFlip = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index); // Toggle flip state
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Header Section */}
      
      <header
        style={{
          position: 'fixed',  // This makes the header static
          top: 0,             // Aligns the header at the top of the page
          left: 0,
          display: "flex",
          backgroundColor: "rgba(0, 0, 0, 9)",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        
          zIndex: 1,
          height: '10%',
          borderBottom: "0.2px solid white",
          // backgroundImage: `url(${bannerImage})`,
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
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" style={{padding: 15}} />
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
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    padding: "5px",
                    zIndex: 2,
                  }}
                >
                  <a
                    href=""
                    style={{ display: "block", marginBottom: "10px" }}
                    onClick={() => navigation("/foundationSchool")}
                  >
                    Foundation School
                  </a>
                  <a
                    href=""
                    style={{ display: "block", marginBottom: "10px" }}
                    onClick={() => navigation("/teens")}
                  >
                    Teens Ministry
                  </a>
                  <a
                    href=""
                    style={{ display: "block" }}
                    onClick={() => navigation("/children")}
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
              }}>
              CONTACT
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
            <a href="" style={{ textDecoration: "none", color: "white" }}
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
            top: 70,
            width: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
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

      {/* Section 1: Image Flip Cards */}
      <section style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        gap: '20px'
      }}>
        {[image1, image2, image3].map((image, index) => (
          <div 
            key={index}
            style={{
              width: '300px',
              height: '300px',
              position: 'relative',
              perspective: '1000px',
              cursor: 'pointer'
            }}
            onClick={() => handleFlip(index)}
          >
            <div style={{
              width: '100%',
              height: '100%',
              transition: 'transform 0.8s',
              transformStyle: 'preserve-3d',
              transform: flippedIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>
              {/* Front Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden'
              }}>
                <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
              </div>
              {/* Back Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'rotateY(180deg)',
                padding: 20
              }}>
                <p> Welcome To the Loveworld Children Ministry, Ensure to Read your devotional today</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Section 2: Videos */}
      <section style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        padding: '20px',
        gap: '20px'
      }}>
        <div style={{ flex: 1 }}>
          <video controls style={{ width: '100%' }}>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={{ flex: 1 }}>
          <video controls style={{ width: '100%' }}>
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Section 3: Schedule */}
      <section style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: '100%',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Our Schedule</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          {Object.keys(schedule).map((day) => (
            <button key={day} onClick={() => setCurrentDay(day)} style={{
              padding: '10px 20px',
              backgroundColor: 'orange',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              {day}
            </button>
          ))}
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          padding: '20px'
        }}>
          {Object.keys(schedule).map((day, index) => (
            <div key={index} style={{
              width: '100px',
              height: '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              fontWeight: 700

            }}>
              {currentDay === day ? schedule[day] : '--:--'}
            </div>
          ))}
        </div>
      </section>



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

export default Children;
