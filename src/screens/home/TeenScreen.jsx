"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTheme } from "../../components/ThemeProvider"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import FloatingLiveChat from "../../components/FloatingLiveChat"
import teensHero from "../../assets/teen.jpg"
import bibleStudiesImg from "../../assets/teensmin.jpg"
import communityEventsImg from "../../assets/teen.jpg"
import worshipSessionsImg from "../../assets/youth.png"
import axios from "axios"
import api from "../../api"

const TeenScreen = () => {
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [eventsError, setEventsError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [testimonies, setTestimonies] = useState([]);
  const [loadingTestimonies, setLoadingTestimonies] = useState(true);
  const [testimoniesError, setTestimoniesError] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }) || window.innerWidth <= 768
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" }) || window.innerWidth <= 1024
  const navigate = useNavigate()
  const { theme } = useTheme()

  useEffect(() => {
    axios
      .get(`${api}/api/events/upcoming`)
      .then((res) => {
        console.log("TeenScreen API Response:", res.data.events)
        // Filter for teens category events that are in the future
        const allEvents = res.data.events || []
        const now = new Date()
        const futureEvents = allEvents.filter((e) => e.startDate && new Date(e.startDate) > now)
        const teensEvents = futureEvents.filter(
          (e) =>
            e.category &&
            (e.category.toLowerCase().includes("teen") ||
              e.category.toLowerCase() === "teens" ||
              e.category.toLowerCase() === "youth"),
        )
        setEvents(teensEvents)
      })
      .catch((err) => {
        console.error("TeenScreen API Error:", err)
        setEventsError(`Failed to fetch teen events: ${err.message}`)
      })
      .finally(() => setLoadingEvents(false))
  }, [])

  useEffect(() => {
    axios.get(`${api}/api/user/testimonies`)
      .then(res => {
        setTestimonies((res.data.testimonies || []).filter(t => t.isApproved));
      })
      .catch(() => setTestimoniesError('Failed to fetch testimonies'))
      .finally(() => setLoadingTestimonies(false));
  }, []);

  // Get unique categories from events
  const categories = ["all", ...new Set(events.map((event) => event.category).filter(Boolean))]

  // Filter events by selected category
  const filteredEvents =
    selectedCategory === "all" ? events : events.filter((event) => event.category === selectedCategory)

  // Preload images to prevent layout shifts
  useEffect(() => {
    const preloadImages = [teensHero, bibleStudiesImg, communityEventsImg, worshipSessionsImg]
    preloadImages.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Activities array for the Activities section
  const activities = [
    {
      title: "BIBLE STUDIES",
      image: bibleStudiesImg,
      description: "Engaging Bible studies tailored for teens to deepen their faith and understanding of God's Word.",
    },
    {
      title: "COMMUNITY OUTREACH",
      image: communityEventsImg,
      description: "Community service projects that help teens serve others and make a positive impact.",
    },
    {
      title: "WORSHIP & PRAISE",
      image: worshipSessionsImg,
      description: "Dynamic worship sessions where teens connect with God through music and prayer.",
    },
  ]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      <div style={{ paddingTop: isMobile ? "80px" : "80px", width: "100%", maxWidth: "100vw" }}>
        {/* Hero Section */}
        <section
          style={{
            position: "relative",
            height: isMobile ? "500px" : "calc(100vh - 80px)",
            width: "100%",
            maxWidth: "100vw",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <img
              src={teensHero || "/placeholder.svg"}
              alt="Teens Ministry Banner"
              width={768}
              height={432}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "brightness(0.7)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(42, 30, 122, 0.4)",
                zIndex: 1,
              }}
            ></div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                transform: "translateY(-50%)",
                textAlign: "center",
                color: "white",
                zIndex: 2,
                padding: "0 20px",
              }}
            >
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  fontSize: isMobile ? "20px" : "30px",
                  fontWeight: "bold",
                  marginBottom: isMobile ? "40px" : "50px",
                }}
              >
                WELCOME TO
              </motion.h1>
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  fontSize: isMobile ? "36px" : "72px",
                  fontWeight: 900,
                  marginBottom: isMobile ? "20px" : "30px",
                  lineHeight: 1.1,
                }}
              >
                TEENS MINISTRY
              </motion.h1>
              
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section
          style={{
            padding: isMobile ? "60px 16px" : "100px 32px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", display: isMobile ? "block" : "flex", alignItems: "center", gap: isMobile ? 0 : "60px" }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ flex: isMobile ? undefined : "0 0 400px", marginBottom: isMobile ? "32px" : 0 }}
            >
              <img
                src={teensHero}
                alt="Teens Ministry Group"
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: isMobile ? "220px" : "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: theme === "dark" ? "0 4px 16px rgba(245,158,11,0.12)" : "0 4px 16px rgba(42,30,122,0.10)",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ flex: 1 }}
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  fontSize: isMobile ? "24px" : "30px",
                  fontWeight: "bold",
                  color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                  marginBottom: "20px",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                ABOUT THE TEENS MINISTRY
              </motion.h2>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "15px", lineHeight: 1.6 }}>
                  We nurture and guide teenagers aged 13-19 years with the word of God to develop a personal, loving, serving relationship with Jesus Christ and guide them to discover their divine purpose in God; giving them a sound spiritual and moral foundation for a vibrant and victorious Christian walk.
                </p>
                <p style={{ marginBottom: "15px", lineHeight: 1.6 }}>We understand that:</p>
                <ul style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
                  <li>Every teen has the capacity to contain deity.</li>
                  <li>Every teen has the ability to receive and understand the Word of God.</li>
                  <li>Every teen can cultivate a relationship with the Holy Spirit.</li>
                  <li>Success or failure in the future is determined by a teen's upbringing - Proverbs 22:6</li>
                </ul>
              </div>
              <p style={{ color: theme === "dark" ? "#f59e0b" : "#2a1e7a", fontWeight: 600, fontSize: "16px", textAlign: isMobile ? "center" : "left" }}>
                Join the Teens church ministry by visiting us today!
              </p>
            </motion.div>
          </div>
        </section>










        {/* Programs Section */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "80px 40px",
            backgroundColor: "#2a1e7a",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "20px",
                color: "#f59e0b",
              }}
            >
              FROM THE TEENS CHURCH MINISTRY
            </motion.h2>

            {/* Category Filter Buttons */}
            {categories.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  marginBottom: "40px",
                  flexWrap: "wrap",
                }}
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: "12px 24px",
                      background: selectedCategory === category ? "#f59e0b" : "transparent",
                      color: selectedCategory === category ? "#fff" : "#f59e0b",
                      border: "2px solid #f59e0b",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      outline: "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {category === "all" ? "All Programs" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "30px",
                marginBottom: "40px",
              }}
            >
              {loadingEvents ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                  <p>Loading programs...</p>
                </div>
              ) : eventsError ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                  <p style={{ color: "#f59e0b" }}>{eventsError}</p>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                  <p style={{ color: "#f59e0b" }}>No upcoming teen programs found.</p>
                </div>
              ) : (
                filteredEvents.map((event, index) => (
                  <motion.div
                    key={event._id || index}
                    initial={{ y: 100, opacity: 0, scale: 0.9 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: "12px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
                    }}
                    onClick={() => navigate("/Programs")}
                  >
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl || "/placeholder.svg"}
                        alt={event.title}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div style={{ padding: "20px" }}>
                      <h3
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          marginBottom: "10px",
                          color: "white",
                        }}
                      >
                        {event.title}
                      </h3>
                      <p
                        style={{
                          color: "#f59e0b",
                          fontSize: "14px",
                          marginBottom: "10px",
                        }}
                      >
                        {event.startDate ? new Date(event.startDate).toLocaleDateString() : ""}
                      </p>
                      {event.description && (
                        <p
                          style={{
                            color: "#cccccc",
                            fontSize: "14px",
                            lineHeight: 1.5,
                          }}
                        >
                          {event.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Dots indicator */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {[0, 1, 2, 3].map((dot) => (
                <div
                  key={dot}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: dot === 0 ? "#f59e0b" : "#666",
                  }}
                />
              ))}
            </div>
          </div>
        </section>


        {/* Activities Section */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "80px 40px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "60px",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              OUR ACTIVITIES
            </motion.h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "30px",
              }}
            >
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "25px" }}>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      {activity.title}
                    </h3>
                    <p
                      style={{
                        color: theme === "dark" ? "#cccccc" : "#666",
                        lineHeight: 1.6,
                        marginBottom: "20px",
                      }}
                    >
                      {activity.description}
                    </p>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        border: `2px solid ${theme === "dark" ? "#f59e0b" : "#2a1e7a"}`,
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        transition: "all 0.3s",
                      }}
                      onClick={() => navigate("/Programs")}
                    >
                      LEARN MORE
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonies Section */}
        <section
          style={{
            padding: isMobile ? "60px 20px" : "80px 40px",
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: isMobile ? "28px" : "36px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "60px",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              TESTIMONIES
            </motion.h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "30px",
              }}
            >
              {loadingTestimonies ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                  <p>Loading testimonies...</p>
                </div>
              ) : testimoniesError ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                  <p style={{ color: "#f59e0b" }}>{testimoniesError}</p>
                </div>
              ) : testimonies.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
                  <p style={{ color: "#f59e0b" }}>No approved testimonies found.</p>
                </div>
              ) : (
                testimonies.map((testimony, index) => (
                  <motion.div
                    key={testimony._id || index}
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#111111" : "#f9fafb",
                      padding: "30px",
                      borderRadius: "8px",
                      position: "relative",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        color: "#f59e0b",
                        position: "absolute",
                        top: "15px",
                        left: "20px",
                      }}
                    >
                      "
                    </div>
                    {testimony.mediaType === 'video' ? (
                      <video
                        src={testimony.mediaUrl}
                        controls
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    ) : testimony.mediaType === 'image' ? (
                      <img
                        src={testimony.mediaUrl}
                        alt={testimony.text}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <p
                        style={{
                          color: theme === "dark" ? "#ffffff" : "#4b5563",
                          lineHeight: 1.6,
                          marginBottom: "20px",
                          paddingTop: "20px",
                        }}
                      >
                        {testimony.text}
                      </p>
                    )}
                    <p
                      style={{
                        fontWeight: "bold",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      {testimony.author}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Bible Quote Section */}
        <section
          style={{
            padding: isMobile ? "80px 20px" : "120px 40px",
            backgroundColor: "#2a1e7a",
            textAlign: "center",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <motion.blockquote
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: isMobile ? "24px" : "32px",
                fontWeight: "bold",
                lineHeight: 1.4,
                marginBottom: "20px",
              }}
            >
              "Train up a child in the way he should go: and when he is old, he will not depart from it."
            </motion.blockquote>
            <motion.cite
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                fontSize: "18px",
                color: "#f59e0b",
                fontStyle: "normal",
              }}
            >
              Proverbs 22:6 (KJV)
            </motion.cite>
          </div>
        </section>

        {/* Live Event Banner */}
        <section
          style={{
            backgroundColor: "#f59e0b",
            padding: isMobile ? "15px 20px" : "20px 40px",
            margin: "40px auto",
            maxWidth: "90%",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: isMobile ? "15px" : "0",
            }}
          >
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "bold",
                margin: 0,
                color: "#2a1e7a",
              }}
            >
              HAPPENING LIVE: SUNDAY SERVICE WITH PASTOR JOE AGBAJE
            </p>
            <button
              style={{
                backgroundColor: "#2a1e7a",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              onClick={() => (window.location.href = "https://www.ceibz1.online/")}
            >
              WATCH LIVE
            </button>
          </div>
        </section>
      </div>

      <Footer />
      <FloatingLiveChat />
    </div>
  )
}

export default TeenScreen
