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
import api from '../../api';
import axios from 'axios';

const ProgramScreen = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const videoRefs = useRef([]);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const carouselImages = [pro6, pro3, pro4];
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${api}/api/events/upcoming`)
      .then(res => setEvents(res.data.events || []))
      .catch(() => setError('Failed to fetch events'))
      .finally(() => setLoading(false));
  }, []);

  // Filter only future events
  const now = new Date();
  const futureEvents = events.filter(e => e.startDate && new Date(e.startDate) > now);

  // Find the next upcoming event (by soonest startDate in the future)
  const nextEvent = futureEvents.length > 0 ? [...futureEvents].sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0] : null;

  // Filter events by category (future only)
  const filteredEvents = selectedCategory === 'all'
    ? futureEvents
    : futureEvents.filter(event => event.category === selectedCategory);

  // Get unique categories from events
  const categories = ['all', ...new Set(events.map(event => event.category).filter(Boolean))];

  // Remove blogItems and all references to it

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer for nextEvent
  useEffect(() => {
    if (!nextEvent || !nextEvent.startDate) return;
    const timer = setInterval(() => {
      const difference = new Date(nextEvent.startDate) - new Date();
      setTimeLeft({
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [nextEvent]);

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
            padding:   isMobile ? "10px" : "20px",
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
                    style={{ margin: "5px 0 0", fontSize: isMobile ? "12px" :  "18px", }}
                  >
                    {nextEvent ? nextEvent.title : "No events available"}
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
                    {nextEvent ? (nextEvent.startDate ? new Date(nextEvent.startDate).toLocaleString() : "") : ""}
                  </motion.p>
                  {nextEvent && nextEvent.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      style={{ margin: "0", fontSize: "14px", color: theme === "dark" ? "#cccccc" : "#666" }}
                    >
                      {nextEvent.description}
                    </motion.p>
                  )}
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

          {/* Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '16px 32px',
                  background: selectedCategory === category ? '#f59e0b' : 'transparent',
                  color: selectedCategory === category ? '#fff' : '#f59e0b',
                  border: '2px solid #f59e0b',
                  borderRadius: '32px',
                  fontSize: '18px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.2s',
                  marginBottom: '8px',
                }}
              >
                {category === 'all' ? 'All Events' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

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
            {filteredEvents.length === 0 ? (
              <div style={{ color: '#f59e0b', textAlign: 'center', padding: '40px 0' }}>No upcoming programs.</div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.02, y: -10 }}
                  style={{
                    background: '#111',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    marginBottom: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '340px',
                  }}
                  onClick={() => handleItemClick(event)}
                >
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#111' }}>
                    <div>
                      <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 600, margin: 0 }}>{event.title}</h3>
                      <div style={{ color: '#f59e0b', fontSize: '16px', margin: '8px 0 0' }}>{event.startDate ? new Date(event.startDate).toLocaleDateString() : ''}</div>
                    </div>
                    <button
                      style={{
                        marginTop: '24px',
                        background: '#2a1e7a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '16px 0',
                        fontSize: '18px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        width: '100%',
                      }}
                      onClick={handleContactClick}
                    >
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              ))
            )}
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
                    src={selectedItem.imageUrl}
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
                  src={selectedItem.videoUrl}
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
