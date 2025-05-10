"use client"

import { useState, useRef, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useTheme } from "../../components/ThemeProvider"
import { useNavigate } from "react-router-dom"
import bannerImage from "../../assets/church.jpg"

import {
  FaYoutube,
  FaFacebook,
  FaPlay,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUsers,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaComment,
  FaShare,
  FaPray,
  FaFileAlt,
  FaPaperPlane,
  FaSmile,
  FaHandsHelping,
  FaFireAlt,
  FaRegSadTear,
  FaChevronRight,
  FaChevronLeft,
  FaCheck,
  FaVideo,
  FaGlobe,
} from "react-icons/fa"

// Stream sources
const streamSources = [
  {
    id: "youtube",
    name: "YouTube Live",
    icon: <FaYoutube size={24} />,
    color: "#FF0000",
    embedUrl: "https://www.youtube.com/embed/qxoIzmzQrgM?autoplay=1&mute=0",  
    description: "Watch our service on YouTube with live chat",
  },
  {
    id: "facebook",
    name: "Facebook Live",
    icon: <FaFacebook size={24} />,
    color: "#1877F2",
    embedUrl:   
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fvideos%2F10153231379946729%2F&show_text=false",
    description: "Join us on Facebook and interact with our community",
  },
  {
    id: "inapp",
    name: "In-App Stream",
    icon: <FaPlay size={24} />,
    color: "#2a1e7a",
    embedUrl: "https://player.vimeo.com/video/76979871?h=8272103f6e",
    description: "Our dedicated streaming platform with enhanced features",
  },
]

// Reaction options
const reactionOptions = [
  { id: "amen", icon: <FaPray />, label: "Amen", color: "#f59e0b" },
  { id: "praise", icon: <FaHandsHelping />, label: "Praise God", color: "#10b981" },
  { id: "fire", icon: <FaFireAlt />, label: "Fire", color: "#ef4444" },
  { id: "heart", icon: <FaHeart />, label: "Love", color: "#ec4899" },
  { id: "sad", icon: <FaRegSadTear />, label: "Need Prayer", color: "#6366f1" },
]

// Sample comments
const sampleComments = [
  {
    id: 1,
    user: "Sister Mary",
    message: "Amen! This message is exactly what I needed today.",
    timestamp: "2 minutes ago",
    reactions: { amen: 5, praise: 2 },
  },
  {
    id: 2,
    user: "Brother James",
    message: "Praise God for this powerful word! My faith is strengthened.",
    timestamp: "5 minutes ago",
    reactions: { praise: 8, fire: 3 },
  },
  {
    id: 3,
    user: "Pastor Daniel",
    message: "Let's continue to pray for those who are sick in our congregation.",
    timestamp: "10 minutes ago",
    reactions: { amen: 12, heart: 7 },
  },
  {
    id: 4,
    user: "Sister Elizabeth",
    message: "I'm receiving my healing right now in Jesus' name!",
    timestamp: "12 minutes ago",
    reactions: { praise: 10, fire: 5 },
  },
  {
    id: 5,
    user: "Brother Michael",
    message: "The presence of God is so strong even through this livestream!",
    timestamp: "15 minutes ago",
    reactions: { amen: 15, heart: 8 },
  },
]

const LiveStreamScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
  const { theme } = useTheme()
  const navigate = useNavigate()

  // State variables
  const [showLoginModal, setShowLoginModal] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedStream, setSelectedStream] = useState(null)
  const [showStreamOptions, setShowStreamOptions] = useState(true)
  const [showComments, setShowComments] = useState(true)
  const [showTestimonyForm, setShowTestimonyForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [comments, setComments] = useState(sampleComments)
  const [newComment, setNewComment] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [activeTab, setActiveTab] = useState("comments")

  // Form data
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    audienceSize: "1",
    expectations: "",
  })

  const [testimonyData, setTestimonyData] = useState({
    name: "",
    email: "",
    title: "",
    testimony: "",
    sharePublicly: false,
  })

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Refs
  const commentsRef = useRef(null)
  const streamContainerRef = useRef(null)

  // Check if user is already logged in
  useEffect(() => {
    const storedUserData = localStorage.getItem("livestreamUserData")
    if (storedUserData) {
      setIsLoggedIn(true)
      setShowLoginModal(false)
    }
  }, [])

  // Scroll to bottom of comments when new comments are added
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight
    }
  }, [comments])

  // Handle login form input change
  const handleLoginInputChange = (e) => {
    const { id, value, type, checked } = e.target
    setLoginData({
      ...loginData,
      [id]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: null,
      })
    }
  }

  // Handle testimony form input change
  const handleTestimonyInputChange = (e) => {
    const { id, value, type, checked } = e.target
    setTestimonyData({
      ...testimonyData,
      [id]: type === "checkbox" ? checked : value,
    })
  }

  // Handle contact form input change
  const handleContactInputChange = (e) => {
    const { id, value } = e.target
    setContactData({
      ...contactData,
      [id]: value,
    })
  }

  // Validate login form
  const validateLoginForm = () => {
    const errors = {}

    if (!loginData.name.trim()) errors.name = "Name is required"
    if (!loginData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "Email is invalid"
    }
    if (!loginData.phone.trim()) errors.phone = "Phone is required"
    if (!loginData.location.trim()) errors.location = "Location is required"
    if (!loginData.password.trim()) errors.password = "Password is required"

    return errors
  }

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault()

    const errors = validateLoginForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Store user data in localStorage
      localStorage.setItem("livestreamUserData", JSON.stringify(loginData))
      setIsLoggedIn(true)
      setShowLoginModal(false)
      setIsSubmitting(false)
    }, 1500)
  }

  // Handle stream selection
  const handleStreamSelect = (stream) => {
    setSelectedStream(stream)
    setShowStreamOptions(false)
  }

  // Handle back to stream options
  const handleBackToOptions = () => {
    setSelectedStream(null)
    setShowStreamOptions(true)
  }

  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj = {
      id: comments.length + 1,
      user: loginData.name || "Anonymous",
      message: newComment,
      timestamp: "Just now",
      reactions: {},
    }

    setComments([...comments, newCommentObj])
    setNewComment("")
  }

  // Handle reaction to a comment
  const handleReaction = (commentId, reactionType) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          const updatedReactions = { ...comment.reactions }
          updatedReactions[reactionType] = (updatedReactions[reactionType] || 0) + 1
          return { ...comment, reactions: updatedReactions }
        }
        return comment
      }),
    )
  }

  // Handle testimony submission
  const handleTestimonySubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowTestimonyForm(false)
      setSuccessMessage("Your testimony has been submitted successfully! Thank you for sharing.")
      setShowSuccessModal(true)
      setTestimonyData({
        name: "",
        email: "",
        title: "",
        testimony: "",
        sharePublicly: false,
      })
    }, 1500)
  }

  // Handle contact form submission
  const handleContactSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowContactForm(false)
      setSuccessMessage("Your message has been sent successfully! We'll get back to you soon.")
      setShowSuccessModal(true)
      setContactData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

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
            height: "300px",
            overflow: "hidden",
            marginTop: "80px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundColor: "rgba(42, 30, 122, 0.8)",
              backgroundPosition: "center",
              filter: "brightness(0.6)",
            }}
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
              maxWidth: "800px",
            }}
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                fontSize: isMobile ? "32px" : "48px",
                fontWeight: "bold",
                marginBottom: "16px",
                color: "#f59e0b",
              }}
            >
              LIVE STREAM
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                fontSize: isMobile ? "16px" : "18px",
                lineHeight: 1.6,
                marginBottom: "32px",
              }}
            >
              Join us for our live service and experience the presence of God wherever you are.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                justifyContent: "center",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#3a2e8a" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px 28px",
                  backgroundColor: "#2a1e7a",
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
                onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
              >
                <FaPlay /> Watch Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#e08c00" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px 28px",
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
                onClick={() => setShowTestimonyForm(true)}
              >
                <FaFileAlt /> Share Your Testimony
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Live Stream Section */}
        <section
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {showStreamOptions && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    textAlign: "center",
                    marginBottom: "16px",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Choose Your Streaming Platform
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                    marginBottom: "40px",
                    color: theme === "dark" ? "#cccccc" : "#4b5563",
                    maxWidth: "800px",
                    margin: "0 auto 40px",
                  }}
                >
                  Select your preferred platform to watch our live service. Each platform offers different ways to
                  interact with our community.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                    gap: "24px",
                  }}
                >
                  {streamSources.map((source, index) => (
                    <motion.div
                      key={source.id}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                      style={{
                        backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      }}
                      onClick={() => handleStreamSelect(source)}
                    >
                      <div
                        style={{
                          height: "200px",
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: source.color,
                          fontSize: "64px",
                        }}
                      >
                        {source.icon}
                      </div>

                      <div style={{ padding: "20px" }}>
                        <h3
                          style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            marginBottom: "8px",
                            color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          }}
                        >
                          {source.name}
                        </h3>
                        <p
                          style={{
                            fontSize: "14px",
                            color: theme === "dark" ? "#cccccc" : "#4b5563",
                            marginBottom: "16px",
                            lineHeight: 1.6,
                          }}
                        >
                          {source.description}
                        </p>
                        <motion.div
                          whileHover={{ x: 5 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: source.color,
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          Watch Stream <FaChevronRight size={12} />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {selectedStream && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: "24px",
                }}
              >
                {/* Stream Player */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    flex: showComments ? "1 1 65%" : "1 1 100%",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                      borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleBackToOptions}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      <FaChevronLeft /> Back to Options
                    </motion.button>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: selectedStream.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "16px",
                        }}
                      >
                        {selectedStream.icon}
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                        }}
                      >
                        {selectedStream.name}
                      </h3>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowComments(!showComments)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {showComments ? "Hide Comments" : "Show Comments"}
                    </motion.button>
                  </div>

                  <div
                    ref={streamContainerRef}
                    style={{
                      position: "relative",
                      paddingTop: "56.25%", // 16:9 aspect ratio
                      width: "100%",
                      backgroundColor: "#000",
                    }}
                  >
                    <iframe
                      src={selectedStream.embedUrl}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Live Stream"
                    ></iframe>
                  </div>

                  <div
                    style={{
                      padding: "16px",
                      backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                      borderTop: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      {reactionOptions.map((reaction) => (
                        <motion.button
                          key={reaction.id}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 12px",
                            backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                            color: reaction.color,
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          {reaction.icon} {reaction.label}
                        </motion.button>
                      ))}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                      }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowTestimonyForm(true)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 12px",
                          backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        <FaFileAlt /> Testify
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowContactForm(true)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 12px",
                          backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        <FaEnvelope /> Contact
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 12px",
                          backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                      >
                        <FaShare /> Share
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Comments Section */}
                {showComments && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      flex: "1 1 35%",
                      backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: isMobile ? "400px" : "600px",
                    }}
                  >
                    <div
                      style={{
                        padding: "16px",
                        borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginBottom: "16px",
                        }}
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveTab("comments")}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor:
                              activeTab === "comments" ? (theme === "dark" ? "#2a1e7a" : "#e9ecef") : "transparent",
                            color:
                              activeTab === "comments"
                                ? theme === "dark"
                                  ? "#f59e0b"
                                  : "#2a1e7a"
                                : theme === "dark"
                                  ? "#cccccc"
                                  : "#4b5563",
                            border: `1px solid ${
                              activeTab === "comments"
                                ? theme === "dark"
                                  ? "#2a1e7a"
                                  : "#2a1e7a"
                                : theme === "dark"
                                  ? "#333"
                                  : "#e5e7eb"
                            }`,
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: activeTab === "comments" ? "500" : "normal",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <FaComment /> Comments
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveTab("prayers")}
                          style={{
                            flex: 1,
                            padding: "8px",
                            backgroundColor:
                              activeTab === "prayers" ? (theme === "dark" ? "#2a1e7a" : "#e9ecef") : "transparent",
                            color:
                              activeTab === "prayers"
                                ? theme === "dark"
                                  ? "#f59e0b"
                                  : "#2a1e7a"
                                : theme === "dark"
                                  ? "#cccccc"
                                  : "#4b5563",
                            border: `1px solid ${
                              activeTab === "prayers"
                                ? theme === "dark"
                                  ? "#2a1e7a"
                                  : "#2a1e7a"
                                : theme === "dark"
                                  ? "#333"
                                  : "#e5e7eb"
                            }`,
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: activeTab === "prayers" ? "500" : "normal",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          <FaPray /> Prayer Requests
                        </motion.button>
                      </div>

                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          marginBottom: "8px",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        {activeTab === "comments" ? "Live Chat" : "Prayer Requests"}
                      </h3>
                      <p
                        style={{
                          fontSize: "14px",
                          color: theme === "dark" ? "#cccccc" : "#4b5563",
                        }}
                      >
                        {activeTab === "comments"
                          ? "Join the conversation with our community"
                          : "Share your prayer needs with us"}
                      </p>
                    </div>

                    <div
                      ref={commentsRef}
                      style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      {activeTab === "comments" &&
                        comments.map((comment) => (
                          <div
                            key={comment.id}
                            style={{
                              backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
                              borderRadius: "8px",
                              padding: "12px",
                              border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "8px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                                  }}
                                >
                                  <FaUser size={14} />
                                </div>
                                <div>
                                  <p
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      color: theme === "dark" ? "#ffffff" : "#000000",
                                    }}
                                  >
                                    {comment.user}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: theme === "dark" ? "#999" : "#666",
                                    }}
                                  >
                                    {comment.timestamp}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <p
                              style={{
                                fontSize: "14px",
                                color: theme === "dark" ? "#cccccc" : "#4b5563",
                                marginBottom: "12px",
                                lineHeight: 1.5,
                              }}
                            >
                              {comment.message}
                            </p>

                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                              }}
                            >
                              {Object.entries(comment.reactions || {}).map(([type, count]) => (
                                <div
                                  key={type}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    padding: "4px 8px",
                                    backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    color:
                                      type === "amen"
                                        ? "#f59e0b"
                                        : type === "praise"
                                          ? "#10b981"
                                          : type === "fire"
                                            ? "#ef4444"
                                            : type === "heart"
                                              ? "#ec4899"
                                              : "#6366f1",
                                  }}
                                >
                                  {type === "amen" ? (
                                    <FaPray size={12} />
                                  ) : type === "praise" ? (
                                    <FaHandsHelping size={12} />
                                  ) : type === "fire" ? (
                                    <FaFireAlt size={12} />
                                  ) : type === "heart" ? (
                                    <FaHeart size={12} />
                                  ) : (
                                    <FaRegSadTear size={12} />
                                  )}
                                  {count}
                                </div>
                              ))}

                              <div
                                style={{
                                  display: "flex",
                                  gap: "4px",
                                }}
                              >
                                {reactionOptions.slice(0, 3).map((reaction) => (
                                  <motion.button
                                    key={reaction.id}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleReaction(comment.id, reaction.id)}
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      color: reaction.color,
                                      cursor: "pointer",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: "24px",
                                      height: "24px",
                                      borderRadius: "50%",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {reaction.icon}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}

                      {activeTab === "prayers" && (
                        <div
                          style={{
                            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
                            borderRadius: "8px",
                            padding: "16px",
                            border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                            textAlign: "center",
                          }}
                        >
                          <FaPray
                            size={32}
                            style={{
                              color: "#f59e0b",
                              marginBottom: "16px",
                            }}
                          />
                          <h3
                            style={{
                              fontSize: "18px",
                              fontWeight: "600",
                              marginBottom: "8px",
                              color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                            }}
                          >
                            Prayer Requests
                          </h3>
                          <p
                            style={{
                              fontSize: "14px",
                              color: theme === "dark" ? "#cccccc" : "#4b5563",
                              marginBottom: "16px",
                              lineHeight: 1.6,
                            }}
                          >
                            Share your prayer needs with us, and our prayer team will lift your requests to God.
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#3a2e8a" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowContactForm(true)}
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#2a1e7a",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "500",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              margin: "0 auto",
                            }}
                          >
                            <FaPray /> Submit Prayer Request
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        padding: "16px",
                        borderTop: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      }}
                    >
                      <form onSubmit={handleCommentSubmit}>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder={
                              activeTab === "comments" ? "Type your message..." : "Type your prayer request..."
                            }
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            style={{
                              flex: 1,
                              padding: "12px",
                              borderRadius: "4px",
                              border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                              backgroundColor: theme === "dark" ? "#111" : "white",
                              color: theme === "dark" ? "#ffffff" : "#000000",
                              fontSize: "14px",
                            }}
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            style={{
                              padding: "12px",
                              backgroundColor: "#2a1e7a",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaPaperPlane />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            style={{
                              padding: "12px",
                              backgroundColor: theme === "dark" ? "#1a1a1a" : "#e9ecef",
                              color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                              border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                              borderRadius: "4px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaSmile />
                          </motion.button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </section>

        {/* Service Schedule Section */}
        <section
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.1,
              filter: "blur(8px)",
            }}
          />

          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "28px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "16px",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              Upcoming Live Services
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "16px",
                textAlign: "center",
                marginBottom: "40px",
                color: theme === "dark" ? "#cccccc" : "#4b5563",
                maxWidth: "800px",
                margin: "0 auto 40px",
              }}
            >
              Join us for our upcoming live services and experience the presence of God wherever you are.
            </motion.p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              {[
                {
                  title: "Sunday Service",
                  time: "10:30 AM",
                  date: "Every Sunday",
                  description: "Join us for our weekly Sunday service with Pastor Joe Agbaje.",
                  icon: <FaVideo />,
                  color: "#f59e0b",
                },
                {
                  title: "Midweek Service",
                  time: "6:00 PM",
                  date: "Every Wednesday",
                  description: "Midweek refreshing with the Word and worship.",
                  icon: <FaVideo />,
                  color: "#10b981",
                },
                {
                  title: "Prayer Meeting",
                  time: "6:00 PM",
                  date: "Every Friday",
                  description: "Join our corporate prayer meeting for spiritual breakthrough.",
                  icon: <FaPray />,
                  color: "#3b82f6",
                },
                {
                  title: "Healing Streams",
                  time: "7:00 PM",
                  date: "Last Friday of the Month",
                  description: "Special healing service with testimonies and prayers for the sick.",
                  icon: <FaHandsHelping />,
                  color: "#8b5cf6",
                },
                {
                  title: "Youth Service",
                  time: "4:00 PM",
                  date: "Second Saturday of the Month",
                  description: "Special service for the youth with engaging activities and teachings.",
                  icon: <FaUsers />,
                  color: "#ef4444",
                },
                {
                  title: "Global Communion Service",
                  time: "10:00 AM",
                  date: "First Sunday of the Month",
                  description: "Join us for our monthly communion service with Pastor Chris.",
                  icon: <FaGlobe />,
                  color: "#0891b2",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    borderRadius: "8px",
                    padding: "24px",
                    boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: service.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "20px",
                      marginBottom: "16px",
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "4px",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginBottom: "12px",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    {service.time} • {service.date}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: theme === "dark" ? "#cccccc" : "#4b5563",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                    }}
                  >
                    {service.description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#3a2e8a" }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#2a1e7a",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaCalendarAlt /> Add to Calendar
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
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
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              zIndex: 9999,
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                maxWidth: "500px",
                width: "100%",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                margin: "40px auto",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Welcome to Live Stream
                </h3>
              </div>

              <div style={{ padding: "24px", overflowY: "auto" }}>
                <p
                  style={{
                    fontSize: "16px",
                    marginBottom: "24px",
                    color: theme === "dark" ? "#cccccc" : "#4b5563",
                    lineHeight: 1.6,
                  }}
                >
                  Please provide your details to access our live stream service. Your information helps us serve you
                  better and stay connected.
                </p>

                <form onSubmit={handleLoginSubmit}>
                  <div
                    style={{
                      marginBottom: "16px",
                    }}
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
                      Full Name*
                    </label>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "12px",
                          transform: "translateY(-50%)",
                          color: theme === "dark" ? "#666" : "#999",
                        }}
                      >
                        <FaUser size={16} />
                      </div>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={loginData.name}
                        onChange={handleLoginInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 40px",
                          borderRadius: "4px",
                          border: `1px solid ${formErrors.name ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    {formErrors.name && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.name}</p>
                    )}
                  </div>

                  <div
                    style={{
                      marginBottom: "16px",
                    }}
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
                      Email Address*
                    </label>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "12px",
                          transform: "translateY(-50%)",
                          color: theme === "dark" ? "#666" : "#999",
                        }}
                      >
                        <FaEnvelope size={16} />
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={loginData.email}
                        onChange={handleLoginInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 40px",
                          borderRadius: "4px",
                          border: `1px solid ${formErrors.email ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    {formErrors.email && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.email}</p>
                    )}
                  </div>

                  <div
                    style={{
                      marginBottom: "16px",
                    }}
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
                      Phone Number*
                    </label>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "12px",
                          transform: "translateY(-50%)",
                          color: theme === "dark" ? "#666" : "#999",
                        }}
                      >
                        <FaPhone size={16} />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={loginData.phone}
                        onChange={handleLoginInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 40px",
                          borderRadius: "4px",
                          border: `1px solid ${formErrors.phone ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    {formErrors.phone && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.phone}</p>
                    )}
                  </div>

                  <div
                    style={{
                      marginBottom: "16px",
                    }}
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
                      Location*
                    </label>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "12px",
                          transform: "translateY(-50%)",
                          color: theme === "dark" ? "#666" : "#999",
                        }}
                      >
                        <FaMapMarkerAlt size={16} />
                      </div>
                      <input
                        id="location"
                        type="text"
                        placeholder="Your city and country"
                        value={loginData.location}
                        onChange={handleLoginInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 40px",
                          borderRadius: "4px",
                          border: `1px solid ${formErrors.location ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                        }}
                      />
                    </div>
                    {formErrors.location && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.location}</p>
                    )}
                  </div>

                  <div
                    style={{
                      marginBottom: "16px",
                    }}
                  >
                    <label
                      htmlFor="password"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Password*
                    </label>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "12px",
                          transform: "translateY(-50%)",
                          color: theme === "dark" ? "#666" : "#999",
                        }}
                      >
                        <FaLock size={16} />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={loginData.password}
                        onChange={handleLoginInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 40px",
                          borderRadius: "4px",
                          border: `1px solid ${formErrors.password ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "12px",
                          transform: "translateY(-50%)",
                          color: theme === "dark" ? "#666" : "#999",
                          cursor: "pointer",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                      </div>
                    </div>
                    {formErrors.password && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.password}</p>
                    )}
                  </div>

                  <div
                    style={{
                      marginBottom: "16px",
                    }}
                  >
                    <label
                      htmlFor="audienceSize"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Audience Size
                    </label>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "12px",
                          transform: "translateY(-50%)",
                          color: theme === "dark" ? "#666" : "#999",
                        }}
                      >
                        <FaUsers size={16} />
                      </div>
                      <select
                        id="audienceSize"
                        value={loginData.audienceSize}
                        onChange={handleLoginInputChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 40px",
                          borderRadius: "4px",
                          border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          fontSize: "14px",
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${
                            theme === "dark" ? "white" : "black"
                          }' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px",
                        }}
                      >
                        <option value="1">Just me</option>
                        <option value="2-5">2-5 people</option>
                        <option value="6-10">6-10 people</option>
                        <option value="11-20">11-20 people</option>
                        <option value="20+">More than 20 people</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      marginBottom: "24px",
                    }}
                  >
                    <label
                      htmlFor="expectations"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Expectations (Optional)
                    </label>
                    <textarea
                      id="expectations"
                      placeholder="What are you expecting from today's service?"
                      value={loginData.expectations}
                      onChange={handleLoginInputChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        fontSize: "14px",
                        minHeight: "60px",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#3a2e8a" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "14px",
                      backgroundColor: isSubmitting ? "#4a4a6a" : "#2a1e7a",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isSubmitting ? (
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
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaPlay /> Proceed to Live Stream
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimony Form Modal */}
      <AnimatePresence>
        {showTestimonyForm && (
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
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              zIndex: 9999,
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                maxWidth: "600px",
                width: "100%",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                margin: "40px auto",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Share Your Testimony
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowTestimonyForm(false)}
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

              <div style={{ padding: "24px", overflowY: "auto" }}>
                <p
                  style={{
                    fontSize: "16px",
                    marginBottom: "24px",
                    color: theme === "dark" ? "#cccccc" : "#4b5563",
                    lineHeight: 1.6,
                  }}
                >
                  We'd love to hear about what God has done in your life. Your testimony can inspire and encourage
                  others.
                </p>

                <form onSubmit={handleTestimonySubmit}>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "16px",
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <div style={{ flex: 1 }}>
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
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={testimonyData.name}
                        onChange={handleTestimonyInputChange}
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
                    </div>
                    <div style={{ flex: 1 }}>
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
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={testimonyData.email}
                        onChange={handleTestimonyInputChange}
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
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
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
                      Testimony Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      placeholder="E.g., Healed from Cancer"
                      value={testimonyData.title}
                      onChange={handleTestimonyInputChange}
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
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label
                      htmlFor="testimony"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Your Testimony
                    </label>
                    <textarea
                      id="testimony"
                      placeholder="Share your testimony in detail..."
                      value={testimonyData.testimony}
                      onChange={handleTestimonyInputChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        fontSize: "14px",
                        minHeight: "150px",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        id="sharePublicly"
                        checked={testimonyData.sharePublicly}
                        onChange={handleTestimonyInputChange}
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: theme === "dark" ? "#cccccc" : "#4b5563",
                        }}
                      >
                        I consent to share my testimony publicly on the church website and social media
                      </span>
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#3a2e8a" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "14px",
                      backgroundColor: isSubmitting ? "#4a4a6a" : "#2a1e7a",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isSubmitting ? (
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaFileAlt /> Submit Testimony
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
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
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              zIndex: 9999,
              padding: "20px",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                maxWidth: "600px",
                width: "100%",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                margin: "40px auto",
                maxHeight: "90vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Contact Us
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowContactForm(false)}
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

              <div style={{ padding: "24px", overflowY: "auto" }}>
                <p
                  style={{
                    fontSize: "16px",
                    marginBottom: "24px",
                    color: theme === "dark" ? "#cccccc" : "#4b5563",
                    lineHeight: 1.6,
                  }}
                >
                  Have a question or need prayer? Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleContactSubmit}>
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "16px",
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <div style={{ flex: 1 }}>
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
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={contactData.name}
                        onChange={handleContactInputChange}
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
                    </div>
                    <div style={{ flex: 1 }}>
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
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={contactData.email}
                        onChange={handleContactInputChange}
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
                    </div>
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label
                      htmlFor="subject"
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={contactData.subject}
                      onChange={handleContactInputChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        fontSize: "14px",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${
                          theme === "dark" ? "white" : "black"
                        }' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="">Select a subject</option>
                      <option value="Prayer Request">Prayer Request</option>
                      <option value="Technical Issue">Technical Issue</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Counseling">Counseling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
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
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Type your message here..."
                      value={contactData.message}
                      onChange={handleContactInputChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "4px",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        fontSize: "14px",
                        minHeight: "150px",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#3a2e8a" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "14px",
                      backgroundColor: isSubmitting ? "#4a4a6a" : "#2a1e7a",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isSubmitting ? (
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
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane /> Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
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
                maxWidth: "500px",
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
                  color: "white",
                  fontSize: "32px",
                }}
              >
                <FaCheck />
              </div>
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                }}
              >
                Success!
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "24px",
                  color: theme === "dark" ? "#cccccc" : "#4b5563",
                  lineHeight: 1.7,
                }}
              >
                {successMessage}
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

export default LiveStreamScreen

function FaCalendarAlt(props) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
    </svg>
  )
}


















// //  import {useState} from 'react';


// // const LiveStream = () => {

// // const [count, setCount] = useState(0);

// // return(

// //   <div>
// //     <p>Count: {count}</p>
// //     <button onClick={() => setCount(count + 1)}>add</button>
// //   </div>
// // );
// // }

// // export default LiveStream;







// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import StreamViewer from './LiveStreamView';
// // import CommentSection from './LiveStreamComment';

// // const LiveStream = () => {
// //   const [activeStream, setActiveStream] = useState(null);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [userDetails, setUserDetails] = useState({
// //     name: '',
// //     phone: '',
// //     email: '',
// //     location: '',
// //     audienceSize: ''
// //   });

// //   // Check if the user is logged in (if details are stored in localStorage)
// //   useEffect(() => {
// //     const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
// //     if (storedUserDetails) {
// //       setUserDetails(storedUserDetails);
// //       setIsLoggedIn(true); // User is logged in
// //     }
// //   }, []);

// //   // Fetch the active stream when the user is logged in
// //   useEffect(() => {
// //     if (isLoggedIn) {
// //       fetchActiveStream();
// //     }
// //   }, [isLoggedIn]);

// //   const fetchActiveStream = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:8000/api/user/stream');
// //       setActiveStream(response.data);
// //     } catch (error) {
// //       console.error('Error fetching the active stream:', error);
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     setUserDetails({
// //       ...userDetails,
// //       [e.target.name]: e.target.value
// //     });
// //   };

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!userDetails.name || !userDetails.phone || !userDetails.email || !userDetails.location || !userDetails.audienceSize) {
// //       alert('Please fill in all fields.');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post('http://localhost:8000/api/user/login', userDetails);

// //       if (response.status === 201) {
// //         // Store the user details and token in localStorage
// //         localStorage.setItem('userDetails', JSON.stringify(response.data.user));
// //         setIsLoggedIn(true); // Allow access to the livestream
// //       } else {
// //         alert('Login failed. Please try again.');
// //       }
// //     } catch (error) {
// //       alert('An error occurred while submitting the form. Please try again.');
// //     }
// //   };

// //   if (!isLoggedIn) {
// //     return (
// //       <div style={styles.loginContainer}>
// //         <h2>Login to Access the Livestream</h2>
// //         <form onSubmit={handleFormSubmit} style={styles.form}>
// //           {/* Form fields here */}
// //         </form>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={styles.dashboard}>
// //       <h1>User Dashboard</h1>

// //       {/* StreamViewer Component */}
// //       {activeStream ? (
// //         <StreamViewer streamUrl={activeStream.streamUrl} />
// //       ) : (
// //         <p>No active stream available at the moment.</p>
// //       )}

// //       {/* CommentSection Component */}
// //       {activeStream && (
// //         <CommentSection streamId={activeStream._id} userName={userDetails.name} />
// //       )}
// //     </div>
// //   );
// // };
// // const styles = {
// //   dashboard: {
// //     padding: '20px',
// //     maxWidth: '100%',
// //     margin: '0 auto',
// //     backgroundColor: '#f0f0f0',
// //     borderRadius: '8px',
// //     textAlign: 'center',
// //   },
// //   loginContainer: {
// //     padding: '20px',
// //     maxWidth: '100%',
// //     margin: '0 auto',
// //     backgroundColor: '#ffffff',
// //     borderRadius: '8px',
// //     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
// //     textAlign: 'center',
// //     width: '100%',
// //     boxSizing: 'border-box',
// //   },
// //   form: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //   },
// //   formGroup: {
// //     marginBottom: '15px',
// //     width: '100%',
// //     maxWidth: '300px',
// //   },
// //   input: {
// //     width: '100%',
// //     padding: '10px',
// //     borderRadius: '4px',
// //     border: '1px solid #ccc',
// //   },
// //   submitButton: {
// //     padding: '10px 20px',
// //     backgroundColor: '#007BFF',
// //     color: '#fff',
// //     border: 'none',
// //     borderRadius: '4px',
// //     cursor: 'pointer',
// //     width: '100%',
// //     maxWidth: '300px',
// //   },
// // };

// // export default LiveStream;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import StreamViewer from './LiveStreamView';
// import LiveStreamComment from './LiveStreamComment';

// const LiveStream = () => {
//   const [activeStream, setActiveStream] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userDetails, setUserDetails] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     location: '',
//     audienceSize: ''
//   });

//   // Check if the user is logged in (if details are stored in localStorage)
//   useEffect(() => {
//     const storedUserDetails = localStorage.getItem('userDetails');
//     if (storedUserDetails) {
//       setIsLoggedIn(true); // User has provided details before
//     }
//   }, []);

//   // Fetch the active stream when the user is logged in
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchActiveStream();
//     }
//   }, [isLoggedIn]);

//   const fetchActiveStream = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/user/stream');
//       setActiveStream(response.data);
//     } catch (error) {
//       console.error('Error fetching the active stream:', error);
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setUserDetails({
//       ...userDetails,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle form submission (register and login user)
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Check if all fields are filled
//     if (!userDetails.name || !userDetails.phone || !userDetails.email || !userDetails.location || !userDetails.audienceSize) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     try {
//       // Register the user (this will log them in as well)
//       const response = await axios.post('http://localhost:8000/api/user/login', userDetails);

//       if (response.status === 201) {
//         // Store the user details and token in localStorage
//         localStorage.setItem('userDetails', JSON.stringify(userDetails));
//         setIsLoggedIn(true); // Allow access to the livestream
//       } else {
//         console.error('Failed to log in the user:', response.statusText);
//         alert('Login failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error submitting user details:', error);
//       alert('An error occurred while submitting the form. Please try again.');
//     }
//   };

//   // If user is not logged in, show the login form
//   if (!isLoggedIn) {
//     return (
//       <div style={styles.loginContainer}>
//         <h2>Login to Access the Livestream</h2>
//         <form onSubmit={handleFormSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={userDetails.name}
//               onChange={handleInputChange}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label>Phone:</label>
//             <input
//               type="tel"
//               name="phone"
//               value={userDetails.phone}
//               onChange={handleInputChange}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={userDetails.email}
//               onChange={handleInputChange}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label>Location:</label>
//             <input
//               type="text"
//               name="location"
//               value={userDetails.location}
//               onChange={handleInputChange}
//               required
//               style={styles.input}
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label>Audience Size:</label>
//             <input
//               type="number"
//               name="audienceSize"
//               value={userDetails.audienceSize}
//               onChange={handleInputChange}
//               required
//               style={styles.input}
//             />
//           </div>
//           <button type="submit" style={styles.submitButton}>Proceed to Livestream</button>
//         </form>
//       </div>
//     );
//   }

//   // If user is logged in, show the Livestream
//   return (
//     <div style={styles.dashboard}>
//       <h1>User Dashboard</h1>

//       {/* StreamViewer Component - Displays the YouTube stream */}
//       {activeStream ? (
//         <StreamViewer streamUrl={activeStream.streamUrl} />
//       ) : (
//         <p>No active stream available at the moment.</p>
//       )}


//       {/* Your stream player component */}
//       {/* <LiveStreamComment streamId={streamId} /> */}
  
//     </div>
//   );
// };

// // Responsive styling
// const styles = {
//   dashboard: {
//     padding: '20px',
//     maxWidth: '100%',
//     margin: '0 auto',
//     backgroundColor: '#f0f0f0',
//     borderRadius: '8px',
//     textAlign: 'center',
//   },
//   loginContainer: {
//     padding: '20px',
//     maxWidth: '100%',
//     margin: '0 auto',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     textAlign: 'center',
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   formGroup: {
//     marginBottom: '15px',
//     width: '100%',
//     maxWidth: '300px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//   },
//   submitButton: {
//     padding: '10px 20px',
//     backgroundColor: '#007BFF',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     width: '100%',
//     maxWidth: '300px',
//   },
// };

// export default LiveStream;
