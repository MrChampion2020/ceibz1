import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.png";
import bannerImage from "../../assets/pjoe.jpg";
import { useNavigate } from "react-router-dom";

const ContactScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMinistries, setShowMinistries] = useState(false); // Added state for ministries dropdown
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigation = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
                navigation("/LiveStream");
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
            href="#home"
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 0",
            }}
            onClick={toggleMenu}
          >
            HOME
          </a>
          <a
            href="#about"
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
            href="#contact"
            style={{
              textDecoration: "none",
              color: "white",
              padding: "10px 0",
            }}
            onClick={() => {
              navigation("/LiveStream");
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
          <textarea
            placeholder="Message"
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              height: "100px",
            }}
          ></textarea>
          <input
            type="file"
            accept="image/*, .pdf"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
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

      {/* Useful Links and Footer Section */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* Useful Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "left", width: "100%" }}>
            <h2>Useful Links</h2>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "black" }}>
                  Give
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "black" }}>
                  Testify
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "black" }}>
                  Programs
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "black" }}>
                  Rhapsody
                </a>
              </li>
              <li>
                <a href="#" style={{ textDecoration: "none", color: "black" }}>
                  Pastor's Desk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            height: "70%",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <a
              href="#contact"
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => {
                navigation("/");
              }}
            >
              HOME
            </a>
            <a
              href="#live"
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => {
                navigation("/LiveStream");
              }}
            >
              Live Video
            </a>
            <a href="#give" style={{ color: "white", textDecoration: "none" }}
            onClick={() => {
              navigation("/LiveStream");
            }}>
              Give
            </a>
            <a
              href="#partnership"
              style={{ color: "white", textDecoration: "none" }}
              onClick={() => {
                navigation("/LiveStream");
              }}
            >
              Partnership
            </a>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              onMouseEnter={() => setShowMinistries(true)}
              onMouseLeave={() => setShowMinistries(false)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <a href="#" style={{ textDecoration: "none", color: "white" }}>
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
                    href="#"
                    style={{ display: "block", marginBottom: "10px" }}
                    onClick={() => {
                      navigation("/foundationSchool");
                    }}
                  >
                    Foundation School
                  </a>
                  <a
                    href="#"
                    style={{ display: "block", marginBottom: "10px" }}
                    onClick={() => {
                      navigation("/teens");
                    }}
                  >
                    Teens Ministry
                  </a>
                  <a
                    href="#"
                    style={{ display: "block", marginBottom: "10px" }}
                  >
                    Music Ministry
                  </a>
                  <a
                    href="#"
                    style={{ display: "block", marginBottom: "10px" }}
                  >
                    Men's Fellowship
                  </a>
                  <a
                    href="#"
                    style={{ display: "block", marginBottom: "10px" }}
                  >
                    Women's Fellowship
                  </a>
                </div>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ContactScreen;
