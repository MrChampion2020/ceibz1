"use client";

import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaChevronDown,
} from "react-icons/fa";
import kingschat from "../assets/kingschat.png";
import logo from "../assets/logo.png";

const Footer = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const { theme } = useTheme();

  const mainMenuLinks = [
    { name: "WATCH LIVE", path: "/LiveStream" },
    { name: "MINISTRIES", path: "#", hasDropdown: true },
    { name: "PROGRAMS", path: "/Programs" },
    { name: "TESTIFY", path: "/testify" },
    { name: "GIVE", path: "/give" },
  ];

  const relevantLinks = [
    { name: "RHAPSODY OF REALITIES", href: "https://rhapsodyofrealities.org/" },
    { name: "INNER CITY MISSIONS", href: "https://innercitymission.org/" },
    { name: "HEALING STREAMS", href: "https://healingstreams.tv/" },
    { name: "PASTOR CHRIS DIGITAL LIBRARY", href: "https://pcdl.co/" },
    { name: "PASTOR CHRIS ONLINE", href: "https://pastorchrisonline.org/" },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "CVHQ+R4, Ibadan 200285, Oyo" },
    { icon: FaPhoneAlt, text: "+234 000 0000 000" },
    { icon: FaEnvelope, text: "info@ceibz1.com" },
  ];

  const socialMedia = [
    { icon: FaFacebook, href: "https://www.facebook.com/ceibz1" },
    { icon: FaYoutube, href: "https://www.youtube.com/@ChristEmbassyibz1" },
    {
      icon: "image",
      src: kingschat,
      href: "https://www.kings.chat/@ChristEmbassyibz1",
    },
    { icon: FaInstagram, href: "https://instagram.com" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer style={{ backgroundColor: "#2a1e7a", color: "white" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "60px 24px 40px",
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? "1fr 1fr"
            : "1fr 1fr 1fr",
          gap: "40px",
        }}
      >
        {/* Logo and Social Media */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <motion.div variants={itemVariants}>
            <img
              src={logo}
              alt="Christ Embassy Logo"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                marginBottom: "16px",
              }}
            />
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              Christ Embassy Ibadan
            </h3>
            <p style={{ fontSize: "16px", opacity: 0.8 }}>Zone 1</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {socialMedia.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "#f59e0b" }}
                style={{
                  color: "white",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* <item.icon /> */}
                {item.icon === "image" ? (
                  <img
                    src={item.src}
                    alt="kingschat"
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <item.icon />
                )}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Menu */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            variants={itemVariants}
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            Main Menu
          </motion.h3>

          <motion.div
            variants={containerVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {mainMenuLinks.map((link, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <a
                  href={link.path}
                  onClick={(e) => {
                    if (link.path !== "#") {
                      e.preventDefault();
                      navigate(link.path);
                    }
                  }}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {link.name}
                  {link.hasDropdown && <FaChevronDown size={12} />}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Relevant Links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            variants={itemVariants}
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "24px",
              textTransform: "uppercase",
            }}
          >
            Relevant Links
          </motion.h3>

          <motion.div
            variants={containerVariants}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {relevantLinks.map((link, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Contact Info - Only shown on tablet and desktop */}
        {!isMobile && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              gridColumn: isTablet ? "span 2" : "auto",
            }}
          >
            <motion.h3
              variants={itemVariants}
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "24px",
                textTransform: "uppercase",
              }}
            >
              Contact Us
            </motion.h3>

            <motion.div
              variants={containerVariants}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <item.icon size={16} />
                  </div>
                  <span style={{ fontSize: "16px" }}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "24px",
          textAlign: "center",
          fontSize: "14px",
          opacity: 0.8,
        }}
      >
        <p>© Christ Embassy Ibadan Zone 1</p>
      </div>
    </footer>
  );
};

export default Footer;
