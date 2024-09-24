import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons"; // Added faArrowLeft for back icon
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js"; // Import Stripe Elements
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe.js
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import logo from "./logo.png";
import image1 from "../../assets/partner.png";
import image2 from "../../assets/building.jpeg";
import image3 from "../../assets/healings.jpg";
import kingschat from "../../assets/kingschat.png";

const stripePromise = loadStripe(
  "pk_test_51Q1gtFKTNsqkYMrBOpf8FM246PAW6mq7QOcCJAffrH9M4Tsp3n6TGlHGPZA2g1phWCr8avF1bdvh5TewgNzx3jIm00YrUOw85F"
); // Initialize Stripe with your public key


const categories = [
  { value: "", label: "Select Category" },
  { value: "offering", label: "Service Offering" },
  { value: "healingStreams", label: "Healing Streams" },
  { value: "rhapsody", label: "Rhapsody" },
  { value: "missions", label: "Missions" },
  { value: "building", label: "Building Project" },
  { value: "ltm", label: "LTM" },
];

const currencies = [
  { value: "", label: "Select Currency" },
  { value: "USD", label: "USD" },
  { value: "NGN", label: "NGN" },
  { value: "GBP", label: "GBP" },
];


const GiveScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    currency: "",
    category: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false); // Check if form is fully filled
  const [formIncompleteMessage, setFormIncompleteMessage] = useState(""); // Message for incomplete form
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [showMinistries, setShowMinistries] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigation = useNavigate();

  const handleFlip = (index) => {
    if (flippedIndex === index && showForm) {
      setShowForm(true);
    } else if (flippedIndex === index) {
      setShowForm(true); // Show form after the second click
    } else {
      setFlippedIndex(index);
      setShowForm(false);
    }
  };


  // const handleCategory = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  // };

  
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

    
  
  //   // Check if all form fields are filled
  //   const allFilled = Object.values(formData).every(
  //     (value) => value.trim() !== ""
  //   );

  //   setIsFormComplete(allFilled);
  //   setFormIncompleteMessage(
  //     allFilled ? "" : "Please complete the form to proceed."
  //   );
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const allFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    setIsFormComplete(allFilled);
    setFormIncompleteMessage(
      allFilled ? "" : "Please complete the form to proceed."
    );
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      console.log("Form submitted:", formData);
      // Navigate to Stripe screen after submission
      // navigate('/stripe');
      navigation("/stripe");
    }
  };

  const handleBack = () => {
    // Reset states and go back to images
    setShowForm(false);
    setFlippedIndex(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      amount: "",
      currency: "",
      category: "",
    });
    setFormIncompleteMessage("");
    setIsFormComplete(false);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Header Section */}
      <header
  style={{
    display: "flex",
    backgroundColor: "black",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    padding: 10,
    zIndex: 1,
    borderBottom: "0.2px solid white",
  }}
>
  <img
    src={logo}
    alt="Church Logo"
    style={{ width: "60px", height: "auto", marginRight: 40,}}
    onClick={() => navigation("/")}
  />
  {isMobile ? (
    <div style={{ position: "relative" }}>
      <div
        style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
      </div>

      {/* Conditionally render the drop-down menu */}
      {menuOpen && (
        <nav
          style={{
            position: "absolute",
            top: "50px", // Position below the icon
            right: 0, // Align to the left side of the screen
            backgroundColor: "black",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 10,
            gap: 5,
            width: "200px", // Optional: set a fixed width for the menu
          }}
        >
          <a
            href=""
            style={{ textDecoration: "none", color: "white", display: "block", marginBottom: "10px",}}
            onClick={() => {
              navigation("/");
              toggleMenu(); // Close menu on click
            }}
          >
            HOME
          </a>
          <a
            href=""
            style={{ textDecoration: "none", color: "white", display: "block", marginBottom: "10px" }}
            onClick={() => {
              navigation("/LiveStream");
              toggleMenu(); // Close menu on click
            }}
          >
            LIVE
          </a>
          <a
            href=""
            style={{ textDecoration: "none", color: "white", display: "block" }}
            onClick={() => {
              navigation("/Contact");
              toggleMenu(); // Close menu on click
            }}
          >
            CONTACT
          </a>
        </nav>
      )}
    </div>
  ) : (
    <nav
      style={{
        display: "flex",
        gap: "70px",
        color: "white",
        padding: '10px 50px',
        fontWeight: 600,
      }}
    >
      <a
        href=""
        style={{ textDecoration: "none", color: "white" }}
        onClick={() => {
          navigation("/");
        }}
      >
        HOME
      </a>
      <a
        href=""
        style={{ textDecoration: "none", color: "white" }}
        onClick={() => {
          navigation("/LiveStream");
        }}
      >
        LIVE
      </a>
      <a
        href=""
        style={{ textDecoration: "none", color: "white" }}
        onClick={() => {
          navigation("/Contact");
        }}
      >
        CONTACT
      </a>
    </nav>
  )}
