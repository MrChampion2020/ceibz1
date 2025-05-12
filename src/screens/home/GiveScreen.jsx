"use client"

import { useState, useRef } from "react"
import { useMediaQuery } from "react-responsive"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useTheme } from "../../components/ThemeProvider"
import bannerImage from "../../assets/sunday.jpg"
import partnerImage from "../../assets/partner.png"
import buildingImage from "../../assets/building.jpeg"
import healingImage from "../../assets/healings.jpg"
import rhapsodyImage from "../../assets/reachout.jpg"
import missionImage from "../../assets/lwfs.jpg"
import ltmImage from "../../assets/teens.jpg"

import {
  FaHandHoldingUsd,
  FaChurch,
  FaPray,
  FaBook,
  FaGlobe,
  FaGraduationCap,
  FaArrowLeft,
  FaArrowRight,
  FaCreditCard,
  FaMoneyBillWave,
  FaPaypal,
  FaCheck,
  FaTimes,
  FaLock,
  FaRegCreditCard,
  FaDollarSign,
//   FaNairaSign,
  FaPoundSign,
  FaEuroSign,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa"

// Initialize Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51Q1gtFKTNsqkYMrBOpf8FM246PAW6mq7QOcCJAffrH9M4Tsp3n6TGlHGPZA2g1phWCr8avF1bdvh5TewgNzx3jIm00YrUOw85F",
)

// Partnership categories
const categories = [
  {
    id: "offering",
    name: "Service Offering",
    description: "Support our weekly services and ministry operations",
    icon: <FaHandHoldingUsd />,
    image: partnerImage,
    color: "#f59e0b",
  },
  {
    id: "healingStreams",
    name: "Healing Streams",
    description: "Partner with our healing ministry to reach the world",
    icon: <FaPray />,
    image: healingImage,
    color: "#10b981",
  },
  {
    id: "rhapsody",
    name: "Rhapsody of Realities",
    description: "Help distribute our daily devotional worldwide",
    icon: <FaBook />,
    image: rhapsodyImage,
    color: "#3b82f6",
  },
  {
    id: "missions",
    name: "Missions",
    description: "Support our global outreach and evangelism efforts",
    icon: <FaGlobe />,
    image: missionImage,
    color: "#8b5cf6",
  },
  {
    id: "building",
    name: "Building Project",
    description: "Contribute to our church building and expansion projects",
    icon: <FaChurch />,
    image: buildingImage,
    color: "#ef4444",
  },
  {
    id: "ltm",
    name: "LTM",
    description: "Support our leadership training and development programs",
    icon: <FaGraduationCap />,
    image: ltmImage,
    color: "#0891b2",
  },
]

// Currency options
const currencies = [
  {
    id: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    icon: <FaDollarSign />,
    code: "NGN",
  },
  {
    id: "USD",
    name: "US Dollar",
    symbol: "$",
    icon: <FaDollarSign />,
    code: "USD",
  },
  {
    id: "GBP",
    name: "British Pound",
    symbol: "£",
    icon: <FaPoundSign />,
    code: "GBP",
  },
  {
    id: "EUR",
    name: "Euro",
    symbol: "€",
    icon: <FaEuroSign />,
    code: "EUR",
  },
]

// Payment methods
const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: <FaRegCreditCard size={24} />,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: <FaMoneyBillWave size={24} />,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <FaPaypal size={24} />,
  },
]

const GiveScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
  const { theme } = useTheme()
  const navigate = useNavigate()

  // State variables
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showCategoryDetails, setShowCategoryDetails] = useState(false)
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [isRecurring, setIsRecurring] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [activeFrequency, setActiveFrequency] = useState("one-time")
  const [showAmountOptions, setShowAmountOptions] = useState(false)

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    customAmount: "",
    frequency: "one-time",
  })

  // Refs
  const formRef = useRef(null)
  const amountInputRef = useRef(null)

  // Predefined amounts
  const amountOptions = {
    NGN: [1000, 5000, 10000, 50000, 100000],
    USD: [10, 50, 100, 500, 1000],
    GBP: [10, 50, 100, 500, 1000],
    EUR: [10, 50, 100, 500, 1000],
  }

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setShowCategoryDetails(true)
    setShowDonationForm(false)
    setFormData({
      ...formData,
      amount: "",
      customAmount: "",
    })
  }

  // Handle back button click
  const handleBack = () => {
    if (showDonationForm) {
      setShowDonationForm(false)
      setShowCategoryDetails(true)
    } else if (showCategoryDetails) {
      setShowCategoryDetails(false)
      setSelectedCategory(null)
    }
  }

  // Handle proceed to donation form
  const handleProceedToDonate = () => {
    setShowDonationForm(true)
    setShowCategoryDetails(false)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  // Handle currency selection
  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency)
    setShowCurrencyModal(false)
    setFormData({
      ...formData,
      amount: "",
      customAmount: "",
    })
  }

  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method)
  }

  // Handle form input change
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

  // Handle amount selection
  const handleAmountSelect = (amount) => {
    setFormData({
      ...formData,
      amount: amount,
      customAmount: "",
    })
    setShowAmountOptions(false)
  }

  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setFormData({
        ...formData,
        amount: "",
        customAmount: value,
      })
    }
  }

  // Handle frequency selection
  const handleFrequencyChange = (frequency) => {
    setActiveFrequency(frequency)
    setFormData({
      ...formData,
      frequency: frequency,
    })
    setIsRecurring(frequency !== "one-time")
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
    if (!formData.phone.trim()) errors.phone = "Phone is required"
    if (!formData.amount && !formData.customAmount) errors.amount = "Amount is required"
    if (!selectedPaymentMethod) errors.paymentMethod = "Please select a payment method"

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
    }, 2000)
  }

  // Format amount with currency symbol
  const formatAmount = (amount) => {
    return `${selectedCurrency.symbol}${amount.toLocaleString()}`
  }

  // Get display amount
  const getDisplayAmount = () => {
    if (formData.customAmount) {
      return `${selectedCurrency.symbol}${formData.customAmount}`
    } else if (formData.amount) {
      return formatAmount(formData.amount)
    }
    return ""
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
            height: "400px",
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
              filter: "brightness(0.2)",
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
              GIVE & PARTNER
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
              "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will
              be poured into your lap. For with the measure you use, it will be measured to you." - Luke 6:38
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
                  padding:  isMobile ? "14px 1px" : "14px 28px",
                  width: isMobile ? "80%" : "auto",
                  margin: isMobile ? "0 auto" : "0",
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
                <FaHandHoldingUsd /> Give Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#e08c00" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding:  isMobile ? "14px 1px" : "14px 28px",
                  width: isMobile ? "80%" : "auto",
                  margin: isMobile ? "0 auto" : "0",
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
                onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
              >
                <FaChurch /> Become a Partner
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Partnership Categories Section */}
        <AnimatePresence mode="wait">
          {!showCategoryDetails && !showDonationForm && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: isMobile ? "40px 20px" : "60px 40px",
                backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
              }}
            >
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
                  Partnership Categories
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
                  Select a partnership category to support our ministry and make a difference in the world. Your
                  generosity helps us spread the Gospel and impact lives globally.
                </motion.p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                    gap: "24px",
                  }}
                >
                  {categories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
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
                      onClick={() => handleCategorySelect(category)}
                    >
                      <div style={{ position: "relative", height: "180px" }}>
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          style={{
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
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
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
                              backgroundColor: category.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontSize: "24px",
                            }}
                          >
                            {category.icon}
                          </div>
                        </div>
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
                          {category.name}
                        </h3>
                        <p
                          style={{
                            fontSize: "14px",
                            color: theme === "dark" ? "#cccccc" : "#4b5563",
                            marginBottom: "16px",
                            lineHeight: 1.6,
                          }}
                        >
                          {category.description}
                        </p>
                        <motion.div
                          whileHover={{ x: 5 }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: category.color,
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                        >
                          Partner Now <FaArrowRight size={12} />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {/* Category Details Section */}
          {showCategoryDetails && selectedCategory && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: isMobile ? "40px 20px" : "60px 40px",
                backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
              }}
            >
              <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "32px",
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleBack}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <FaArrowLeft /> Back to Categories
                  </motion.button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    gap: "32px",
                    alignItems: "flex-start",
                  }}
                >
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      flex: "0 0 40%",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={selectedCategory.image || "/placeholder.svg"}
                      alt={selectedCategory.name}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ flex: 1 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: selectedCategory.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "20px",
                        }}
                      >
                        {selectedCategory.icon}
                      </div>
                      <h2
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        {selectedCategory.name}
                      </h2>
                    </div>

                    <p
                      style={{
                        fontSize: "16px",
                        color: theme === "dark" ? "#cccccc" : "#4b5563",
                        marginBottom: "24px",
                        lineHeight: 1.7,
                      }}
                    >
                      {selectedCategory.description}
                    </p>

                    <div
                      style={{
                        backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                        padding: "20px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          marginBottom: "12px",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        }}
                      >
                        Why Partner with {selectedCategory.name}?
                      </h3>
                      <ul
                        style={{
                          paddingLeft: "20px",
                          color: theme === "dark" ? "#cccccc" : "#4b5563",
                          fontSize: "14px",
                          lineHeight: 1.7,
                        }}
                      >
                        <li>Support the spread of the Gospel worldwide</li>
                        <li>Be part of transforming lives through our ministry</li>
                        <li>Receive spiritual blessings as you give</li>
                        <li>Join a global community of partners making a difference</li>
                      </ul>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#e08c00" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleProceedToDonate}
                      style={{
                        width: "100%",
                        padding: "16px",
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
                      <FaHandHoldingUsd /> Proceed to Give
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Donation Form Section */}
          {showDonationForm && selectedCategory && (
            <motion.section
              ref={formRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: isMobile ? "40px 20px" : "60px 40px",
                backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
              }}
            >
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "32px",
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleBack}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    <FaArrowLeft /> Back
                  </motion.button>
                </div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    textAlign: "center",
                  }}
                >
                  {selectedCategory.name} Partnership
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{
                    fontSize: "16px",
                    textAlign: "center",
                    marginBottom: "32px",
                    color: theme === "dark" ? "#cccccc" : "#4b5563",
                  }}
                >
                  Complete the form below to partner with our {selectedCategory.name} ministry
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
                  {/* Currency Selection */}
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Select Currency
                    </label>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCurrencyModal(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 16px",
                        borderRadius: "4px",
                        border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                        backgroundColor: theme === "dark" ? "#111" : "white",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                          {selectedCurrency.icon}
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: theme === "dark" ? "#ffffff" : "#000000",
                            }}
                          >
                            {selectedCurrency.name}
                          </p>
                          <p
                            style={{
                              fontSize: "12px",
                              color: theme === "dark" ? "#999" : "#666",
                            }}
                          >
                            {selectedCurrency.code}
                          </p>
                        </div>
                      </div>
                      <FaChevronDown size={16} color={theme === "dark" ? "#f59e0b" : "#2a1e7a"} />
                    </motion.div>
                  </div>

                  {/* Amount Selection */}
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Amount*
                    </label>
                    <div style={{ position: "relative" }}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowAmountOptions(!showAmountOptions)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          borderRadius: "4px",
                          border: `1px solid ${formErrors.amount ? "#ef4444" : theme === "dark" ? "#333" : "#e5e7eb"}`,
                          backgroundColor: theme === "dark" ? "#111" : "white",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div
                            style={{
                              color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                              fontSize: "16px",
                              fontWeight: "500",
                            }}
                          >
                            {selectedCurrency.symbol}
                          </div>
                          <input
                            ref={amountInputRef}
                            type="text"
                            placeholder="Enter amount"
                            value={formData.customAmount || formData.amount}
                            onChange={handleCustomAmountChange}
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowAmountOptions(false)
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                              backgroundColor: "transparent",
                              color: theme === "dark" ? "#ffffff" : "#000000",
                              fontSize: "16px",
                              width: "100%",
                            }}
                          />
                        </div>
                        {showAmountOptions ? (
                          <FaChevronUp size={16} color={theme === "dark" ? "#f59e0b" : "#2a1e7a"} />
                        ) : (
                          <FaChevronDown size={16} color={theme === "dark" ? "#f59e0b" : "#2a1e7a"} />
                        )}
                      </motion.div>

                      <AnimatePresence>
                        {showAmountOptions && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                              borderRadius: "4px",
                              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                              marginTop: "4px",
                              zIndex: 10,
                              border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                            }}
                          >
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "8px",
                                padding: "12px",
                              }}
                            >
                              {amountOptions[selectedCurrency.id].map((amount) => (
                                <motion.div
                                  key={amount}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleAmountSelect(amount)}
                                  style={{
                                    padding: "8px",
                                    borderRadius: "4px",
                                    backgroundColor:
                                      formData.amount === amount
                                        ? theme === "dark"
                                          ? "#2a1e7a"
                                          : "#e9ecef"
                                        : "transparent",
                                    border: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    color:
                                      formData.amount === amount
                                        ? theme === "dark"
                                          ? "#f59e0b"
                                          : "#2a1e7a"
                                        : theme === "dark"
                                          ? "#cccccc"
                                          : "#4b5563",
                                    fontWeight: formData.amount === amount ? "500" : "normal",
                                  }}
                                >
                                  {formatAmount(amount)}
                                </motion.div>
                              ))}
                            </div>
                            <div
                              style={{
                                padding: "8px 12px",
                                borderTop: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                                fontSize: "12px",
                                color: theme === "dark" ? "#999" : "#666",
                                textAlign: "center",
                              }}
                            >
                              Or enter a custom amount
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {formErrors.amount && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.amount}</p>
                    )}
                  </div>

                  {/* Giving Frequency */}
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Giving Frequency
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {[
                        { id: "one-time", label: "One Time" },
                        { id: "weekly", label: "Weekly" },
                        { id: "monthly", label: "Monthly" },
                        { id: "quarterly", label: "Quarterly" },
                        { id: "annually", label: "Annually" },
                      ].map((frequency) => (
                        <motion.button
                          key={frequency.id}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFrequencyChange(frequency.id)}
                          style={{
                            padding: "8px 16px",
                            backgroundColor:
                              activeFrequency === frequency.id
                                ? theme === "dark"
                                  ? "#2a1e7a"
                                  : "#e9ecef"
                                : "transparent",
                            color:
                              activeFrequency === frequency.id
                                ? theme === "dark"
                                  ? "#f59e0b"
                                  : "#2a1e7a"
                                : theme === "dark"
                                  ? "#cccccc"
                                  : "#4b5563",
                            border: `1px solid ${
                              activeFrequency === frequency.id
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
                            fontWeight: activeFrequency === frequency.id ? "500" : "normal",
                          }}
                        >
                          {frequency.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginBottom: "24px",
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
                        Full Name*
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your full name"
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
                        Email Address*
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email address"
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
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
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
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
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
                  </div>

                  {/* Payment Methods */}
                  <div style={{ marginBottom: "32px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      Payment Method*
                    </label>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                        gap: "12px",
                      }}
                    >
                      {paymentMethods.map((method) => (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePaymentMethodSelect(method)}
                          style={{
                            padding: "16px",
                            borderRadius: "4px",
                            border: `1px solid ${
                              selectedPaymentMethod?.id === method.id
                                ? theme === "dark"
                                  ? "#f59e0b"
                                  : "#2a1e7a"
                                : theme === "dark"
                                  ? "#333"
                                  : "#e5e7eb"
                            }`,
                            backgroundColor:
                              selectedPaymentMethod?.id === method.id
                                ? theme === "dark"
                                  ? "rgba(245, 158, 11, 0.1)"
                                  : "rgba(42, 30, 122, 0.05)"
                                : "transparent",
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "12px",
                            position: "relative",
                          }}
                        >
                          {selectedPaymentMethod?.id === method.id && (
                            <div
                              style={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                backgroundColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "10px",
                              }}
                            >
                              <FaCheck size={8} />
                            </div>
                          )}
                          <div
                            style={{
                              color:
                                selectedPaymentMethod?.id === method.id
                                  ? theme === "dark"
                                    ? "#f59e0b"
                                    : "#2a1e7a"
                                  : theme === "dark"
                                    ? "#cccccc"
                                    : "#4b5563",
                            }}
                          >
                            {method.icon}
                          </div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: selectedPaymentMethod?.id === method.id ? "500" : "normal",
                              color:
                                selectedPaymentMethod?.id === method.id
                                  ? theme === "dark"
                                    ? "#f59e0b"
                                    : "#2a1e7a"
                                  : theme === "dark"
                                    ? "#cccccc"
                                    : "#4b5563",
                              textAlign: "center",
                            }}
                          >
                            {method.name}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    {formErrors.paymentMethod && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{formErrors.paymentMethod}</p>
                    )}
                  </div>

                  {/* Secure Payment Notice */}
                  <div
                    style={{
                      backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                      padding: "16px",
                      borderRadius: "4px",
                      marginBottom: "24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        fontSize: "20px",
                      }}
                    >
                      <FaLock />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          marginBottom: "4px",
                        }}
                      >
                        Secure Payment
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: theme === "dark" ? "#cccccc" : "#4b5563",
                        }}
                      >
                        Your payment information is securely processed and encrypted.
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#3a2e8a" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "16px",
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
                        <FaCreditCard /> {getDisplayAmount() ? `Give ${getDisplayAmount()}` : "Complete Donation"}
                      </>
                    )}
                  </motion.button>
                </motion.form>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Why Give Section */}
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
              Why Give?
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
              Your giving makes a difference in spreading the Gospel and transforming lives around the world.
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
                  title: "Support Ministry Operations",
                  description:
                    "Your giving helps maintain our church facilities, support staff, and fund our weekly services.",
                  icon: <FaChurch />,
                  color: "#f59e0b",
                },
                {
                  title: "Spread the Gospel",
                  description:
                    "Your contributions help us reach more people with the message of Christ through various outreach programs.",
                  icon: <FaGlobe />,
                  color: "#10b981",
                },
                {
                  title: "Help Those in Need",
                  description:
                    "Your generosity enables us to provide assistance to those facing hardships in our community and beyond.",
                  icon: <FaHandHoldingUsd />,
                  color: "#3b82f6",
                },
                {
                  title: "Support Missions",
                  description:
                    "Your giving funds our missionaries and partners who are taking the Gospel to unreached areas.",
                  icon: <FaPray />,
                  color: "#8b5cf6",
                },
                {
                  title: "Invest in the Future",
                  description:
                    "Your contributions help train the next generation of leaders through our educational programs.",
                  icon: <FaGraduationCap />,
                  color: "#ef4444",
                },
                {
                  title: "Receive Blessings",
                  description:
                    "As you give, you position yourself to receive God's blessings according to His promises.",
                  icon: <FaBook />,
                  color: "#0891b2",
                },
              ].map((item, index) => (
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
                      backgroundColor: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "20px",
                      marginBottom: "16px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      marginBottom: "12px",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: theme === "dark" ? "#cccccc" : "#4b5563",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Currency Modal */}
      <AnimatePresence>
        {showCurrencyModal && (
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
              backdropFilter: "blur(4px)",
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
                borderRadius: "8px",
                maxWidth: "400px",
                width: "100%",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: `1px solid ${theme === "dark" ? "#333" : "#e5e7eb"}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  }}
                >
                  Select Currency
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCurrencyModal(false)}
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

              <div style={{ padding: "20px" }}>
                {currencies.map((currency) => (
                  <motion.div
                    key={currency.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCurrencySelect(currency)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor:
                        selectedCurrency.id === currency.id
                          ? theme === "dark"
                            ? "rgba(245, 158, 11, 0.1)"
                            : "rgba(42, 30, 122, 0.05)"
                          : "transparent",
                      marginBottom: "8px",
                      border: `1px solid ${
                        selectedCurrency.id === currency.id ? (theme === "dark" ? "#f59e0b" : "#2a1e7a") : "transparent"
                      }`,
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: theme === "dark" ? "#2a1e7a" : "#e9ecef",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        fontSize: "18px",
                      }}
                    >
                      {currency.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: theme === "dark" ? "#ffffff" : "#000000",
                          marginBottom: "4px",
                        }}
                      >
                        {currency.name}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          color: theme === "dark" ? "#999" : "#666",
                        }}
                      >
                        {currency.code}
                      </p>
                    </div>
                    {selectedCurrency.id === currency.id && (
                      <div
                        style={{
                          marginLeft: "auto",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          backgroundColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                        }}
                      >
                        <FaCheck size={12} />
                      </div>
                    )}
                  </motion.div>
                ))}
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
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  color: "white",
                  fontSize: "40px",
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
                Thank You for Your Generosity!
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "16px",
                  color: theme === "dark" ? "#cccccc" : "#4b5563",
                  lineHeight: 1.7,
                }}
              >
                Your {selectedCategory?.name} partnership of {getDisplayAmount()} has been successfully processed. A
                confirmation receipt has been sent to your email.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  marginBottom: "24px",
                  color: theme === "dark" ? "#cccccc" : "#4b5563",
                  lineHeight: 1.7,
                }}
              >
                "And God is able to bless you abundantly, so that in all things at all times, having all that you need,
                you will abound in every good work." - 2 Corinthians 9:8
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowSuccessModal(false)
                  setShowDonationForm(false)
                  setShowCategoryDetails(false)
                  setSelectedCategory(null)
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    amount: "",
                    customAmount: "",
                    frequency: "one-time",
                  })
                  setSelectedPaymentMethod(null)
                  setActiveFrequency("one-time")
                  setIsRecurring(false)
                }}
                style={{
                  padding: "14px 28px",
                  backgroundColor: "#2a1e7a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Return to Giving Page
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default GiveScreen




// import React, { useState } from "react";
// import { useMediaQuery } from "react-responsive";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faTimes,
//   faArrowLeft,
// } from "@fortawesome/free-solid-svg-icons"; // Added faArrowLeft for back icon
// import { useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js"; // Import Stripe Elements
// import { loadStripe } from "@stripe/stripe-js"; // Import Stripe.js
// import {
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaFacebook,
//   FaYoutube,
//   FaInstagram,
//   FaTwitter,
//   FaGlobe,
// } from "react-icons/fa";
// import logo from "./logo.png";
// import image1 from "../../assets/partner.png";
// import image2 from "../../assets/building.jpeg";
// import image3 from "../../assets/healings.jpg";
// import kingschat from "../../assets/kingschat.png";

// const stripePromise = loadStripe(
//   "pk_test_51Q1gtFKTNsqkYMrBOpf8FM246PAW6mq7QOcCJAffrH9M4Tsp3n6TGlHGPZA2g1phWCr8avF1bdvh5TewgNzx3jIm00YrUOw85F"
// ); // Initialize Stripe with your public key


// const categories = [
//   { value: "", label: "Select Category" },
//   { value: "offering", label: "Service Offering" },
//   { value: "healingStreams", label: "Healing Streams" },
//   { value: "rhapsody", label: "Rhapsody" },
//   { value: "missions", label: "Missions" },
//   { value: "building", label: "Building Project" },
//   { value: "ltm", label: "LTM" },
// ];

// const currencies = [
//   { value: "", label: "Select Currency" },
//   { value: "USD", label: "USD" },
//   { value: "NGN", label: "NGN" },
//   { value: "GBP", label: "GBP" },
// ];


// const GiveScreen = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [flippedIndex, setFlippedIndex] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     amount: "",
//     currency: "",
//     category: "",
//   });
//   const [isFormComplete, setIsFormComplete] = useState(false); // Check if form is fully filled
//   const [formIncompleteMessage, setFormIncompleteMessage] = useState(""); // Message for incomplete form
//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
//   const [showMinistries, setShowMinistries] = useState(false);
//   const [activeSection, setActiveSection] = useState(null);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const navigation = useNavigate();

//   const handleFlip = (index) => {
//     if (flippedIndex === index && showForm) {
//       setShowForm(true);
//     } else if (flippedIndex === index) {
//       setShowForm(true); // Show form after the second click
//     } else {
//       setFlippedIndex(index);
//       setShowForm(false);
//     }
//   };


//   // const handleCategory = (e) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value });

//   // };

  
//   // const handleChange = (e) => {
//   //   setFormData({ ...formData, [e.target.name]: e.target.value });

    
  
//   //   // Check if all form fields are filled
//   //   const allFilled = Object.values(formData).every(
//   //     (value) => value.trim() !== ""
//   //   );

//   //   setIsFormComplete(allFilled);
//   //   setFormIncompleteMessage(
//   //     allFilled ? "" : "Please complete the form to proceed."
//   //   );
//   // };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//     const allFilled = Object.values(formData).every(
//       (value) => value.trim() !== ""
//     );

//     setIsFormComplete(allFilled);
//     setFormIncompleteMessage(
//       allFilled ? "" : "Please complete the form to proceed."
//     );
//   };  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isFormComplete) {
//       console.log("Form submitted:", formData);
//       // Navigate to Stripe screen after submission
//       // navigate('/stripe');
//       navigation("/stripe");
//     }
//   };

//   const handleBack = () => {
//     // Reset states and go back to images
//     setShowForm(false);
//     setFlippedIndex(null);
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       amount: "",
//       currency: "",
//       category: "",
//     });
//     setFormIncompleteMessage("");
//     setIsFormComplete(false);
//   };

//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       {/* Header Section */}
//       <header
//   style={{
//     display: "flex",
//     backgroundColor: "black",
//     justifyContent: "space-between",
//     width: "100%",
//     alignItems: "center",
//     padding: 10,
//     zIndex: 1,
//     borderBottom: "0.2px solid white",
//   }}
// >
//   <img
//     src={logo}
//     alt="Church Logo"
//     style={{ width: "60px", height: "auto", marginRight: 40,}}
//     onClick={() => navigation("/")}
//   />
//   {isMobile ? (
//     <div style={{ position: "relative" }}>
//       <div
//         style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
//         onClick={toggleMenu}
//       >
//         <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
//       </div>

//       {/* Conditionally render the drop-down menu */}
//       {menuOpen && (
//         <nav
//           style={{
//             position: "absolute",
//             top: "50px", // Position below the icon
//             right: 0, // Align to the left side of the screen
//             backgroundColor: "black",
//             padding: "10px",
//             borderRadius: "5px",
//             zIndex: 10,
//             gap: 5,
//             width: "200px", // Optional: set a fixed width for the menu
//           }}
//         >
//           <a
//             href=""
//             style={{ textDecoration: "none", color: "white", display: "block", marginBottom: "10px",}}
//             onClick={() => {
//               navigation("/");
//               toggleMenu(); // Close menu on click
//             }}
//           >
//             HOME
//           </a>
//           <a
//             href=""
//             style={{ textDecoration: "none", color: "white", display: "block", marginBottom: "10px" }}
//             onClick={() => {
//               navigation("/LiveStream");
//               toggleMenu(); // Close menu on click
//             }}
//           >
//             LIVE
//           </a>
//           <a
//             href=""
//             style={{ textDecoration: "none", color: "white", display: "block" }}
//             onClick={() => {
//               navigation("/Contact");
//               toggleMenu(); // Close menu on click
//             }}
//           >
//             CONTACT
//           </a>
//         </nav>
//       )}
//     </div>
//   ) : (
//     <nav
//       style={{
//         display: "flex",
//         gap: "70px",
//         color: "white",
//         padding: '10px 50px',
//         fontWeight: 600,
//       }}
//     >
//       <a
//         href=""
//         style={{ textDecoration: "none", color: "white" }}
//         onClick={() => {
//           navigation("/");
//         }}
//       >
//         HOME
//       </a>
//       <a
//         href=""
//         style={{ textDecoration: "none", color: "white" }}
//         onClick={() => {
//           navigation("/LiveStream");
//         }}
//       >
//         LIVE
//       </a>
//       <a
//         href=""
//         style={{ textDecoration: "none", color: "white" }}
//         onClick={() => {
//           navigation("/Contact");
//         }}
//       >
//         CONTACT
//       </a>
//     </nav>
//   )}
// </header>


//       {/* Image Flip Cards or Form Section */}
//       {showForm ? (
//         // Display the form instead of images
//         <section style={{ zIndex: 1, padding: "50px", textAlign: "center" }}>
//           {/* Back Icon */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "flex-start",
//               marginBottom: "20px",
//             }}
//           >
//             <FontAwesomeIcon
//               icon={faArrowLeft}
//               size="2x"
//               style={{ cursor: "pointer" }}
//               onClick={handleBack}
//             />
//           </div>

//           <h2>Make payment in any currency </h2>
//           <form
//             onSubmit={handleSubmit}
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               style={{
//                 border: "1px solid grey",
//                 borderRadius: "5px",
//                 color: "black",
//                 height: "40px",
//                 fontSize: "14",
//                 width: isMobile ? "80%" : "30%",
//                 marginTop: 15,
//                 padding: 5
//               }}
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               style={{
//                 border: "1px solid grey",
//                 borderRadius: "5px",
//                 color: "black",
//                 fontSize: "14",
//                 height: "40px",
//                 width: isMobile ? "80%" : "30%",
//                 marginTop: 10,
//                 padding: 5
//               }}
              
//             />

//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               style={{
//                 border: "1px solid grey",
//                 borderRadius: "5px",
//                 color: "black",
//                 fontSize: "14",
//                 height: "40px",
//                 width: isMobile ? "80%" : "30%",
//                 marginTop: 10,
//                 padding: 5
//               }}
//             />
//             <input
//               type="number"
//               name="amount"
//               placeholder="Amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//               style={{
//                 border: "1px solid grey",
//                 borderRadius: "5px",
//                 color: "black",
//                 height: "40px",
//                 fontSize: "14",
//                 width: isMobile ? "80%" : "30%",
//                 marginTop: 10,
//                 padding: 5
//               }}
//             />
//             <select
//               name="currency"
//               value={formData.currency}
//               onChange={handleChange}
//               required
//               style={{
//                 border: "1px solid grey",
//                 borderRadius: "5px",
//                 color: "black",
//                 fontSize: "14",
//                 height: "40px",
//                 width: isMobile ? "80%" : "30%",
//                 marginBottom: 10,
//                 padding: 5
//               }}
//             >
//               {currencies.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               required
//               style={{
//                 border: "1px solid grey",
//                 borderRadius: "5px",
//                 color: "black",
//                 fontSize: "14",
//                 height: "40px",
//                 width: isMobile ? "80%" : "30%",
//                 marginBottom: 10,
//                 padding: 5
//               }}
//             >
//               {categories.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>

//             {isFormComplete ? (
//               <Elements stripe={stripePromise}>
//                 <button type="submit" style={{ marginTop: "20px" }}>
//                   Proceed to Payment
//                 </button>
//               </Elements>
//             ) : (
//               <p style={{ color: "red", marginTop: "20px" }}>
//                 {formIncompleteMessage}
//               </p>
//             )}
//           </form>
//         </section>
//       ) : (
//         // Display the image flip cards
//         <section
//           style={{
//             backgroundColor: "black",
//             color: "white",
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "center",
//             padding: "20px",
//             gap: "30px",
//           }}
//         >
//           {[
//             { img: image1, text: "Click to proceed to give your offering" },
//             {
//               img: image2,
//               text: "Click to proceed and make payment for Your Healing Streams partnership",
//             },
//             { img: image3, text: "Click on me to proceed with payment" },
//           ].map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 width: isMobile ? "90vw" : "30%",
//                 height: "300px",
//                 perspective: "1000px",
//                 cursor: "pointer",
//               }}
//               onClick={() => handleFlip(index)}
//             >
//               <div
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   transition: "transform 0.8s",
//                   transformStyle: "preserve-3d",
//                   transform:
//                     flippedIndex === index
//                       ? "rotateY(180deg)"
//                       : "rotateY(0deg)",
//                 }}
//               >
//                 {/* Front Side */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "100%",
//                     height: "100%",
//                     backfaceVisibility: "hidden",
//                   }}
//                 >
//                   <img
//                     src={item.img}
//                     alt={`Image ${index + 1}`}
//                     style={{ width: "100%", height: "100%" }}
//                   />
//                 </div>
//                 {/* Back Side */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "100%",
//                     height: "100%",
//                     backfaceVisibility: "hidden",
//                     backgroundColor: "rgba(0, 0, 0, 0.7)",
//                     color: "white",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     transform: "rotateY(180deg)",
//                   }}
//                 >
//                   <p>{item.text}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>
//       )}

//       {/* Footer Section */}

//       {/* Section 6: Useful Links */}
//       <div
//         style={{
//           backgroundColor: "rgba(0, 0, 0, 0.9)",
//           backgroundSize: "cover",
//           padding: "40px 15px",
//           width: "100%",
//           height: "100%",
//           color: "white",
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           margin: "auto",
//           gap: "20px",
//           transition: "transform 0.6s ease-in-out",
//           transform: activeSection === 6 ? "translateY(0)" : "translateY(5px)",
//         }}
//       >
//         {/* Column for Useful Links */}
//         <div
//           style={{
//             flex: "0 0 30%", // 20% width for the left column
//             textAlign: "left",
//             padding: "10px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//             width: isMobile ? "100%" : "30%",
//           }}
//         >
//           <a
//             href=""
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//             <img
//               src={logo}
//               alt="Church Logo"
//               style={{ width: "40px", height: "auto" }}
//               onClick={() => navigation("/")}
//             />
//           </a>
//           <a
//             href=""
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//             Christ Embassy Ibadan Zone 1
//           </a>
//         </div>

//         {/* Column for Useful Links */}
//         <div
//           style={{
//             flex: "0 0 30%", // 20% width for the left column
//             textAlign: "left",
//             padding: "10px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             width: isMobile ? "100%" : "30%",
//           }}
//         >
//           <h1 style={{ fontSize: "16px", fontWeight: 700 }}>
//             <b
//               style={{
//                 paddingBottom: 8,
//                 borderBottom: "0.5px solid transparent",
//                 background:
//                   "linear-gradient(to right, grey 50%, transparent 50%)",
//                 backgroundPosition: "0 100%",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "90% 0.5px", // Adjusts the size of the line
//               }}
//             >
//               Useful
//             </b>
//             <b> Links</b>
//           </h1>

//           <a
//             href=""
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               navigation("/LiveStream");
//             }}
//           >
//             Partnership
//           </a>

//           <a
//             href=""
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               navigation("/Contact");
//             }}
//           >
//             Testify
//           </a>

//           <a
//             href=""
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//             Programs
//           </a>
//           <a
//             href="https://rhapsodyofrealities.org/"
//             style={{ textDecoration: "none" }}
//           >
//             Rhapsody
//           </a>
//           <a
//             href="https://healingstreams.tv/"
//             style={{ textDecoration: "none" }}
//             onClick={() => {
//               navigation("");
//             }}
//           >
//             Healing Streams
//           </a>
//         </div>

//         {/* Column for Useful Links */}
//         <div
//           style={{
//             flex: "0 0 30%", // 20% width for the left column
//             textAlign: "left",
//             padding: "10px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             width: isMobile ? "100%" : "30%",
//           }}
//         >
//           <h1 style={{ fontSize: "16px", fontWeight: 700 }}>
//             <b
//               style={{
//                 paddingBottom: 8,
//                 borderBottom: "0.5px solid transparent",
//                 background:
//                   "linear-gradient(to right, grey 50%, transparent 50%)",
//                 backgroundPosition: "0 100%",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "80% 0.5px", // Adjusts the size of the line
//               }}
//             >
//               Contact
//             </b>
//             <b> Us</b>
//           </h1>

//           <a
//             style={{
//               width: "100%",
//               textDecoration: "none",
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center", // Ensures the icon and text are aligned vertically
//               gap: "10px", // Adds spacing between the icon and the text
//               color: "inherit", // Ensures link color stays consistent
//               fontSize: "16px", // Adjust the font size to ensure consistent icon size
//               lineHeight: "1.5", // Adds some height consistency between text and icon
//             }}
//           >
//             <FaMapMarkerAlt style={{ fontSize: "18px" }} />
//             CVHQ+R4, Ibadan 200285, Oyo
//           </a>

//           <a
//             href=""
//             style={{
//               width: "100%",
//               textDecoration: "none",
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center", // Ensures the icon and text are aligned vertically
//               gap: "10px", // Adds spacing between the icon and the text
//               color: "inherit", // Ensures link color stays consistent
//               fontSize: "16px", // Adjust the font size to ensure consistent icon size
//               lineHeight: "1.5",
//             }}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//             <FaPhoneAlt /> +234 0000 0000 00000
//           </a>
//           <a
//             href=""
//             style={{
//               width: "100%",
//               textDecoration: "none",
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center", // Ensures the icon and text are aligned vertically
//               gap: "10px", // Adds spacing between the icon and the text
//               color: "inherit", // Ensures link color stays consistent
//               fontSize: "16px", // Adjust the font size to ensure consistent icon size
//               lineHeight: "1.5",
//             }}
//             onClick={() => {
//               navigation("/Contact");
//             }}
//           >
//             <FaEnvelope /> info@ceibz1.com
//           </a>
//           <a
//             href=""
//             style={{
//               width: "100%",
//               textDecoration: "none",
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center", // Ensures the icon and text are aligned vertically
//               gap: "10px", // Adds spacing between the icon and the text
//               color: "inherit", // Ensures link color stays consistent
//               fontSize: "16px", // Adjust the font size to ensure consistent icon size
//               lineHeight: "1.5",
//             }}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//             <FaGlobe /> www.ceibz1.com
//           </a>
//           <a
//             href=""
//             style={{
//               width: "100%",
//               textDecoration: "none",
//               display: "flex",
//               flexDirection: "row",
//               alignItems: "center", // Ensures the icon and text are aligned vertically
//               gap: "10px", // Adds spacing between the icon and the text
//               color: "inherit", // Ensures link color stays consistent
//               fontSize: "16px", // Adjust the font size to ensure consistent icon size
//               lineHeight: "1.5",
//             }}
//             onClick={() => {
//               navigation("/Contact");
//             }}
//           >
//             Pastor's Desk
//           </a>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer
//         style={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           justifyContent: "center",
//           padding: "20px",
//           backgroundColor: "black",
//           color: "white",
//           height: "70%",
//           width: "100%",
//           gap: "20%",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: "20px",
//             padding: "5px",
//             margin: isMobile ? "auto" : "auto 5%",
//           }}
//         >
//           <a href="https://kingschat.com" style={{ textDecoration: "none" }}>
//             <img
//               src={kingschat}
//               alt="Church Logo"
//               style={{ width: "24px", height: "auto" }}
//               onClick={() => navigation("/")}
//             />
//           </a>
//           <a
//             href="https://www.facebook.com/ceibz1"
//             style={{ textDecoration: "none" }}
//           >
//             <FaFacebook size={24} />
//           </a>
//           <a
//             href="https://www.youtube.com/@ChristEmbassyibz1"
//             style={{ textDecoration: "none" }}
//           >
//             <FaYoutube size={24} />
//           </a>
//           <a href="https://instagram.com" style={{ textDecoration: "none" }}>
//             <FaInstagram size={24} />
//           </a>
//           <a href="https://twitter.com" style={{ textDecoration: "none" }}>
//             <FaTwitter size={24} />
//           </a>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: "10px",
//             margin: isMobile ? "auto" : "auto",
//             padding: "5px",
//           }}
//         >
//           {/* <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a> */}

//           <p>
//             &copy; {new Date().getFullYear()}
//             <a
//               href=""
//               style={{
//                 textDecoration: "none",
//                 padding: "6px",
//                 fontSize: "14px",
//               }}
//               onClick={() => {
//                 navigation("/");
//               }}
//             >
//               Christ Embassy Ibadan Zone 1
//             </a>
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default GiveScreen;
