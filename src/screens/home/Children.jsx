import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import FloatingLiveChat from "../../components/FloatingLiveChat";
import childrenBanner from "../../assets/child.jpg";
import axios from "axios";
import api from "../../api";
import bibleStoriesImg from "../../assets/children.jpg";
import craftsGamesImg from "../../assets/kiddies.jpg";
import prayerSessionsImg from "../../assets/childministry.jpg";

const Children = () => {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState("");
  const [testimonies, setTestimonies] = useState([]);
  const [loadingTestimonies, setLoadingTestimonies] = useState(true);
  const [testimoniesError, setTestimoniesError] = useState("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }) || window.innerWidth <= 768;
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" }) || window.innerWidth <= 1024;
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    axios
      .get(`${api}/api/events/upcoming`)
      .then((res) => {
        console.log("Children API Response:", res.data.events);
        const filteredEvents = (res.data.events || []).filter(
          (e) => e.category && e.category.toLowerCase().includes("children") && e.startDate && new Date(e.startDate) > new Date()
        );
        setEvents(filteredEvents);
      })
      .catch((err) => {
        console.error("Children API Error:", err);
        setEventsError(`Failed to fetch children events: ${err.message}`);
      })
      .finally(() => setLoadingEvents(false));
  }, []);

  useEffect(() => {
    axios.get(`${api}/api/user/testimonies`)
      .then(res => {
        setTestimonies((res.data.testimonies || []).filter(t => t.isApproved));
      })
      .catch(() => setTestimoniesError('Failed to fetch testimonies'))
      .finally(() => setLoadingTestimonies(false));
  }, []);

  // Preload images to prevent layout shifts
  useEffect(() => {
    const preloadImages = [childrenBanner];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
            filter: "brightness(0.9)",
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
              src={childrenBanner || "/placeholder.svg"}
              alt="Children Ministry Banner"
              width={768}
              height={432}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "brightness(0.9)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(42, 30, 122, 0.3)",
                zIndex: 1,
              }}
            ></div>
            {/* Restore hero section messages */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: "absolute",
                top: "30%",
                left: 0,
                right: 0,
                textAlign: "center",
                color: "white",
                zIndex: 2,
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
                WELCOME TO <br /> <span style={{ fontSize: isMobile ? "30px" : "60px", fontWeight: 900 }}> CHILDREN'S MINISTRY </span>
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
                src={childrenBanner}
                alt="Children's Ministry Group"
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
                ABOUT THE CHILDREN'S MINISTRY
              </motion.h2>
              <div style={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "15px", lineHeight: 1.6 }}>
                  The Children's Ministry is dedicated to nurturing young hearts in faith, love, and the Word of God. We provide a safe, fun, and engaging environment where children can learn about Jesus, build friendships, and grow in their spiritual journey.
                </p>
                <p style={{ marginBottom: "15px", lineHeight: 1.6 }}>
                  Our programs are designed to help children:
                </p>
                <ul style={{ paddingLeft: "20px", lineHeight: 1.8 }}>
                  <li>Understand the Bible through stories and activities.</li>
                  <li>Develop a personal relationship with God.</li>
                  <li>Build strong moral and spiritual foundations.</li>
                  <li>Experience the love and joy of Christian community.</li>
                </ul>
              </div>
              <p style={{ color: theme === "dark" ? "#f59e0b" : "#2a1e7a", fontWeight: 600, fontSize: "16px", textAlign: isMobile ? "center" : "left" }}>
                We welcome all children to join us and be part of our vibrant ministry!
              </p>
            </motion.div>
          </div>
        </section>






        {/* Activities Section */}
        <section
          style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              style={{
                fontSize: isMobile ? "24px" : "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "40px",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              OUR ACTIVITIES
            </motion.h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "24px",
            }}>
              {/* Assuming activities data is hardcoded or fetched elsewhere */}
              {/* For now, using placeholder images and data */}
                <motion.div
                key="bible-stories"
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                  whileHover={{ y: -10 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    overflow: "hidden",
                    boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                  }}
                >
                  <div style={{
                    position: "relative",
                    height: "200px",
                    width: "100%",
                    overflow: "hidden",
                  }}>
                    <img
                    src={bibleStoriesImg}
                    alt="BIBLE STORIES"
                      width="400"
                      height="200"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "12px",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                    BIBLE STORIES
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                      style={{
                        color: theme === "dark" ? "#cccccc" : "#333333",
                        marginBottom: "16px",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                    We teach children the Word of God through engaging Bible stories that bring lessons to life.
                    </motion.p>
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        color: "white",
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                      style={{
                        backgroundColor: "transparent",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        border: `1px solid ${theme === "dark" ? "#f59e0b" : "#2a1e7a"}`,
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        borderRadius: "4px",
                      }}
                      onClick={() => navigate("/Programs")}
                    >
                      LEARN MORE
                    </motion.button>
                  </div>
                </motion.div>

              <motion.div
                key="crafts-games"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                whileHover={{ y: -10 }}
          style={{
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                  overflow: "hidden",
                  boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                }}
              >
                <div style={{
                  position: "relative",
                  height: "200px",
                  width: "100%",
                  overflow: "hidden",
                }}>
                  <img
                    src={craftsGamesImg}
                    alt="CRAFTS & GAMES"
                    width="400"
                    height="200"
              style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "20px" }}>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{
                      fontSize: "18px",
                fontWeight: "bold",
                      marginBottom: "12px",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    CRAFTS & GAMES
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                      color: theme === "dark" ? "#cccccc" : "#333333",
                      marginBottom: "16px",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    Fun crafts and games that help children learn about faith while enjoying themselves.
                  </motion.p>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{
                      backgroundColor: "transparent",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      border: `1px solid ${theme === "dark" ? "#f59e0b" : "#2a1e7a"}`,
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                    }}
                    onClick={() => navigate("/Programs")}
                  >
                    LEARN MORE
                  </motion.button>
                </div>
              </motion.div>

                <motion.div
                key="prayer-sessions"
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
                  whileHover={{ y: -10 }}
                  style={{
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    overflow: "hidden",
                  boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                }}
              >
                  <div style={{
                  position: "relative",
                  height: "200px",
                  width: "100%",
                  overflow: "hidden",
                }}>
                  <img
                    src={prayerSessionsImg}
                    alt="PRAYER SESSIONS"
                    width="400"
                    height="200"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  </div>
                <div style={{ padding: "20px" }}>
                  <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "12px",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    }}
                  >
                    PRAYER SESSIONS
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{
                      color: theme === "dark" ? "#cccccc" : "#333333",
                      marginBottom: "16px",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    Guided prayer sessions that teach children how to connect with God.
                  </motion.p>
                  <motion.button
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      color: "white",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{
                      backgroundColor: "transparent",
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      border: `1px solid ${theme === "dark" ? "#f59e0b" : "#2a1e7a"}`,
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                    }}
                    onClick={() => navigate("/Programs")}
                  >
                    LEARN MORE
                  </motion.button>
              </div>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonies Section */}
        <section
          style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              style={{
                fontSize: isMobile ? "24px" : "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "16px",
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              TESTIMONIES
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                textAlign: "center",
                color: theme === "dark" ? "#9ca3af" : "#6b7280",
                marginBottom: "40px",
                fontSize: "14px",
              }}
            >
              Hear what parents have to say
            </motion.p>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "24px",
            }}>
              {loadingTestimonies ? (
                <p>Loading testimonies...</p>
              ) : testimoniesError ? (
                <p style={{ color: "red" }}>{testimoniesError}</p>
              ) : testimonies.length === 0 ? (
                <p>No approved testimonies found.</p>
              ) : (
                testimonies.map((testimony, index) => (
                  <motion.div
                    key={testimony._id || index}
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    style={{
                      backgroundColor: theme === "dark" ? "#111111" : "#f9fafb",
                      padding: "32px",
                      position: "relative",
                      border: theme === "dark" ? "1px solid #333333" : "none",
                      borderRadius: "4px",
                      boxShadow: theme === "dark" ? "0 4px 6px rgba(193, 147, 10, 0.17)" : "0 4px 6px rgba(57, 56, 56, 0.27)",
                    }}
                  >
                    {testimony.mediaType === 'video' ? (
                      <video
                        src={testimony.mediaUrl}
                        controls
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : testimony.mediaType === 'image' ? (
                      <img
                        src={testimony.mediaUrl}
                        alt={testimony.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          style={{
                            fontSize: "48px",
                            color: "#f59e0b",
                            position: "absolute",
                            top: "16px",
                            left: "16px",
                          }}
                        >
                          "
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          style={{
                            color: theme === "dark" ? "#ffffff" : "#4b5563",
                            marginBottom: "24px",
                            position: "relative",
                            zIndex: 10,
                            paddingTop: "24px",
                            fontSize: "14px",
                            lineHeight: "1.6",
                          }}
                        >
                          {testimony.testimony}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          style={{
                            fontWeight: 500,
                            color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                            fontSize: "14px",
                          }}
                        >
                          {testimony.author}
                        </motion.p>
                      </>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section
          style={{
            position: "relative",
            padding: isMobile ? "60px 16px" : "80px 32px",
            backgroundColor: "#2a1e7a",
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${childrenBanner})`, // Using the same banner for vision background
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          ></motion.div>

          <div style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "896px",
            margin: "0 auto",
            padding: "0 16px",
            color: "white",
          }}>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              style={{
                fontSize: isMobile ? "24px" : "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "32px",
                color: "#f59e0b",
              }}
            >
              OUR VISION
            </motion.h2>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                textAlign: "center",
              }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  fontSize: "18px",
                  lineHeight: "1.75",
                  color: "#ffffff",
                }}
              >
                The Loveworld Children Ministry is a place where young hearts grow in faith.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  lineHeight: "1.75",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                We are committed to nurturing children in the Word of God, helping them develop a strong spiritual foundation through fun, engaging, and meaningful activities.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{
                  lineHeight: "1.75",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                Our vision is to see every child grow into a passionate follower of Christ, equipped with the knowledge and love of God to impact their world.
              </motion.p>
            </motion.div>
          </div>
        </section>





        {/* Programs Section */}
        <section
              style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            backgroundColor: "#2a1e7a",
                color: "white",
            width: "100%",
            maxWidth: "100vw",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
                style={{
                fontSize: isMobile ? "24px" : "30px",
                  fontWeight: "bold",
                textAlign: "center",
                marginBottom: "40px",
                color: "#f59e0b",
              }}
            >
              UPCOMING CHILDREN PROGRAMS
            </motion.h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {loadingEvents ? (
                <p>Loading programs...</p>
              ) : eventsError ? (
                <p style={{ color: "red" }}>{eventsError}</p>
              ) : events.length === 0 ? (
                <p>No upcoming children programs found.</p>
              ) : (
                events.map((event, index) => (
              <motion.div
                    key={event._id || index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                      cursor: "pointer",
                      borderRadius: "8px",
                      backgroundImage: event.imageUrl ? `url(${event.imageUrl})` : `url(${childrenBanner})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minHeight: "200px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                    onClick={() => navigate("/Programs")}
                  >
                    <div
                  style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "16px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      }}
                    >
                      <h3
                  style={{
                          fontSize: "18px",
                    fontWeight: "bold",
                          marginBottom: "4px",
                          color: "white",
                        }}
                      >
                        {event.title}
                      </h3>
                      <p
                  style={{
                          color: "#f59e0b",
                    fontSize: "14px",
                          margin: 0,
                        }}
                      >
                        {event.startDate
                          ? new Date(event.startDate).toLocaleDateString() +
                            " " +
                            new Date(event.startDate).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                        {event.endDate
                          ? " - " +
                            new Date(event.endDate).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </p>
                    </div>
              </motion.div>
                ))
              )}
            </div>
          </div>
        </section>




        {/* Live Event Banner */}
        <section style={{
          backgroundColor: "#f59e0b",
          padding: isMobile ? "10px 10px" : "20px 30px",
          maxWidth: isMobile ? "90%" : "70%",
          margin: "30px auto",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "90vw",
        }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: isMobile ? "0 5px" : "0 16px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: isMobile ? "8px" : "16px",
                fontWeight: 600,
                marginBottom: isMobile ? "4px" : 0,
                color: "#2a1e7a",
              }}
            >
              JOIN US: SUNDAY SCHOOL WITH OUR CHILDREN MINISTRY
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#3a2e8a" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                backgroundColor: "#2a1e7a",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "14px",
                borderRadius: "4px",
              }}
              onClick={() => window.location.href = "https://www.ceibz1.online/"}
            >
              JOIN NOW
            </motion.button>
          </motion.div>
        </section>
      </div>

      <Footer />
      <FloatingLiveChat />
    </div>
  );
};

export default Children;