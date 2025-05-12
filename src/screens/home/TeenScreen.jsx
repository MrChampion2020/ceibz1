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
            // height: "calc(100vh - 80px)",
            height: isMobile ? "500px" : "calc(100vh - 0px)",
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
            paddingTop: isMobile ? "50px" : "100px",
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


