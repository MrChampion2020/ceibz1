import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import pro1 from "../../assets/rownigeria.jpg";
import pro2 from "../../assets/reachout.jpg";
import pro3 from "../../assets/super.jpg";
import pro4 from "../../assets/youth.png";
import pro5 from "../../assets/kids.jpg";
import pro6 from "../../assets/ssunday.jpg";
import provideo1 from "../../assets/kidsvideo.mp4";
import provideo2 from "../../assets/kidsvid.mp4";
import provideo3 from "../../assets/teevobible.mp4";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";

const ProgramScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const carouselImages = [pro6, pro3, pro4];

  const events = [
    { title: "Super Sunday With Pst. Joe Agbaje", date: "2025-05-11" },
    { title: "With Pastor Joe Agbaje", date: "2025-05-11" },
  ];

  const blogItems = [
    {
      type: "image",
      src: pro1,
      title: "Community Outreach",
      date: "2024-06-01",
      description:
        "Join us for our annual community outreach program where we serve our local community.",
    },
    {
      type: "video",
      src: provideo1,
      title: "Worship Night Highlights",
      date: "2024-05-15",
    },
    {
      type: "image",
      src: pro2,
      title: "Bible Study Series",
      date: "2024-07-01",
      description:
        "Dive deep into the Word with our new Bible study series starting this July.",
    },
    {
      type: "video",
      src: provideo3,
      title: "Youth Conference Recap",
      date: "2024-04-20",
    },
    {
      type: "image",
      src: pro5,
      title: "Missions Trip",
      date: "2024-08-10",
      description:
        "Follow our team as they embark on a life-changing missions trip to South America.",
    },
    {
      type: "video",
      src: provideo2,
      title: "Easter Service Highlights",
      date: "2024-04-01",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(events[0].date) - new Date();
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item.type === "video") setIsFullscreen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsFullscreen(false);
  };

  const handleContactClick = () => {
    navigate("/Contact");
  };

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
        {/* Carousel */}
        <div
          style={{
            position: "relative",
            height: "400px",
            overflow: "hidden",
            marginTop: isMobile ? "80px" : "80px",
          }}
        >
          <AnimatePresence initial={false} custom={currentSlide}>
            <motion.img
              key={currentSlide}
              src={carouselImages[currentSlide]}
              custom={currentSlide}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}

            />

            
          </AnimatePresence>


        </div>

        {/* Events Area */}
        <section
          style={{
            padding: "20px",
            backgroundColor: theme === "dark" ? "#111111" : "black",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: isMobile ? "20px" : "0",
                }}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    fontSize: "40px",
                    marginRight: "20px",
                    color: "#f59e0b",
                  }}
                >
                  📅
                </motion.div>
                <div>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ margin: "0", fontSize: "24px" }}
                  >
                    Upcoming Events
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{ margin: "5px 0 0", fontSize: "18px" }}
                  >
                    {events[0].title}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{
                      margin: "0",
                      fontSize: "14px",
                      color: theme === "dark" ? "#cccccc" : "#666",
                    }}
                  >
                    {events[0].date}
                  </motion.p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: isMobile ? "100%" : "50%",
                }}
              >
                {Object.entries(timeLeft).map(([unit, value], index) => (
                  <motion.div
                    key={unit}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    style={{ textAlign: "center" }}
                  >
                    <div style={{ fontSize: "36px", fontWeight: "bold" }}>
                      {value}
                    </div>
                    <div
                      style={{ fontSize: "14px", textTransform: "uppercase" }}
                    >
                      {unit}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Programs Area */}
        <section
          style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}
        >
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "20px",
              fontWeight: 600,
              color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
            }}
          >
            Upcoming Programs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {blogItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.02, y: -10 }}
                style={{
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow:
                    theme === "dark"
                      ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                      : "0 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleItemClick(item)}
              >
                {item.type === "image" ? (
                  <>
                    <img
                      src={item.src}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        padding: "15px",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        color: theme === "dark" ? "#ffffff" : "#000000",
                      }}
                    >
                      <div>
                        <motion.h3
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          style={{ margin: "0 0 10px" }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          style={{
                            margin: "0 0 10px",
                            fontSize: "14px",
                            color: theme === "dark" ? "#cccccc" : "#666",
                          }}
                        >
                          {item.date}
                        </motion.p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#3a2e8a" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{
                          backgroundColor: "#2a1e7a",
                          color: "white",
                          border: "none",
                          padding: "10px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick();
                        }}
                      >
                        Contact Us
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div style={{ position: "relative", height: "100%" }}>
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={item.src}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      muted
                      loop
                      playsInline
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        padding: "15px",
                      }}
                    >
                      <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ margin: "0 0 10px" }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{ margin: "0 0 10px", fontSize: "14px" }}
                      >
                        {item.date}
                      </motion.p>
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#3a2e8a" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{
                          backgroundColor: "#2a1e7a",
                          color: "white",
                          border: "none",
                          padding: "10px 8px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactClick();
                        }}
                      >
                        Contact Us
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Modal for selected item */}
        {selectedItem && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                borderRadius: "8px",
                overflow: "auto",
                maxWidth: isFullscreen ? "100%" : "80%",
                maxHeight: isFullscreen ? "100%" : "80%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {selectedItem.type === "image" ? (
                <>
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      maxHeight: "50%",
                    }}
                  />
                  <div
                    style={{
                      padding: "20px",
                      flexGrow: 1,
                      overflowY: "auto",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {selectedItem.title}
                    </motion.h2>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {selectedItem.date}
                    </motion.p>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {selectedItem.description}
                    </motion.p>
                  </div>
                </>
              ) : (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleContactClick}
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProgramScreen;
