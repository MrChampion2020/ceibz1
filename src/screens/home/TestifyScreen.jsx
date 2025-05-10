"use client"

import { useState, useRef, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useTheme } from "../../components/ThemeProvider"
import { useNavigate } from "react-router-dom"
import bannerImage from "../../assets/church.jpg"
import pastorjoe from "../../assets/pjoe.jpg"
import teens from "../../assets/lwfs.jpg"
import children from "../../assets/child.jpg"

import {
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
  FaCompress,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaQuoteRight,
  FaUpload,
  FaCheck,
  FaVideo,
  FaFileAlt,
  FaUser,
  FaSearch,
  FaFilter,
  FaShare,
  FaHeart,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"

const TestifyScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
  const { theme } = useTheme()
  const navigate = useNavigate()

  // State for testimonies
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTestimony, setSelectedTestimony] = useState(null)
  const [showTestimonyModal, setShowTestimonyModal] = useState(false)
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const [videoVolume, setVideoVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Refs
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const formRef = useRef(null)
  const fileInputRef = useRef(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "healing",
    testimony: "",
    videoFile: null,
    consentToShare: false,
  })
  const [formErrors, setFormErrors] = useState({})
  const [uploadedFileName, setUploadedFileName] = useState("")

  // Sample testimonies data
  const testimonies = [
    {
      id: 1,
      name: "Brother James Wilson",
      title: "Healed from Chronic Back Pain",
      category: "healing",
      testimony:
        "I had been suffering from chronic back pain for over 10 years. After Pastor Joe prayed for me during the Healing Streams service, I felt a warm sensation in my back, and the pain completely disappeared. It's been 6 months now, and I'm still pain-free. Glory to God!",
      date: "March 15, 2023",
      type: "text",
      image: pastorjoe,
      likes: 124,
    },
    {
      id: 2,
      name: "Sister Mary Johnson",
      title: "Financial Breakthrough",
      category: "financial",
      testimony:
        "After faithfully giving my tithes and offerings for a year, I experienced a miraculous financial breakthrough. I was offered a job that paid three times my previous salary, and I was able to clear all my debts within six months. God is faithful!",
      date: "January 8, 2023",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: teens,
      duration: "3:45",
      likes: 89,
      subtitles: [
        { start: 0, end: 5, text: "I want to thank God for His faithfulness in my life." },
        { start: 5, end: 10, text: "After faithfully giving my tithes and offerings for a year..." },
        { start: 10, end: 15, text: "I experienced a miraculous financial breakthrough." },
        { start: 15, end: 20, text: "I was offered a job that paid three times my previous salary." },
        { start: 20, end: 25, text: "And I was able to clear all my debts within six months." },
        { start: 25, end: 30, text: "God is faithful! I encourage everyone to trust in Him." },
      ],
    },
    {
      id: 3,
      name: "Brother Michael Smith",
      title: "Salvation Testimony",
      category: "salvation",
      testimony:
        "I was living a life of drugs and crime until a friend invited me to church. During the service, I felt God's presence so strongly that I broke down in tears. That day, I gave my life to Christ, and He has completely transformed me. I've been clean for two years now and am serving in the church's outreach ministry.",
      date: "November 20, 2022",
      type: "text",
      image: children,
      likes: 156,
    },
    {
      id: 4,
      name: "Sister Rebecca Okafor",
      title: "Healed from COVID-19",
      category: "healing",
      testimony:
        "I was diagnosed with severe COVID-19 and was hospitalized in critical condition. The doctors had little hope for my recovery. The church organized a prayer chain for me, and Pastor Joe led special prayers during the Sunday service. Within three days, my condition improved dramatically, and I was discharged a week later. The doctors called it a miracle!",
      date: "August 5, 2022",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: bannerImage,
      duration: "5:12",
      likes: 203,
      subtitles: [
        { start: 0, end: 5, text: "I want to thank God for healing me from COVID-19." },
        { start: 5, end: 10, text: "I was diagnosed with severe COVID-19 and was hospitalized in critical condition." },
        { start: 10, end: 15, text: "The doctors had little hope for my recovery." },
        { start: 15, end: 20, text: "The church organized a prayer chain for me..." },
        { start: 20, end: 25, text: "And Pastor Joe led special prayers during the Sunday service." },
        { start: 25, end: 30, text: "Within three days, my condition improved dramatically." },
        { start: 30, end: 35, text: "I was discharged a week later. The doctors called it a miracle!" },
      ],
    },
    {
      id: 5,
      name: "Brother Daniel Adeyemi",
      title: "Marriage Restoration",
      category: "family",
      testimony:
        "My marriage was on the brink of divorce after 12 years. My wife and I couldn't even stay in the same room without arguing. We attended the Marriage Restoration program at church, and through the counseling and prayers, God began to heal our relationship. Today, we're more in love than ever before and are now leading the couples' ministry in our cell group.",
      date: "June 12, 2022",
      type: "text",
      image: teens,
      likes: 178,
    },
    {
      id: 6,
      name: "Sister Jennifer Okoro",
      title: "Academic Excellence",
      category: "education",
      testimony:
        "I had failed my professional exams three times and was about to give up on my career. During a midweek service, Pastor Joe spoke about excellence and prayed specifically for those facing academic challenges. I applied the principles I learned and took the exam again. Not only did I pass, but I was among the top five performers nationwide!",
      date: "April 30, 2022",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: children,
      duration: "4:30",
      likes: 112,
      subtitles: [
        { start: 0, end: 5, text: "I want to testify about God's faithfulness in my academics." },
        { start: 5, end: 10, text: "I had failed my professional exams three times and was about to give up." },
        { start: 10, end: 15, text: "During a midweek service, Pastor Joe spoke about excellence..." },
        { start: 15, end: 20, text: "And prayed specifically for those facing academic challenges." },
        { start: 20, end: 25, text: "I applied the principles I learned and took the exam again." },
        { start: 25, end: 30, text: "Not only did I pass, but I was among the top five performers nationwide!" },
      ],
    },
  ]

  // Filter testimonies based on search and category
  const filteredTestimonies = testimonies.filter((testimony) => {
    const matchesSearch =
      testimony.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimony.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimony.testimony.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filterCategory === "all" || testimony.category === filterCategory

    const matchesType =
      activeTab === "all" ||
      (activeTab === "text" && testimony.type === "text") ||
      (activeTab === "video" && testimony.type === "video")

    return matchesSearch && matchesCategory && matchesType
  })

  // Pagination
  const testimoniesToShow = 4
  const totalPages = Math.ceil(filteredTestimonies.length / testimoniesToShow)
  const currentTestimonies = filteredTestimonies.slice(
    (currentPage - 1) * testimoniesToShow,
    currentPage * testimoniesToShow,
  )

  // Handle video playback
  useEffect(() => {
    if (videoRef.current && selectedTestimony && selectedTestimony.type === "video") {
      if (videoPlaying) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
          setVideoPlaying(false)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [videoPlaying, selectedTestimony])

  // Update video progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setVideoProgress(progress)
    }
  }

  // Handle video loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration)
      setVideoLoaded(true)
    }
  }

  // Handle video progress bar click
  const handleProgressBarClick = (e) => {
    if (videoRef.current && videoLoaded) {
      const progressBar = e.currentTarget
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
      const newTime = clickPosition * videoRef.current.duration
      videoRef.current.currentTime = newTime
      setVideoProgress(clickPosition * 100)
    }
  }

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVideoVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = videoVolume || 1
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && videoContainerRef.current) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Find current subtitle
  const getCurrentSubtitle = () => {
    if (!selectedTestimony || selectedTestimony.type !== "video" || !selectedTestimony.subtitles || !videoRef.current) {
      return null
    }

    const currentTime = videoRef.current.currentTime
    return selectedTestimony.subtitles.find((subtitle) => currentTime >= subtitle.start && currentTime <= subtitle.end)
  }

  // Open testimony modal
  const openTestimonyModal = (testimony) => {
    setSelectedTestimony(testimony)
    setShowTestimonyModal(true)
    setVideoPlaying(false)
    setVideoProgress(0)
    setVideoLoaded(false)
  }

  // Close testimony modal
  const closeTestimonyModal = () => {
    setShowTestimonyModal(false)
    setSelectedTestimony(null)
    setVideoPlaying(false)
  }

  // Scroll to form
  const scrollToForm = () => {
    setShowSubmitForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData({
      ...formData,
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith("video/")) {
        setFormData({
          ...formData,
          videoFile: file,
        })
        setUploadedFileName(file.name)
      } else {
        setFormErrors({
          ...formErrors,
          videoFile: "Please upload a valid video file",
        })
      }
    }
  }

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current.click()
  }

  // Validate form
  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    if (!formData.title.trim()) errors.title = "Title is required"
    if (!formData.testimony.trim()) errors.testimony = "Testimony is required"
    if (!formData.consentToShare) errors.consentToShare = "You must consent to share your testimony"

    return errors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccessModal(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        title: "",
        category: "healing",
        testimony: "",
        videoFile: null,
        consentToShare: false,
      })
      setUploadedFileName("")
    }, 2000)
  }

  // Categories for filter
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "healing", name: "Healing" },
    { id: "financial", name: "Financial Breakthrough" },
    { id: "salvation", name: "Salvation" },
    { id: "family", name: "Family & Marriage" },
    { id: "education", name: "Education" },
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
            height: "500px",
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
              TESTIMONIES
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
              "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not
              their lives unto the death." - Revelation 12:11
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
                onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
              >
                <FaVideo /> Watch Testimonies
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
                onClick={scrollToForm}
              >
                <FaFileAlt /> Share Your Testimony
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonies Filter Section */}
        <section
          style={{
            padding: isMobile ? "40px 20px" : "60px 40px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                marginBottom: "32px",
                gap: "16px",
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
                  color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                }}
              >
                Testimonies of Faith
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  display: "flex",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search testimonies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: "10px 16px 10px 40px",
                      borderRadius: "4px",
                      border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                      fontSize: "14px",
                      width: isMobile ? "100%" : "250px",
                    }}
                  />
                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "12px",
                      color: theme === "dark" ? "#666" : "#999",
                      fontSize: "16px",
                    }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                    color: theme === "dark" ? "white" : "#2a1e7a",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <FaFilter /> Filter
                  {showFilters ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </motion.button>
              </motion.div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    overflow: "hidden",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                      borderRadius: "8px",
                      padding: "20px",
                      boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            marginBottom: "12px",
                            color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          }}
                        >
                          Testimony Type
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                          }}
                        >
                          {["all", "text", "video"].map((type) => (
                            <motion.button
                              key={type}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setActiveTab(type)}
                              style={{
                                padding: "8px 16px",
                                backgroundColor:
                                  activeTab === type ? (theme === "dark" ? "#f59e0b" : "#2a1e7a") : "transparent",
                                color: activeTab === type ? "white" : theme === "dark" ? "#cccccc" : "#4b5563",
                                border: `1px solid ${
                                  activeTab === type
                                    ? activeTab === type
                                      ? theme === "dark"
                                        ? "#f59e0b"
                                        : "#2a1e7a"
                                      : "transparent"
                                    : theme === "dark"
                                      ? "#333"
                                      : "#e5e7eb"
                                }`,
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: activeTab === type ? "500" : "normal",
                                textTransform: "capitalize",
                              }}
                            >
                              {type === "all" ? "All Types" : `${type} Testimonies`}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            marginBottom: "12px",
                            color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          }}
                        >
                          Categories
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            flexWrap: "wrap",
                          }}
                        >
                          {categories.map((category) => (
                            <motion.button
                              key={category.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setFilterCategory(category.id)}
                              style={{
                                padding: "8px 16px",
                                backgroundColor:
                                  filterCategory === category.id
                                    ? theme === "dark"
                                      ? "#f59e0b"
                                      : "#2a1e7a"
                                    : "transparent",
                                color:
                                  filterCategory === category.id ? "white" : theme === "dark" ? "#cccccc" : "#4b5563",
                                border: `1px solid ${
                                  filterCategory === category.id
                                    ? filterCategory === category.id
                                      ? theme === "dark"
                                        ? "#f59e0b"
                                        : "#2a1e7a"
                                      : "transparent"
                                    : theme === "dark"
                                      ? "#333"
                                      : "#e5e7eb"
                                }`,
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: filterCategory === category.id ? "500" : "normal",
                              }}
                            >
                              {category.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Testimonies Grid */}
            {currentTestimonies.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(2, 1fr)",
                  gap: "24px",
                  marginBottom: "40px",
                }}
              >
                {currentTestimonies.map((testimony, index) => (
                  <motion.div
                    key={testimony.id}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    }}
                    onClick={() => openTestimonyModal(testimony)}
                  >
                    {testimony.type === "video" ? (
                      <div style={{ position: "relative", paddingTop: "56.25%" }}>
                        <img
                          src={testimony.thumbnail || "/placeholder.svg"}
                          alt={testimony.title}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              backdropFilter: "blur(5px)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaPlay color="white" size={20} />
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "12px",
                            right: "12px",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                          }}
                        >
                          {testimony.duration}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "200px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={testimony.image || "/placeholder.svg"}
                          alt={testimony.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "12px",
                            left: "12px",
                            backgroundColor: "#f59e0b",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            textTransform: "capitalize",
                          }}
                        >
                          {testimony.category}
                        </div>
                      </div>
                    )}

                    <div style={{ padding: "20px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          marginBottom: "8px",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        {testimony.title}
                      </h3>

                      <p
                        style={{
                          fontSize: "14px",
                          color: theme === "dark" ? "#cccccc" : "#4b5563",
                          marginBottom: "12px",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: 1.6,
                        }}
                      >
                        {testimony.testimony}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "16px",
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
                              overflow: "hidden",
                              backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                            }}
                          >
                            <FaUser size={16} />
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme === "dark" ? "#ffffff" : "#000000",
                              }}
                            >
                              {testimony.name}
                            </p>
                            <p
                              style={{
                                fontSize: "12px",
                                color: theme === "dark" ? "#999" : "#666",
                              }}
                            >
                              {testimony.date}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                            fontSize: "14px",
                          }}
                        >
                          <FaHeart size={14} />
                          <span>{testimony.likes}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                  borderRadius: "8px",
                  marginBottom: "40px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  No testimonies found
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: theme === "dark" ? "#cccccc" : "#4b5563",
                    marginBottom: "24px",
                  }}
                >
                  Try adjusting your filters or search query
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchQuery("")
                    setFilterCategory("all")
                    setActiveTab("all")
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#2a1e7a",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "32px",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    backgroundColor:
                      currentPage === 1
                        ? theme === "dark"
                          ? "#333"
                          : "#e5e7eb"
                        : theme === "dark"
                          ? "#2a1e7a"
                          : "#e9ecef",
                    color:
                      currentPage === 1 ? (theme === "dark" ? "#666" : "#999") : theme === "dark" ? "white" : "#2a1e7a",
                    border: "none",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <FaChevronLeft size={14} />
                </motion.button>

                {[...Array(totalPages)].map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentPage(index + 1)}
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      backgroundColor:
                        currentPage === index + 1 ? (theme === "dark" ? "#f59e0b" : "#2a1e7a") : "transparent",
                      color: currentPage === index + 1 ? "white" : theme === "dark" ? "#cccccc" : "#4b5563",
                      border: `1px solid ${
                        currentPage === index + 1 ? "transparent" : theme === "dark" ? "#333" : "#e5e7eb"
                      }`,
                      cursor: "pointer",
                      fontWeight: currentPage === index + 1 ? "600" : "normal",
                    }}
                  >
                    {index + 1}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  style={{
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "4px",
                    backgroundColor:
                      currentPage === totalPages
                        ? theme === "dark"
                          ? "#333"
                          : "#e5e7eb"
                        : theme === "dark"
                          ? "#2a1e7a"
                          : "#e9ecef",
                    color:
                      currentPage === totalPages
                        ? theme === "dark"
                          ? "#666"
                          : "#999"
                        : theme === "dark"
                          ? "white"
                          : "#2a1e7a",
                    border: "none",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  }}
                >
                  <FaChevronRight size={14} />
                </motion.button>
              </div>
            )}
          </div>
        </section>

        {/* Featured Testimony Section */}
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
              maxWidth: "1000px",
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
                marginBottom: "40px",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              Featured Testimony
            </motion.h2>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                backgroundColor: theme === "dark" ? "rgba(26, 26, 26, 0.8)" : "rgba(255, 255, 255, 0.9)",
                borderRadius: "12px",
                padding: isMobile ? "32px 24px" : "48px",
                backdropFilter: "blur(10px)",
                boxShadow: theme === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.4)" : "0 8px 32px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#f59e0b",
                  fontSize: "32px",
                  marginBottom: "24px",
                }}
              >
                <FaQuoteLeft />
              </div>

              <p
                style={{
                  fontSize: isMobile ? "18px" : "22px",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "32px",
                  color: theme === "dark" ? "#ffffff" : "#333333",
                }}
              >
                I was diagnosed with stage 4 cancer and given 3 months to live. Our church organized a prayer chain, and
                Pastor Joe led special prayers for me. During one of the services, I felt a warm sensation throughout my
                body. Two weeks later, I went for a check-up, and the doctors were shocked to find no trace of cancer in
                my body. It's been 5 years now, and I'm still cancer-free. God is still in the miracle-working business!
              </p>

              <div
                style={{
                  color: "#f59e0b",
                  fontSize: "32px",
                  marginBottom: "24px",
                  textAlign: "right",
                }}
              >
                <FaQuoteRight />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "16px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    marginBottom: "16px",
                    border: `3px solid ${theme === "dark" ? "#f59e0b" : "#2a1e7a"}`,
                  }}
                >
                  <img
                    src={pastorjoe || "/placeholder.svg"}
                    alt="Sister Elizabeth Okonkwo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    marginBottom: "4px",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Sister Elizabeth Okonkwo
                </h3>

                <p
                  style={{
                    fontSize: "14px",
                    color: theme === "dark" ? "#cccccc" : "#666666",
                    marginBottom: "16px",
                  }}
                >
                  Church Member since 2015
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    openTestimonyModal({
                      id: 7,
                      name: "Sister Elizabeth Okonkwo",
                      title: "Healed from Stage 4 Cancer",
                      category: "healing",
                      testimony:
                        "I was diagnosed with stage 4 cancer and given 3 months to live. Our church organized a prayer chain, and Pastor Joe led special prayers for me. During one of the services, I felt a warm sensation throughout my body. Two weeks later, I went for a check-up, and the doctors were shocked to find no trace of cancer in my body. It's been 5 years now, and I'm still cancer-free. God is still in the miracle-working business!",
                      date: "July 10, 2018",
                      type: "text",
                      image: pastorjoe,
                      likes: 342,
                    })
                  }
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
                    gap: "8px",
                  }}
                >
                  Read Full Testimony <FaChevronRight size={12} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Submit Testimony Form */}
        <AnimatePresence>
          {showSubmitForm && (
            <section
              ref={formRef}
              style={{
                padding: isMobile ? "40px 20px" : "60px 40px",
                backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
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
                    Share Your Testimony
                  </motion.h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSubmitForm(false)}
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
                  We'd love to hear about what God has done in your life. Your testimony can inspire and encourage
                  others. Please fill out the form below to share your testimony.
                </motion.p>

                <motion.form
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
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
                      animate={{ y: 0, opacity: 1 }}
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
                        Your Name*
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your full name"
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
                      animate={{ y: 0, opacity: 1 }}
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
                        Email Address*
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email address"
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
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      style={{ flex: 1 }}
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
                        Testimony Title*
                      </label>
                      <input
                        id="title"
                        type="text"
                        placeholder="E.g., Healed from Cancer"
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
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      style={{ flex: 1 }}
                    >
                      <label
                        htmlFor="category"
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        Category*
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={handleInputChange}
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
                          }' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/  strokeLinejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 12px center",
                          backgroundSize: "16px",
                        }}
                      >
                        <option value="healing">Healing</option>
                        <option value="financial">Financial Breakthrough</option>
                        <option value="salvation">Salvation</option>
                        <option value="family">Family & Marriage</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    style={{ marginBottom: "24px" }}
                  >
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
                      Your Testimony*
                    </label>
                    <textarea
                      id="testimony"
                      placeholder="Share your testimony in detail..."
                      required
                      value={formData.testimony}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        height: "200px",
                        padding: "12px",
                        borderRadius: "4px",
                        border: `1px solid ${formErrors.testimony ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                        fontSize: "14px",
                        resize: "vertical",
                      }}
                    ></textarea>
                    {formErrors.testimony && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.testimony}</p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{ marginBottom: "24px" }}
                  >
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Upload Video Testimony (Optional)
                    </label>
                    <div
                      style={{
                        border: `1px dashed ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        borderRadius: "4px",
                        padding: "24px",
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: theme === "dark" ? "#111" : "#f9fafb",
                      }}
                      onClick={triggerFileUpload}
                    >
                      <input
                        type="file"
                        id="videoFile"
                        ref={fileInputRef}
                        accept="video/*"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                      />
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "50%",
                          backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        <FaUpload size={24} />
                      </div>
                      {uploadedFileName ? (
                        <div>
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              marginBottom: "8px",
                              color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                            }}
                          >
                            Video Uploaded
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              color: theme === "dark" ? "#cccccc" : "#4b5563",
                            }}
                          >
                            {uploadedFileName}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: "500",
                              marginBottom: "8px",
                              color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                            }}
                          >
                            Click to upload video
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              color: theme === "dark" ? "#cccccc" : "#4b5563",
                            }}
                          >
                            MP4, MOV, or WebM (max. 100MB)
                          </p>
                        </div>
                      )}
                    </div>
                    {formErrors.videoFile && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.videoFile}</p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    style={{ marginBottom: "32px" }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        id="consentToShare"
                        checked={formData.consentToShare}
                        onChange={handleInputChange}
                        style={{
                          width: "18px",
                          height: "18px",
                          marginTop: "2px",
                          accentColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      />
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            color: theme === "dark" ? "#cccccc" : "#4b5563",
                            lineHeight: 1.6,
                          }}
                        >
                          I consent to share my testimony and understand that it may be featured on the church website,
                          social media, or during church services.*
                        </p>
                        {formErrors.consentToShare && (
                          <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                            {formErrors.consentToShare}
                          </p>
                        )}
                      </div>
                    </label>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#3a2e8a" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
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
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FaFileAlt /> Submit Testimony
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            </section>
          )}
        </AnimatePresence>
      </main>

      {/* Testimony Modal */}
      <AnimatePresence>
        {showTestimonyModal && selectedTestimony && (
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
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              padding: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "12px",
                maxWidth: "900px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Modal Header */}
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
                    fontWeight: "700",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  {selectedTestimony.title}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeTestimonyModal}
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
                  <FaTimes size={20} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div
                style={{
                  padding: "0",
                  flexGrow: 1,
                  overflowY: "auto",
                }}
              >
                {selectedTestimony.type === "video" ? (
                  <div
                    ref={videoContainerRef}
                    style={{
                      position: "relative",
                      width: "100%",
                      backgroundColor: "#000",
                    }}
                  >
                    <video
                      ref={videoRef}
                      src={selectedTestimony.videoUrl}
                      style={{ width: "100%", display: "block" }}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setVideoPlaying(false)}
                    />

                    {/* Video Controls */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "16px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {/* Progress Bar */}
                      <div
                        style={{
                          width: "100%",
                          height: "4px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "2px",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={handleProgressBarClick}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${videoProgress}%`,
                            backgroundColor: "#f59e0b",
                            borderRadius: "2px",
                          }}
                        />
                      </div>

                      {/* Controls */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setVideoPlaying(!videoPlaying)}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {videoPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
                          </motion.button>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={toggleMute}
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: "white",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                            </motion.button>

                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={isMuted ? 0 : videoVolume}
                              onChange={handleVolumeChange}
                              style={{
                                width: "80px",
                                accentColor: "#f59e0b",
                              }}
                            />
                          </div>

                          <div style={{ color: "white", fontSize: "14px" }}>
                            {videoRef.current
                              ? `${Math.floor(videoRef.current.currentTime / 60)}:${Math.floor(
                                  videoRef.current.currentTime % 60,
                                )
                                  .toString()
                                  .padStart(2, "0")} / ${Math.floor(videoDuration / 60)}:${Math.floor(
                                  videoDuration % 60,
                                )
                                  .toString()
                                  .padStart(2, "0")}`
                              : "0:00 / 0:00"}
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowSubtitles(!showSubtitles)}
                            style={{
                              backgroundColor: showSubtitles ? "rgba(255, 255, 255, 0.2)" : "transparent",
                              border: "none",
                              color: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                            }}
                          >
                            CC
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleFullscreen}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              color: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isFullscreen ? <FaCompress size={18} /> : <FaExpand size={18} />}
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Subtitles */}
                    {showSubtitles && videoRef.current && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "80px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          textAlign: "center",
                          maxWidth: "80%",
                          fontSize: "16px",
                          fontWeight: "500",
                          opacity: getCurrentSubtitle() ? 1 : 0,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        {getCurrentSubtitle()?.text || ""}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      height: "300px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={selectedTestimony.image || "/placeholder.svg"}
                      alt={selectedTestimony.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        backgroundColor: "#f59e0b",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedTestimony.category}
                    </div>
                  </div>
                )}

                <div style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      {selectedTestimony.image ? (
                        <img
                          src={selectedTestimony.image || "/placeholder.svg"}
                          alt={selectedTestimony.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <FaUser size={20} />
                      )}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                        }}
                      >
                        {selectedTestimony.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: theme === "dark" ? "#999" : "#666",
                        }}
                      >
                        {selectedTestimony.date}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                      color: theme === "dark" ? "#cccccc" : "#4b5563",
                      marginBottom: "24px",
                    }}
                  >
                    <p>{selectedTestimony.testimony}</p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                      paddingTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        fontSize: "14px",
                      }}
                    >
                      <FaHeart size={16} />
                      <span>{selectedTestimony.likes}</span>
                    </div>

                    <div style={{ display: "flex", gap: "16px" }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 16px",
                          backgroundColor: "transparent",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          border: `1px solid ${theme === "dark" ? "#f59e0b" : "#2a1e7a"}`,
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <FaShare size={14} /> Share
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#3a2e8a" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToForm}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 16px",
                          backgroundColor: "#2a1e7a",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        <FaFileAlt size={14} /> Share Your Testimony
                      </motion.button>
                    </div>
                  </div>
                </div>
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
                Testimony Submitted Successfully!
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "24px",
                  color: theme === "dark" ? "#cccccc" : "#4b5563",
                }}
              >
                Thank you for sharing your testimony. It will be reviewed by our team and may be featured on our website
                or during church services.
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

export default TestifyScreen
