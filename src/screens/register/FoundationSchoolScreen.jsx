import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "./logo.jpg";
import bannerImage from "../../assets/church.jpg";

const FoundationSchoolScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [selectedClass, setSelectedClass] = useState(""); // Selected class state

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

  return (
    <div style={{ width: "100%", height: "100%" }}>
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
        }}
      >
        <img
          src={logo}
          alt="Church Logo"
          style={{ width: "60px", height: "auto" }}
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
            <a href="#live" style={{ textDecoration: "none", color: "white" }}>
              LIVE
            </a>
            <a
              href="#ministries"
              style={{ textDecoration: "none", color: "white" }}
            >
              MINISTRIES
            </a>
            <a
              href="#testimonies"
              style={{ textDecoration: "none", color: "white" }}
            >
              TESTIMONIES
            </a>
            <a
              href="#programs"
              style={{ textDecoration: "none", color: "white" }}
            >
              PROGRAMS
            </a>
            <a href="#give" style={{ textDecoration: "none", color: "white" }}>
              GIVE
            </a>
          </nav>
        )}
      </header>

      {/* Text and Class Selection Section */}
      <div
        style={{
          padding: "50px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
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
            In the Loveworld foundation school, members are taught the basic doctrines of
            Christ. They are equipped for the work of the ministry. The bible
            also admonishes that we be not children tossed to and fro by every
            wind of doctrine… hence the need to equip the saints. Knowledge is
            vital, and it marks the difference between success and failure. To
            have a successful Christian life, you require the basic knowledge to
            equip you for this walk with God. And that’s why we invite people to
            join the foundation school, because in the foundation school, you’d
            be taught the basic doctrines of Christ that’ll equip you for the
            higher life in God.
          </p>
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
              <h3>{selectedClass}</h3>
              <p>{classContent[selectedClass]}</p>
            </div>
          )}
        </div>
        <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
          <h1>We are to Help!</h1>

          <p>Join our Live stream services weekly and get engaged!</p>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Watch Now
          </button>
        </div>
      </div>

      {/* Useful Links and Footer Section */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Useful Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          }}
        >
          <div>
            <h2>Useful Links</h2>
            <ul style={{ listStyleType: "none", padding: 0 }}>
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
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
          }}
        >
          <div>
            <a
              href="#contact"
              style={{
                color: "white",
                textDecoration: "none",
                paddingRight: "20px",
              }}
            >
              Contact
            </a>
            <a
              href="#live"
              style={{
                color: "white",
                textDecoration: "none",
                paddingRight: "20px",
              }}
            >
              Live Video
            </a>
            <a
              href="#give"
              style={{
                color: "white",
                textDecoration: "none",
                paddingRight: "20px",
              }}
            >
              Give
            </a>
            <a
              href="#partnership"
              style={{ color: "white", textDecoration: "none" }}
            >
              Partnership
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FoundationSchoolScreen;
