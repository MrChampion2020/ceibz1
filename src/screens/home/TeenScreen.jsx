import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import teensBackground from "../../assets/teen.jpg";
import childrenImage from "../../assets/child.jpg";
import globalKidsImage from "../../assets/lwfs.jpg";
import video1 from '../../assets/teevobible.mp4';
import video2 from '../../assets/teevo.mp4';
import image1 from '../../assets/teensmin.jpg';
import image2 from '../../assets/teen.jpg';
import image3 from '../../assets/youth.png';

const TeenScreen = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselAutoplay, setCarouselAutoplay] = useState(true);
  const [currentDot, setCurrentDot] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const { theme } = useTheme();

  const heroRef = useRef(null);
  const introRef = useRef(null);
  const activitiesRef = useRef(null);
  const visionRef = useRef(null);
  const programsRef = useRef(null);

  // Carousel banners for Teens Ministry
  const carouselBanners = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
  ];

  const activities = [
    {
      title: "BIBLE STUDIES",
      image: image1,
      description: "Engaging Bible studies tailored for teens to deepen their faith.",
    },
    {
      title: "COMMUNITY EVENTS",
      image: image2,
      description: "Fun community events to build friendships and serve others.",
    },
    {
      title: "WORSHIP SESSIONS",
      image: image3,
      description: "Vibrant worship sessions to connect teens with God.",
    },
  ];

  const programs = [
    {
      title: "Sunday Youth Service",
      image: image1,
      date: "Sunday, 10:30 AM",
    },
    {
      title: "Teen Prayer Night",
      image: image2,
      date: "Wednesday, 6 PM",
    },
    {
      title: "Youth Camp",
      image: image3,
      date: "Coming Soon",
    },
    {
      title: "Leadership Training",
      image: image1,
      date: "Coming Soon",
    },
  ];

  const textSectionIntro = `The Loveworld Teens Ministry is dedicated to empowering teenagers with the Word of God, fostering a community of faith, growth, and service.`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: introRef, id: "intro" },
        { ref: activitiesRef, id: "activities" },
        { ref: visionRef, id: "vision" },
        { ref: programsRef, id: "programs" },
      ];

      for (const section of sections) {
        if (!section.ref.current) continue;

        const element = section.ref.current;
        const rect = element.getBoundingClientRect();
        const topPosition = rect.top + window.scrollY;
        const bottomPosition = topPosition + rect.height;

        if (scrollPosition >= topPosition && scrollPosition <= bottomPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let interval;
    if (carouselAutoplay) {
      interval = setInterval(() => {
        setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselBanners.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [carouselAutoplay, carouselBanners.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDot((prevDot) => (prevDot + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCarouselPrev = () => {
    setCarouselAutoplay(false);
    setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselBanners.length) % carouselBanners.length);
    setTimeout(() => setCarouselAutoplay(true), 10000);
  };

  const handleCarouselNext = () => {
    setCarouselAutoplay(false);
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselBanners.length);
    setTimeout(() => setCarouselAutoplay(true), 10000);
  };

  const handleDotClick = (index) => {
    setCurrentDot(index);
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
    }}>
      <Navbar />

      {/* Main Content */}
      <div style={{ paddingTop: "80px" }}>
        {/* Hero Section with Carousel */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            height: "calc(100vh - 80px)",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 9, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  src={carouselBanners[carouselIndex].image}
                  alt="Teens Ministry Carousel"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(42, 30, 122, 0.7)",
                  zIndex: 1,
                }}></div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                transform: "translateY(-50%)",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px",
                zIndex: 10,
              }}
            >
              <motion.button
                whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleCarouselPrev}
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleCarouselNext}
              >
                <FaChevronRight />
              </motion.button>
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                position: "absolute",
                top: "30%",
                left: 0,
                right: 0,
                transform: "translate(-50%, -50%)",
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
                WELCOME TO <br /> <p style={{fontSize: "60px", fontWeight: 900}}> TEENS MINISTRY </p>
              </motion.h1>
            </motion.div>
          </div>
        </section>

        {/* Intro Section (Teens Ministry) */}
        <section
          ref={introRef}
          style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            paddingTop: "100px",
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
            position: "relative",
            zIndex: 0,
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: isMobile ? "95%" : "80%",
                  margin: isMobile ? "0 auto" : "0",
                  overflow: "hidden",
                }}
              >
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.5 }}
                  src={teensBackground}
                  alt="Teens Ministry Intro"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                style={{ marginTop: isMobile ? "24px" : "0" }}
              >
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  style={{
                    fontSize: isMobile ? "24px" : "30px",
                    fontWeight: "bold",
                    color:  theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    marginBottom: "16px",
                  }}
                >
                  ABOUT TEENS MINISTRY
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{
                    color: theme === "dark" ? "#ffffff" : "#333333",
                    lineHeight: "1.75",
                    marginBottom: "24px",
                    fontSize: "16px",
                  }}
                >
                  {textSectionIntro}
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
                    transition={{duration: 0.5, delay: 1}}
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
                  onClick={() => navigate("/Contact")}
                >
                  GET INVOLVED
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Activities Section (Adapted from Children's Ministry) */}
        <section
          ref={activitiesRef}
          style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.3, type: "spring" }}
                  whileHover={{ y: -10, scale: 1.02 }}
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
                    <motion.img
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={{ duration: 0.5 }}
                      src={activity.image}
                      alt={activity.title}
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
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.2 }}
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "12px",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      {activity.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
                      style={{
                        color: theme === "dark" ? "#cccccc" : "#333333",
                        marginBottom: "16px",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                      {activity.description}
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
                      transition={{ duration: 0.5, delay: index * 0.3 + 0.6 }}
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
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section (Quote Section) */}
        <section
          ref={visionRef}
          style={{
            position: "relative",
            padding: isMobile ? "60px 16px" : "80px 32px",
            backgroundColor: "#2a1e7a",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${teensBackground})`,
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
                The Loveworld Teens Ministry empowers teenagers to live for Christ.
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
                We foster a community where teens grow in faith, serve others, and discover their divine purpose.
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
                Our vision is to raise a generation of passionate, God-loving teens to impact the world.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Programs Section */}
        <section
          ref={programsRef}
          style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            backgroundColor: "#2a1e7a",
            color: "white",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
                color: "#f59e0b",
              }}
            >
              UPCOMING PROGRAMS
            </motion.h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: "20px",
            }}>
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2, type: "spring" }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  onClick={() => navigate("/Programs")}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={program.image}
                    alt={program.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "16px",
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    }}
                  >
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {program.title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                      style={{
                        color: "#f59e0b",
                        fontSize: "14px",
                      }}
                    >
                      {program.date}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "32px",
              }}
            >
              <div style={{ display: "flex", gap: "8px" }}>
                {[0, 1, 2, 3].map((dot) => (
                  <motion.button
                    key={dot}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: dot === currentDot ? "#f59e0b" : "#9ca3af",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    aria-label={`Go to slide ${dot + 1}`}
                    onClick={() => handleDotClick(dot)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Live Event Banner */}
        <section style={{
          backgroundColor: "#f59e0b",
          padding: isMobile ? "10px 10px" : "20px 30px",
          maxWidth: isMobile ? "90%" : "70%",
          margin: "30px auto",
          borderRadius: "10px",
        }}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 16px",
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
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: 600,
                marginBottom: isMobile ? "14px" : 0,
                color: "#2a1e7a",
              }}
            >
              HAPPENING LIVE: SUNDAY SERVICE WITH PASTOR JOE AGBAJE
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
              onClick={() => navigate("/LiveStream")}
            >
              WATCH LIVE
            </motion.button>
          </motion.div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TeenScreen;




// import React, { useState } from 'react';
// import { useMediaQuery } from 'react-responsive';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter} from 'react-icons/fa';
// import logo from './logo.png';
// import kingschat from "../../assets/kingschat.png";
// import { useNavigate } from "react-router-dom";
// import video1 from '../../assets/teevobible.mp4';
// import video2 from '../../assets/teevo.mp4';
// import image1 from '../../assets/teevolution.jpg';
// import image2 from '../../assets/teen.jpg';
// import image3 from '../../assets/youth.png';
// import backgroundImage  from '../../assets/teen.jpg';
// import Navbar from '../../components/Navbar';




// const TeenScreen = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
//   const [flippedIndex, setFlippedIndex] = useState(null); // To track which image is flipped
//   const [currentDay, setCurrentDay] = useState(''); // For schedule buttons
//   const [activeSection, setActiveSection] = useState(null);
//   const [showMinistries, setShowMinistries] = useState(false);
  
//   const schedule = {
//     Monday: "--:--",
//     Tuesday: "--:--",
//     Wednesday: "6:00 PM",
//     Thursday: "--:--",
//     Friday: "6:00 PM",
//     Saturday: "--:--",
//     Sunday: "10:30 AM"
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const handleFlip = (index) => {
//     setFlippedIndex(index === flippedIndex ? null : index); // Toggle flip state
//   };

//   const navigation = useNavigate();

//   {var uniqueTexts = [
//     "Welcome to the Loveworld Teens Ministry, Join us to take Teevo to Every Teenager. Click here to be a part",
//     "Every Teenager has a place in the Teens Church, Enjoy your experience! Write to get in touch",
//     "We are thrilled to have you here! Got a question let us."
//   ];}

//   return (    
//     <div>
//      <Navbar 
//       />
 
//       <div style={{ width: "100%", height: "100%", margin: 'auto' }}>
     


//       <div
//       style={{
//         position: 'relative',  // Keep the content on top of the background
//         width: '100%',
//         height: '40%',  // Set height to fit your design
//         backgroundImage: `url(${backgroundImage})`,  // Replace with your background image URL
//         backgroundSize: 'cover',  // Cover the entire div
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         color: 'white',
//         textAlign: 'center',
//         zIndex: -1,
//         marginTop: isMobile ? '15%' : '5%'
       
//       }}
//     >
//       <h1
//         style={{
//           fontSize:  isMobile ? '20px' : '30px',
//           fontWeight: 'bold',
//           zIndex: 1,  // Keep text above the background
//           margin: 0,
//            // Transparent overlay effect
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         width: '100%',
//         height: '100%',
//         padding: 20
//         }}
//       >
//         Welcome to <br /> Loveworld Teens Ministry <br /> Ibadan Zone 1
//       </h1>
//     </div>

//      {/* Section 1: Image Flip Cards */}
// <section style={{
//   display: 'flex',
//   flexDirection: isMobile ? 'column' : 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '20px',
//   gap: '20px'
// }}>
//   {/* Array of unique texts for each image */}

//   {[image1, image2, image3].map((image, index) => (
//     <div 
//       key={index}
//       style={{
//         width: isMobile ? '100%' : '400px',
//         height: '300px',
//         position: 'relative',
//         perspective: '1000px',
//         cursor: 'pointer'
//       }}
//       onClick={() => handleFlip(index)}
//     >
//       <div style={{
//         width: isMobile ? '100%' : '100%',
//         height: '100%',
//         transition: 'transform 0.8s',
//         transformStyle: 'preserve-3d',
//         transform: flippedIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
//       }}>
//         {/* Front Side */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           backfaceVisibility: 'hidden'
//         }}>
//           <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
//         </div>

//         {/* Back Side */}
//         <div style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           backfaceVisibility: 'hidden',
//           backgroundColor: 'black',
//           color: 'white',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           transform: 'rotateY(180deg)'
//         }}>
//           <p style={{
//             textAlign: 'center',
//             padding: '20px',
//             fontSize: '14px', 
//           }}
          
//           onClick={() => navigation("/Contact")}
//           >
//             {/* Display unique text for each image */}
//             {uniqueTexts[index]}
            
//           </p>
//         </div>
//       </div>
//     </div>
//   ))}
// </section>

//       {/* Section 2: Videos */}
//       <section style={{
//         display: 'flex',
//         flexDirection: isMobile ? 'column' : 'row',
//         justifyContent: 'center',
//         padding: '20px',
//         gap: '20px'
//       }}>
//         <div style={{ flex: 1 }}>
//           <video controls style={{ width: '100%' }}>
//             <source src={video1} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//         <div style={{ flex: 1 }}>
//           <video controls style={{ width: '100%' }}>
//             <source src={video2} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       </section>

//       {/* Section 3: Schedule */}
//       <section style={{
//         backgroundColor: 'rgba(0, 0, 0, 0.1)',
//         padding: '50px',
//         textAlign: 'center',
//         width: '100%',
//       }}>
//         <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Our Schedule</h1>
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
//           {Object.keys(schedule).map((day) => (
//             <button key={day} onClick={() => setCurrentDay(day)} style={{
//               padding: '10px 20px',
//               backgroundColor: 'orange',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontSize: '1rem'
//             }}>
//               {day}
//             </button>
//           ))}
//         </div>
//         <div style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           gap: '10px',
//           padding: '20px'
//         }}>
//           {Object.keys(schedule).map((day, index) => (
//             <div key={index} style={{
//               width: '80px',
//               height: '60px',
//               backgroundColor: 'rgba(255, 255, 255, 0.9)',
//               color: 'black',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: '5px',
//               fontWeight: 700
//             }}>
//               {currentDay === day ? schedule[day] : '--:--'}
//             </div>
//           ))}
//         </div>
//       </section>

      

      
//       {/* Section 6: Useful Links */}
//       <div
//         style={{
//           backgroundColor: "rgba(0, 0, 0, 0.9)",
//           backgroundSize: "cover",
//           padding: "30px 10px",
//           width: "100%",
//           height: "100%",
//           color: "white",
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           margin: "auto",
//           gap: '20px',
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
//             style={{ 
//               width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5',
//             }}
//             onClick={() => {
//               navigation("/LiveStream");
//             }}
//           >
//             Partnership
//           </a>


//           <a
//             href=""
//             style={{ 
//               width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5',
//              }}
//             onClick={() => {
//               navigation("/Contact");
//             }}
//           >
//             Testify
//           </a>

          
//           <a
//             href=""
//             style={{ 
//               width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5',
//              }}

//             onClick={() => {
//               navigation("/");
//             }}
//           >
//             Programs
//           </a>
//           <a href="https://rhapsodyofrealities.org/" style={{ textDecoration: "none" }}>
//             Rhapsody
//           </a>
//           <a
//             href="https://healingstreams.tv/"
//             style={{ 
              
//               width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5',
//             }}
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
//   style={{
//     width: '100%', 
//     textDecoration: "none", 
//     display: 'flex', 
//     flexDirection: 'row', 
//     alignItems: 'center',  // Ensures the icon and text are aligned vertically
//     gap: '10px',           // Adds spacing between the icon and the text
//     color: 'inherit',      // Ensures link color stays consistent
//     fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//     lineHeight: '1.5',     // Adds some height consistency between text and icon
//   }}
// >
//   <FaMapMarkerAlt style={{ fontSize: '18px' }} /> 
//   CVHQ+R4, Ibadan 200285, Oyo
// </a>


//           <a
//             href=""
//             style={{ 
//               width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5',
//              }}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//            <FaPhoneAlt />  +234 0000 0000 00000
//           </a>
//           <a
//             href=""
//             style={{  width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5', }}
//             onClick={() => {
//               navigation("/Contact");
//             }}
//           >
//            <FaEnvelope /> info@ceibz1.com
//           </a>
//           <a
//             href=""
//             style={{ 
//               width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5',
//              }}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//           <FaGlobe />  www.ceibz1.com
//           </a>
//           <a
//             href=""
//             style={{ 
              
//               width: '100%', 
//               textDecoration: "none", 
//               display: 'flex', 
//               flexDirection: 'row', 
//               alignItems: 'center',  // Ensures the icon and text are aligned vertically
//               gap: '10px',           // Adds spacing between the icon and the text
//               color: 'inherit',      // Ensures link color stays consistent
//               fontSize: '16px',      // Adjust the font size to ensure consistent icon size
//               lineHeight: '1.5',
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
//           width: '100vw',
//           gap: '20%'
//         }}
//       >
         
//           <div style={{ display: "flex", padding: '5px', flexDirection: "row", gap: "20px", margin: isMobile ? "auto" : "auto 0%"}}>
//         <a href="https://kingschat.com" style={{ textDecoration: "none" }}>
//         <img
//               src={kingschat}
//               alt="Church Logo"
//               style={{ width: "24px", height: "auto" }}
//               onClick={() => navigation("/")}
//             />
//   </a>
//   <a href="https://www.facebook.com/ceibz1" style={{ textDecoration: "none" }}>
//     <FaFacebook size={24} /> 
//   </a>
//   <a href="https://www.youtube.com/@ChristEmbassyibz1" style={{ textDecoration: "none" }}>
//     <FaYoutube size={24} /> 
//   </a>
//   <a href="https://instagram.com" style={{ textDecoration: "none" }}>
//     <FaInstagram size={24} /> 
//   </a>
//   <a href="https://twitter.com" style={{ textDecoration: "none" }}>
//     <FaTwitter size={24} /> 
//   </a>
//         </div>
//         <div style={{ display: "flex", flexDirection: "row", padding: '5px', gap: "10px", margin: isMobile ? "auto" : "auto"}}>
//           {/* <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a> */}
         
//             <p>&copy; {new Date().getFullYear()} 
              
//             <a
//             href=""
//             style={{ textDecoration: "none", padding: '6px'}}
//             onClick={() => {
//               navigation("/");
//             }}
//           >
//             Christ Embassy Ibadan Zone 1
//           </a>
//             </p>

//         </div>
//       </footer>

//     </div>
//     </div>
//   );
// };

// export default TeenScreen;
