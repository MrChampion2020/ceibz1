
"use client"

import { useState, useRef } from "react"
import { useMediaQuery } from "react-responsive"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import bannerImage from "../../assets/pjoe.jpg"
import kingschat from "../../assets/kingschat.png"
import sango from "../../assets/videos/churchrd.mp4"

import { useNavigate } from "react-router-dom"
import { useTheme } from "../../components/ThemeProvider"
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaPaperclip,
  FaDirections,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaPray,
  FaEnvelopeOpenText,
  FaTimes,
  FaCheck,
} from "react-icons/fa"

const ContactScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
  const [selectedFile, setSelectedFile] = useState(null)
  const [activeTab, setActiveTab] = useState("form")
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showPrayerForm, setShowPrayerForm] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    message: "",
  })

  const formRef = useRef(null)
  const prayerFormRef = useRef(null)
  const navigate = useNavigate()
  const { theme } = useTheme()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file.name)
    }
  }

  const handleIconClick = () => {
    document.getElementById("fileInput").click()
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
    setActiveTab("form")
  }

  const scrollToPrayerForm = () => {
    setShowPrayerForm(true)
    setTimeout(() => {
      prayerFormRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value,
    })

    // Clear error when user types
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: null,
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) errors.phone = "Phone is required"
    if (!formData.title.trim()) errors.title = "Subject is required"
    if (!formData.message?.trim()) errors.message = "Message is required"

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitting(false)
      setShowSuccessModal(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        title: "",
        message: "",
      })
      setSelectedFile(null)
    }, 1500)
  }

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "What time are your Sunday services?",
      answer:
        "Our Sunday services start at 10:30 AM. We recommend arriving 15 minutes early to get seated and prepare for worship.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, we have ample parking space available for all our members and visitors. Our ushers will guide you to the appropriate parking area.",
    },
    {
      question: "Do you have programs for children?",
      answer:
        "We have a vibrant Children's Ministry that runs concurrently with our main service. Children are taught age-appropriate biblical lessons in a fun and engaging environment.",
    },
    {
      question: "How can I become a member of the church?",
      answer:
        "You can become a member by attending our Foundation School, which is a program designed to ground new members in the basic principles of our faith. Classes are held every Sunday after the service.",
    },
    {
      question: "How can I get involved in church activities?",
      answer:
        "There are many ways to get involved! You can join one of our ministry departments, volunteer for outreach programs, or participate in cell group meetings. Speak to any of our ushers or fill out the contact form, and we'll help you find the right fit.",
    },
  ]

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <Navbar />

      <main style={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <section
          style={{
            position: "relative",
            height: "400px",
            overflow: "hidden",
            marginTop: "80px",
          }}
        >
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            src={bannerImage}
            alt="Contact Banner"
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "white",
              zIndex: 2,
              width: "90%",
            }}
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "bold",
                color: "#f59e0b",
                marginBottom: "16px",
              }}
            >
              CONTACT US
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{ fontSize: isMobile ? "16px" : "18px", maxWidth: "600px", margin: "0 auto", color: "white" }}
            >
              We'd love to hear from you. Reach out to us for any inquiries or to join our community.
            </motion.p>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}
            >
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: "#3a2e8a" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, delay: 1 }}
                onClick={scrollToForm}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2a1e7a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Get in Touch
              </motion.button>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: "#f59e0b" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                onClick={scrollToPrayerForm}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "transparent",
                  color: "white",
                  border: "2px solid #f59e0b",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaPray /> Submit Prayer Request
              </motion.button>
            </div>
          </motion.div>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(42, 30, 122, 0.6)", zIndex: 1 }}></div>
        </section>

        {/* Contact Information Cards */}
        <section
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "24px",
            }}
          >
            {/* Contact Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                flex: "1",
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "24px",
                  color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  paddingBottom: "12px",
                }}
              >
                Contact Information
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      flexShrink: 0,
                    }}
                  >
                    <FaMapMarkerAlt size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Our Location</h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: theme === "dark" ? "#cccccc" : "#4b5563",
                        lineHeight: "1.5",
                      }}
                    >
                      CVHQ+R4, Ibadan 200285, Oyo State, Nigeria
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      flexShrink: 0,
                    }}
                  >
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Phone Number</h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: theme === "dark" ? "#cccccc" : "#4b5563",
                        lineHeight: "1.5",
                      }}
                    >
                      +234 0000 0000 00000
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      flexShrink: 0,
                    }}
                  >
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Email Address</h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: theme === "dark" ? "#cccccc" : "#4b5563",
                        lineHeight: "1.5",
                      }}
                    >
                      info@ceibz1.com
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      flexShrink: 0,
                    }}
                  >
                    <FaCalendarAlt size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>Service Times</h3>
                    <p
                      style={{
                        fontSize: "14px",
                        color: theme === "dark" ? "#cccccc" : "#4b5563",
                        lineHeight: "1.5",
                      }}
                    >
                      Sunday: 10:30 AM
                      <br />
                      Wednesday: 6:00 PM
                      <br />
                      Friday: 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Follow Us
                </h3>
                <div style={{ display: "flex", gap: "16px" }}>
                  <motion.a
                    href="https://kingschat.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    <img
                      src={kingschat || "/placeholder.svg"}
                      alt="KingsChat"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </motion.a>
                  <motion.a
                    href="https://www.facebook.com/ceibz1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    <FaFacebook size={18} />
                  </motion.a>
                  <motion.a
                    href="https://www.youtube.com/@ChristEmbassyibz1"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    <FaYoutube size={18} />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    <FaInstagram size={18} />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    <FaTwitter size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                flex: "1",
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ padding: "24px" }}>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "16px",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                    paddingBottom: "12px",
                  }}
                >
                  Find Us
                </h2>
              </div>

              <div style={{ height: "300px", width: "100%" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.4752385790394!2d3.9069383!3d7.4069957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d939c79d9d%3A0xf65a552b29051876!2sChrist%20Embassy%20Ibadan%20Zone%201!5e0!3m2!1sen!2sng!4v1651234567890!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church Location"
                ></iframe>
              </div>

              <div style={{ padding: "16px 24px 24px" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                  <motion.a
                    href="https://goo.gl/maps/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "10px",
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      color: theme === "dark" ? "white" : "#2a1e7a",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <FaDirections /> Get Directions
                  </motion.a>
                  <motion.a
                    href="https://maps.app.goo.gl/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "10px",
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      color: theme === "dark" ? "white" : "#2a1e7a",
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <FaMapMarkedAlt /> View Larger Map
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Directions Section */}
        <section
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "40px",
                textAlign: "center",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              Directions for Newcomers
            </motion.h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: "24px",
              }}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    src={sango}
                    title="Church Location Guide"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    How to Find Our Church
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: theme === "dark" ? "#cccccc" : "#4b5563",
                      lineHeight: "1.6",
                      marginBottom: "16px",
                    }}
                  >
                    A step-by-step guide to help you locate our church building from major landmarks in Ibadan.
                  </p>
                  <motion.a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      textDecoration: "none",
                    }}
                  >
                    Watch on YouTube <FaChevronRight size={12} />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    src={sango}
                    title="What to Expect"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "8px",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    What to Expect on Your First Visit
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: theme === "dark" ? "#cccccc" : "#4b5563",
                      lineHeight: "1.6",
                      marginBottom: "16px",
                    }}
                  >
                    A walkthrough of what your first Sunday service will be like and how to get connected.
                  </p>
                  <motion.a
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      textDecoration: "none",
                    }}
                  >
                    Watch on YouTube <FaChevronRight size={12} />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "8px",
                textAlign: "center",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "16px",
                textAlign: "center",
                marginBottom: "32px",
                color: theme === "dark" ? "#cccccc" : "#4b5563",
              }}
            >
              Find answers to common questions about our church and services
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    onClick={() => toggleFaq(index)}
                    style={{
                      padding: "16px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      borderBottom:
                        expandedFaq === index ? `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}` : "none",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <div
                      style={{
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      {expandedFaq === index ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "16px 24px" }}>
                          <p
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.6",
                              color: theme === "dark" ? "#cccccc" : "#4b5563",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#2a1e7a" : "#2a1e7a",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <FaEnvelopeOpenText size={40} color="#f59e0b" />
              <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>Subscribe to Our Newsletter</h2>
              <p style={{ fontSize: "16px", maxWidth: "600px", marginBottom: "24px" }}>
                Stay updated with our latest events, sermons, and announcements. We'll send you weekly updates straight
                to your inbox.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "12px",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    flex: "1",
                    padding: "14px",
                    borderRadius: "4px",
                    border: "none",
                    fontSize: "16px",
                    color: "black"
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#e08c00" }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "14px 24px",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                  }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p style={{ fontSize: "12px", color: "#e5e7eb", marginTop: "12px" }}>
                We respect your privacy. You can unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Prayer Request Form */}
        <AnimatePresence>
          {showPrayerForm && (
            <section
              ref={prayerFormRef}
              style={{
                padding: isMobile ? "40px 20px" : "60px 40px",
                backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: "800px", margin: "0 auto" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    Submit a Prayer Request
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPrayerForm(false)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  >
                    <FaTimes size={18} />
                  </motion.button>
                </div>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{
                    fontSize: "16px",
                    marginBottom: "32px",
                    color: theme === "dark" ? "#cccccc" : "#4b5563",
                  }}
                >
                  Share your prayer needs with us. Our prayer team will lift your requests to God. All prayer requests
                  are kept confidential.
                </motion.p>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    borderRadius: "8px",
                    padding: "32px",
                    boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "24px",
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      style={{ flex: 1 }}
                    >
                      <label
                        htmlFor="prayer-name"
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        id="prayer-name"
                        type="text"
                        placeholder="Your name"
                        required
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "4px",
                          border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                        }}
                      />
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      style={{ flex: 1 }}
                    >
                      <label
                        htmlFor="prayer-email"
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        Email (optional)
                      </label>
                      <input
                        id="prayer-email"
                        type="email"
                        placeholder="Your email"
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: "4px",
                          border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ marginBottom: "24px" }}
                  >
                    <label
                      htmlFor="prayer-subject"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Prayer Subject
                    </label>
                    <input
                      id="prayer-subject"
                      type="text"
                      placeholder="Subject of your prayer request"
                      required
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        fontSize: "14px",
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{ marginBottom: "24px" }}
                  >
                    <label
                      htmlFor="prayer-request"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Prayer Request
                    </label>
                    <textarea
                      id="prayer-request"
                      placeholder="Share your prayer request here..."
                      required
                      style={{
                        width: "100%",
                        height: "150px",
                        padding: "12px",
                        borderRadius: "4px",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        fontSize: "14px",
                        resize: "vertical",
                      }}
                    ></textarea>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    style={{ marginBottom: "24px" }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: theme === "dark" ? "#cccccc" : "#4b5563",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      />
                      Keep my prayer request confidential
                    </label>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#e08c00" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "14px",
                      backgroundColor: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <FaPray /> Submit Prayer Request
                  </motion.button>
                </motion.div>
              </motion.div>
            </section>
          )}
        </AnimatePresence>

        {/* Contact Form Section */}
        <section
          ref={formRef}
          id="contact-form"
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "8px",
                textAlign: "center",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              Get in Touch
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "16px",
                textAlign: "center",
                marginBottom: "32px",
                color: theme === "dark" ? "#cccccc" : "#4b5563",
              }}
            >
              Have a question or want to connect with us? Fill out the form below and we'll get back to you soon.
            </motion.p>

            <motion.form
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                padding: "32px",
                boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "24px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ flex: 1 }}
                >
                  <label
                    htmlFor="name"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: `1px solid ${formErrors.name ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                      backgroundColor: theme === "dark" ? "#111" : "white",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "14px",
                    }}
                  />
                  {formErrors.name && (
                    <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.name}</p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{ flex: 1 }}
                >
                  <label
                    htmlFor="email"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: `1px solid ${formErrors.email ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                      backgroundColor: theme === "dark" ? "#111" : "white",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "14px",
                    }}
                  />
                  {formErrors.email && (
                    <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.email}</p>
                  )}
                </motion.div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "24px",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{ flex: 1 }}
                >
                  <label
                    htmlFor="phone"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    Phone*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: `1px solid ${formErrors.phone ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                      backgroundColor: theme === "dark" ? "#111" : "white",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "14px",
                    }}
                  />
                  {formErrors.phone && (
                    <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.phone}</p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{ flex: 1 }}
                >
                  <label
                    htmlFor="location"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    placeholder="Your location"
                    value={formData.location}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      backgroundColor: theme === "dark" ? "#111" : "white",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "14px",
                    }}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                style={{ marginBottom: "24px" }}
              >
                <label
                  htmlFor="title"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Subject*
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Message subject"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: `1px solid ${formErrors.title ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                    backgroundColor: theme === "dark" ? "#111" : "white",
                    color: theme === "dark" ? "#ffffff" : "#000000",
                    fontSize: "14px",
                  }}
                />
                {formErrors.title && (
                  <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.title}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{ marginBottom: "24px" }}
              >
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Message*
                </label>
                <div
                  style={{
                    border: `1px solid ${formErrors.message ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                    borderRadius: "4px",
                    backgroundColor: theme === "dark" ? "#111" : "white",
                    overflow: "hidden",
                  }}
                >
                  <textarea
                    id="message"
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "120px",
                      padding: "12px",
                      border: "none",
                      backgroundColor: theme === "dark" ? "#111" : "white",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  ></textarea>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      borderTop: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      gap: "10px",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      style={{
                        fontSize: "18px",
                        cursor: "pointer",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                      onClick={handleIconClick}
                    >
                      <FaPaperclip />
                    </motion.div>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
                    {selectedFile ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          fontSize: "14px",
                          color: theme === "dark" ? "#cccccc" : "#555",
                        }}
                      >
                        {selectedFile}
                      </motion.span>
                    ) : (
                      <span
                        style={{
                          fontSize: "14px",
                          color: theme === "dark" ? "#666" : "#888",
                        }}
                      >
                        Add file
                      </span>
                    )}
                  </div>
                </div>
                {formErrors.message && (
                  <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.message}</p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#3a2e8a" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                type="submit"
                disabled={formSubmitting}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: formSubmitting ? "#4a4a6a" : "#2a1e7a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: formSubmitting ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {formSubmitting ? (
                  <>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTop: "2px solid white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                    <style>
                      {`
                        @keyframes spin {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                      `}
                    </style>
                    Submitting...
                  </>
                ) : (
                  "Submit Message"
                )}
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                padding: "32px",
                maxWidth: "400px",
                width: "100%",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <FaCheck size={32} color="white" />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                }}
              >
                Message Sent Successfully!
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "24px",
                  color: theme === "dark" ? "#cccccc" : "#4b5563",
                }}
              >
                Thank you for contacting us. We've received your message and will get back to you soon.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSuccessModal(false)}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#2a1e7a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default ContactScreen


