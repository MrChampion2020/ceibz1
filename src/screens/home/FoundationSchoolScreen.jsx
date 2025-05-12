import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../components/ThemeProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import galleryImage1 from "../../assets/foundsch.jpg";
import galleryImage2 from "../../assets/fsgra1.jpeg";
import galleryImage3 from "../../assets/fsgrad.jpg";
import galleryImage4 from "../../assets/post_ftm.jpg";
import galleryImage5 from "../../assets/sidefs.jpg";

const FoundationSchoolScreen = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselAutoplay, setCarouselAutoplay] = useState(true);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const heroRef = useRef(null);
  const introRef = useRef(null);
  const curriculumRef = useRef(null);
  const graduationsRef = useRef(null);
  const programsRef = useRef(null);

  // Carousel images for Hero Section
  const carouselImages = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
    galleryImage5,
  ];

  // Curriculum classes
  const curriculum = [
    { title: "Class One", description: "The New Creation: Who the Christian is; your rights in Christ." },
    { title: "Class Two", description: "The Holy Spirit: The Person of the Holy Spirit; the gifts of the Holy Spirit." },
    { title: "Class Three", description: "Christian Doctrine." },
    { title: "Class Four", description: "Evangelism & Cell Ministry." },
    { title: "Class Five", description: "Christian Character." },
    { title: "Class Six", description: "The Local Assembly & Believers’ Loveworld Inc. aka Christ Embassy." },
    { title: "Class Seven", description: "New Media Technology." },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: introRef, id: "intro" },
        { ref: curriculumRef, id: "curriculum" },
        { ref: graduationsRef, id: "graduations" },
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
        setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [carouselAutoplay, carouselImages.length]);

  const handleCarouselPrev = () => {
    setCarouselAutoplay(false);
    setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
    setTimeout(() => setCarouselAutoplay(true), 10000);
  };

  const handleCarouselNext = () => {
    setCarouselAutoplay(false);
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    setTimeout(() => setCarouselAutoplay(true), 10000);
  };

  return (
    <div style={{
      width: "100%",
      height: "100%",
      backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
      overflowX: "hidden",
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
                animate={{ opacity: 1, scale: 1 }}
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
                  src={carouselImages[carouselIndex]}
                  alt="Foundation School Carousel"
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
                  backgroundColor: "rgba(42, 30, 122, 0.6)",
                  zIndex: 1,
                }}></div>
              </motion.div>
            </AnimatePresence>

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
              }}
            >
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  fontSize: isMobile ? "20px" : "30px",
                  fontWeight: "bold",
                  marginBottom: isMobile ? "10px" : "20px",
                }}
              >
                WELCOME TO <br /> <p style={{fontSize: "40px", fontWeight: 900}}>FOUNDATION SCHOOL</p> 
              </motion.h1>
            </motion.div>

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
          </div>
        </section>

        {/* Intro Section (What is Foundation School?) */}
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
                  src={galleryImage3}
                  alt="Foundation School Intro"
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
                    fontSize: isMobile ? "16px" : "30px",
                    fontWeight: "bold",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    marginBottom: "16px",
                  }}
                >
                  WHAT IS FOUNDATION SCHOOL?
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{
                    color: theme === "dark" ? "#cccccc" : "#333333",
                    lineHeight: "1.75",
                    marginBottom: "24px",
                    fontSize: "16px",
                  }}
                >
                  In foundation school, members are taught the basic doctrines of Christ. They are equipped for the work of the ministry. The Bible also admonishes that we be not children tossed to and fro by every wind of doctrine…hence the need to equip the saints. Knowledge is vital, and it marks the difference between success and failure. To have a successful Christian life, you require the basic knowledge to equip you for this walk with God. And that’s why we invite people to join the foundation school, because in the foundation school, you’d be taught the basic doctrines of Christ that’ll equip you for the higher life in God.
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "#3a2e8a" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  style={{
                    backgroundColor: "#2a1e7a",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                  onClick={() => navigate("/Contact")}
                >
                  CONTACT US
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section
          ref={curriculumRef}
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
              OUR CURRICULUM
            </motion.h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
              gap: "24px",
            }}>
              {curriculum.map((classItem, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.3, type: "spring" }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    padding: "20px",
                    textAlign: "center",
                    borderRadius: "4px",
                    boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
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
                    {classItem.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.3 + 0.4 }}
                    style={{
                      color: theme === "dark" ? "#cccccc" : "#333333",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    {classItem.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Previous Graduations Section */}
        <section
          ref={graduationsRef}
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
              backgroundImage: `url(${galleryImage1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 1,
            }}
          ></motion.div>

          <div style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1280px",
            margin: "0 auto",
            padding:  isMobile ? "0 8px" : "0 16px",
            color: "white",
          }}>
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              style={{
                fontSize: isMobile ? "16px" : "30px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "32px",
                color: "#f59e0b",
              }}
            >
              PREVIOUS GRADUATIONS
            </motion.h2>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                style={{
                  overflow: "hidden",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={galleryImage1}
                  alt="Graduation 1"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                style={{
                  overflow: "hidden",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={galleryImage2}
                  alt="Graduation 2"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                style={{
                  overflow: "hidden",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={galleryImage3}
                  alt="Graduation 3"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Live Event Banner */}
        <section
          ref={programsRef}
          style={{
            backgroundColor: "#f59e0b",
            padding: isMobile ? "5px 5px" : "20px 30px",
            maxWidth: isMobile ? "90%" : "70%",
            margin: "30px auto",
            borderRadius: "10px",
          }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding:  isMobile ? "0 5px" :  "0 16px",
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

export default FoundationSchoolScreen;