</header>


      {/* Image Flip Cards or Form Section */}
      {showForm ? (
        // Display the form instead of images
        <section style={{ zIndex: 1, padding: "50px", textAlign: "center" }}>
          {/* Back Icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "20px",
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={handleBack}
            />
          </div>

          <h2>Make payment in any currency </h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                color: "black",
                height: "40px",
                fontSize: "14",
                width: isMobile ? "80%" : "30%",
                marginTop: 15,
                padding: 5
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                color: "black",
                fontSize: "14",
                height: "40px",
                width: isMobile ? "80%" : "30%",
                marginTop: 10,
                padding: 5
              }}
              
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                color: "black",
                fontSize: "14",
                height: "40px",
                width: isMobile ? "80%" : "30%",
                marginTop: 10,
                padding: 5
              }}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                color: "black",
                height: "40px",
                fontSize: "14",
                width: isMobile ? "80%" : "30%",
                marginTop: 10,
                padding: 5
              }}
            />
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                color: "black",
                fontSize: "14",
                height: "40px",
                width: isMobile ? "80%" : "30%",
                marginBottom: 10,
                padding: 5
              }}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                color: "black",
                fontSize: "14",
                height: "40px",
                width: isMobile ? "80%" : "30%",
                marginBottom: 10,
                padding: 5
              }}
            >
              {categories.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {isFormComplete ? (
              <Elements stripe={stripePromise}>
                <button type="submit" style={{ marginTop: "20px" }}>
                  Proceed to Payment
                </button>
              </Elements>
            ) : (
              <p style={{ color: "red", marginTop: "20px" }}>
                {formIncompleteMessage}
              </p>
            )}
          </form>
        </section>
      ) : (
        // Display the image flip cards
        <section
          style={{
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            padding: "20px",
            gap: "30px",
          }}
        >
          {[
            { img: image1, text: "Click to proceed to give your offering" },
            {
              img: image2,
              text: "Click to proceed and make payment for Your Healing Streams partnership",
            },
            { img: image3, text: "Click on me to proceed with payment" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                width: isMobile ? "90vw" : "30%",
                height: "300px",
                perspective: "1000px",
                cursor: "pointer",
              }}
              onClick={() => handleFlip(index)}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.8s",
                  transformStyle: "preserve-3d",
                  transform:
                    flippedIndex === index
                      ? "rotateY(180deg)"
                      : "rotateY(0deg)",
                }}
              >
                {/* Front Side */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={item.img}
                    alt={`Image ${index + 1}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                {/* Back Side */}
                <div
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Footer Section */}

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
              width: "100%",
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Ensures the icon and text are aligned vertically
              gap: "10px", // Adds spacing between the icon and the text
              color: "inherit", // Ensures link color stays consistent
              fontSize: "16px", // Adjust the font size to ensure consistent icon size
              lineHeight: "1.5", // Adds some height consistency between text and icon
            }}
          >
            <FaMapMarkerAlt style={{ fontSize: "18px" }} />
            CVHQ+R4, Ibadan 200285, Oyo
          </a>

          <a
            href=""
            style={{
              width: "100%",
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Ensures the icon and text are aligned vertically
              gap: "10px", // Adds spacing between the icon and the text
              color: "inherit", // Ensures link color stays consistent
              fontSize: "16px", // Adjust the font size to ensure consistent icon size
              lineHeight: "1.5",
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
              width: "100%",
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Ensures the icon and text are aligned vertically
              gap: "10px", // Adds spacing between the icon and the text
              color: "inherit", // Ensures link color stays consistent
              fontSize: "16px", // Adjust the font size to ensure consistent icon size
              lineHeight: "1.5",
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
              width: "100%",
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Ensures the icon and text are aligned vertically
              gap: "10px", // Adds spacing between the icon and the text
              color: "inherit", // Ensures link color stays consistent
              fontSize: "16px", // Adjust the font size to ensure consistent icon size
              lineHeight: "1.5",
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
              width: "100%",
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Ensures the icon and text are aligned vertically
              gap: "10px", // Adds spacing between the icon and the text
              color: "inherit", // Ensures link color stays consistent
              fontSize: "16px", // Adjust the font size to ensure consistent icon size
              lineHeight: "1.5",
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
            padding: "5px",
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
            padding: "5px",
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

export default GiveScreen;
