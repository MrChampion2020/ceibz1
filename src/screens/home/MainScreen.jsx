import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../components/ThemeProvider";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import transparentImage from "../../assets/christembassy.jpg";
import church from "../../assets/church.jpg";
import pastorjoe from "../../assets/pjoe.jpg";
import lwfs from "../../assets/lwfs.jpg";
import children from "../../assets/child.jpg";
import teens from "../../assets/teensmin.jpg";
import reachout from "../../assets/maygcs.jpg";
import ssunday from "../../assets/ssunday.jpg";
import healingstreams from "../../assets/max.jpg";
import gcs from "../../assets/maygcs.jpg";
import reachoutworld from "../../assets/rownigeria.jpg";

import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const MainScreen = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselAutoplay, setCarouselAutoplay] = useState(true);
  const [currentDot, setCurrentDot] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const { theme } = useTheme();

  const heroRef = useRef(null);
  const pastorRef = useRef(null);
  const ministriesRef = useRef(null);
  const testimoniesRef = useRef(null);
  const visionRef = useRef(null);
  const programsRef = useRef(null);

  // Carousel banners
  const carouselBanners = [
    {
      image: reachout,
    },
    {
      image: ssunday,
    },
    {
      image: healingstreams,
    },
  ];

  const testimonies = [
    {
      text: "Christ Embassy is not just a local assembly; I witnessed this in my life ever since I joined the ministry",
      author: "Brother Silas Oladele",
    },
    {
      text: "Christ Embassy is not just a local assembly; it's a vision come true for me and my entire family! On a daily basis we experience the love of God!",
      author: "Sister Mary Peter",
    },
    {
      text: "Christ Embassy is not just a local assembly; I witnessed this in my life ever since I joined the ministry",
      author: "Brother Silas Oladele",
    },
  ];

  const programs = [
    {
      title: "Sunday Service",
      image: ssunday,
      date: "Every Sunday, 8:30AM",
    },
    {
      title: "Global Communion Service",
      image: gcs,
      date: "Sunday June 1st, 3PM",
    },
    {
      title: "Reach Out World",
      image: reachoutworld,
      date: "1st October 2025, 8AM",
    },
    {
      title: "Healing Streams",
      image: church,
      date: "Coming This July",
    },
  ];

  const ministries = [
    {
      title: "FOUNDATION SCHOOL",
      image: lwfs,
      description:
        "The foundation school constitutes the bedrock of the ministry. They are equipped for the work of the ministry. The Bible and atmosphere in the foundation school helps to erase every wind of doctrine, hence the need to go through the levels.",
    },
    {
      title: "CHILDREN MINISTRY",
      image: children,
      description:
        "The Children's Ministry was provide the children with the guidance of the Holy Spirit as they learn to walk with God. We love, train and nurture the children who are molded by our message and the ministry's vision.",
    },
    {
      title: "TEENS MINISTRY",
      image: teens,
      description:
        "The Teens Ministry focuses on creating an environment that demonstrates the character of the Spirit present in Christ's teachings. We are committed to Christ, the vision of our Ministry and what changes in the world.",
    },
  ];

  const textSectionJoe = `The man of God Highly Esteemed Pastor Joe Agbaje is the highly revered Zonal Pastor of Christ Embassy 
  Ibadan Zone 1, an ardent follower of the President of the Loveworld Nation Rev. Chris Oyakhilome DSc. DSc. DD. 
  Over the years, he has demonstrated the power of the Word in teaching, healing the sick, and setting the captives free. 
  Every meeting with him is epoch-making!`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const sections = [
        { ref: heroRef, id: "hero" },
        { ref: pastorRef, id: "pastor" },
        { ref: ministriesRef, id: "ministries" },
        { ref: testimoniesRef, id: "testimonies" },
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
        setCarouselIndex(
          (prevIndex) => (prevIndex + 1) % carouselBanners.length
        );
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
    setCarouselIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselBanners.length) % carouselBanners.length
    );
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setCarouselAutoplay(true), 10000);
  };

  const handleCarouselNext = () => {
    setCarouselAutoplay(false);
    setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselBanners.length);
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setCarouselAutoplay(true), 10000);
  };

  const handleDotClick = (index) => {
    setCurrentDot(index);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
        color: theme === "dark" ? "#ffffff" : "#000000",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div style={{ paddingTop: "80px" }}>
        {/* Live Service Banner - positioned above both carousel and pastor section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            position: "absolute", // Changed from absolute to fixed
            bottom: -60, // Position right below the navbar
            left: 0,
            right: 0,
            backgroundColor: "#f59e0b",
            padding: "16px",
            zIndex: 1000,
            maxWidth: isMobile ? "95%" : "70%",
            margin: "0 auto",
            borderRadius: "4px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "5px" : "0",
            }}
          >
            <p
              style={{
                fontSize: isMobile ? "10px" : "16px",
                fontWeight: isMobile ? 500 : 600,
                margin: 0,
                color: "#000000",
              }}
            >
              HAPPENING LIVE: SUNDAY SERVICE WITH PASTOR JOE AGBAJE
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: "#2a1e7a",
                color: "white",
                border: "none",
                padding: "8px 16px",
                fontSize: "14px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => navigate("/LiveStream")}
            >
              WATCH LIVE
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Section with Carousel */}
        <section
          ref={heroRef}
          style={{
            position: "relative",
            height: "calc(100vh - 50px)", // Changed from calc(100vh - 80px) to 50% of viewport height
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Carousel */}
          <div
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  src={
                    carouselBanners[carouselIndex].image || "/placeholder.svg"
                  }
                  alt="Carousel image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
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
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation */}
            <div
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
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
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
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
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
            </div>
          </div>
        </section>

        {/* Pastor Joe Section */}
        <section
          ref={pastorRef}
          style={{
            padding: isMobile ? "40px 16px" : "70px 32px",
            paddingTop: "100px", // Increased padding to account for the overlapping banner
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
            position: "relative", // Add position relative
            zIndex: 0, // Lower z-index than the banner
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: isMobile ? "95%" : "80%",
                  margin: isMobile ? "0 auto" : "0",
                  overflow: "hidden",
                }}
              >
                <img
                  src={pastorjoe || "/placeholder.svg"}
                  alt="Pastor Joe Agbaje"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ marginTop: isMobile ? "24px" : "0" }}
              >
                <h2
                  style={{
                    fontSize: isMobile ? "24px" : "30px",
                    fontWeight: "bold",
                    color:  theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    marginBottom: "16px",
                  }}
                >
                  TODAY WITH PASTOR JOE
                </h2>
                <p
                  style={{
                    color: theme === "dark" ? "#ffffff" : "#333333",
                    lineHeight: "1.75",
                    marginBottom: "24px",
                    fontSize: "16px",
                  }}
                >
                  {textSectionJoe}
                </p>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor:
                      theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                    border: `1px solid ${
                      theme === "dark" ? "#f59e0b" : "#2a1e7a"
                    }`,
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                  onClick={() => navigate("/Contact")}
                >
                  WRITE TO PASTOR
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Ministries Section */}
        <section
          ref={ministriesRef}
          style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
                color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
              }}
            >
              OUR MINISTRIES
            </motion.h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              {ministries.map((ministry, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
                    overflow: "hidden",
                    boxShadow:
                      theme === "dark"
                        ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                        : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "200px",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      src={ministry.image}
                      alt={ministry.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "12px",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      }}
                    >
                      {ministry.title}
                    </h3>
                    <p
                      style={{
                        color: theme === "dark" ? "#cccccc" : "#333333",
                        marginBottom: "16px",
                        fontSize: "14px",
                        lineHeight: "1.6",
                      }}
                    >
                      {ministry.description}
                    </p>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor:
                          theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        color: "white",
                      }}
                      style={{
                        backgroundColor: "transparent",
                        color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                        border: `1px solid ${
                          theme === "dark" ? "#f59e0b" : "#2a1e7a"
                        }`,
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        borderRadius: "4px",
                      }}
                      onClick={() => {
                        if (ministry.title === "FOUNDATION SCHOOL")
                          navigate("/foundationSchool");
                        if (ministry.title === "CHILDREN MINISTRY")
                          navigate("/children");
                        if (ministry.title === "TEENS MINISTRY")
                          navigate("/teens");
                      }}
                    >
                      LEARN MORE
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
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
              UPCOMING PROGRAMS
            </motion.h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                  onClick={() => navigate("/Programs")}
                >
                  <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "16px",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {program.title}
                    </h3>
                    <p
                      style={{
                        color: "#f59e0b",
                        fontSize: "14px",
                      }}
                    >
                      {program.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div
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
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor:
                        dot === currentDot ? "#f59e0b" : "#9ca3af",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    aria-label={`Go to slide ${dot + 1}`}
                    onClick={() => handleDotClick(dot)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonies Section */}
        <section
          ref={testimoniesRef}
          id="testimonies"
          style={{
            padding: isMobile ? "40px 16px" : "60px 32px",
            backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#000000",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
              initial={{ y: 20, opacity: 0 }}
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
              Hear what our testifiers have to say
            </motion.p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              {testimonies.map((testimony, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -8 }}
                  style={{
                    backgroundColor: theme === "dark" ? "#111111" : "#f9fafb",
                    padding: "32px",
                    position: "relative",
                    border: theme === "dark" ? "1px solid #333333" : "none",
                    borderRadius: "4px",
                    boxShadow:
                      theme === "dark"
                        ? "0 4px 6px rgba(193, 147, 10, 0.17)"
                        : "0 4px 6px rgba(57, 56, 56, 0.27)",
                  }}
                >
                  <div
                    style={{
                      color: "#f59e0b",
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                    }}
                  >
                    <div
                      style={{
                        color: "#f59e0b",
                        fontSize: "24px",
                        marginBottom: "24px",
                      }}
                    >
                      <FaQuoteLeft size={24} />
                    </div>
                  </div>
                  <p
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
                    {testimony.text}
                  </p>
                  <p
                    style={{
                      fontWeight: 500,
                      color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
                      fontSize: "14px",
                    }}
                  >
                    {testimony.author}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section
          ref={visionRef}
          style={{
            position: "relative",
            padding: isMobile ? "60px 16px" : "80px 32px",
            backgroundColor: "#2a1e7a",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${transparentImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
              zIndex: 1,
            }}
          ></div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "896px",
              margin: "0 auto",
              padding: "0 16px",
              color: "white",
            }}
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.75",
                  color: "#ffffff",
                }}
              >
                Christ Embassy is not just a local assembly; it's a vision.
              </p>

              <p
                style={{
                  lineHeight: "1.75",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                The Lord has called us to fulfill a very definite purpose, which
                is to take His divine presence to the peoples and nations of the
                world, and to demonstrate the character of His Spirit
                everywhere.
              </p>

              <p
                style={{
                  lineHeight: "1.75",
                  color: "#ffffff",
                  fontSize: "16px",
                }}
              >
                When you worship with us, you learn more than just the letters
                of the Word; you're imparted with and impacted by the Spirit of
                the Word. As we share God's Word, it takes root in you, and you
                become exactly what the Lord wants you to be. The Holy Spirit
                gets a hold of your life, and His vision becomes real to you and
                in your life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Live Service Banner */}
        <section
          style={{
            backgroundColor: "#f59e0b",
            padding: isMobile ? "10px 10px" : "20px 30px",
            maxWidth: isMobile ? "90%" : "70%",
            margin: "30px auto",
            borderRadius: "10PX",
          }}
        >
          <div
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
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: 600,
                marginBottom: isMobile ? "14px" : 0,
                color: "#2a1e7a",
              }}
            >
              HAPPENING LIVE: SUNDAY SERVICE WITH PASTOR JOE AGBAJE
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default MainScreen;

// import { useState, useEffect, useRef } from "react"
// import { useMediaQuery } from "react-responsive"
// import { useNavigate } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
// import { useTheme } from "../../components/ThemeProvider"
// import Navbar from "../../components/Navbar"
// import Footer from "../../components/Footer"
// import transparentImage from "../../assets/christembassy.jpg"
// import church from "../../assets/church.jpg"
// import pastorjoe from "../../assets/pjoe.jpg"
// import lwfs from "../../assets/lwfs.jpg"
// import children from "../../assets/child.jpg"
// import teens from "../../assets/teens.jpg"
// import reachout from "../../assets/reachout.jpg"
// import ssunday from "../../assets/ssunday.jpg"
// import healingstreams from "../../assets/hslhs.jpg"

// import { FaChevronLeft, FaChevronRight, FaQuoteLeft, } from "react-icons/fa"

// const MainScreen = () => {
//   const [activeSection, setActiveSection] = useState(null)
//   const [carouselIndex, setCarouselIndex] = useState(0)
//   const [carouselAutoplay, setCarouselAutoplay] = useState(true)
//   const [currentDot, setCurrentDot] = useState(0)
//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
//   const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
//   const navigate = useNavigate()
//   const { theme } = useTheme()

//   const heroRef = useRef(null)
//   const pastorRef = useRef(null)
//   const ministriesRef = useRef(null)
//   const testimoniesRef = useRef(null)
//   const visionRef = useRef(null)
//   const programsRef = useRef(null)

//   // Carousel banners
//   const carouselBanners = [
//     {
//       image: reachout,
//     },
//     {
//       image: ssunday,
//     },
//     {
//       image: healingstreams,
//     },
//   ]

//   const testimonies = [
//     {
//       text: "Christ Embassy is not just a local assembly; I witnessed this in my life ever since I joined the ministry",
//       author: "Brother Silas Oladele",
//     },
//     {
//       text: "Christ Embassy is not just a local assembly; it's a vision come true for me and my entire family! On a daily basis we experience the love of God!",
//       author: "Sister Mary Peter",
//     },
//     {
//       text: "Christ Embassy is not just a local assembly; I witnessed this in my life ever since I joined the ministry",
//       author: "Brother Silas Oladele",
//     },
//   ]

//   const programs = [
//     {
//       title: "Night of Prayer",
//       image: church,
//       date: "Friday, 7PM",
//     },
//     {
//       title: "Global Communion Service",
//       image: church,
//       date: "Sunday, 10AM",
//     },
//     {
//       title: "Reach Out Nigeria",
//       image: church,
//       date: "Saturday, 12PM",
//     },
//     {
//       title: "Healing Streams",
//       image: church,
//       date: "Coming Soon",
//     },
//   ]

//   const ministries = [
//     {
//       title: "FOUNDATION SCHOOL",
//       image: lwfs,
//       description:
//         "The foundation school constitutes the bedrock of the ministry. They are equipped for the work of the ministry. The Bible and atmosphere in the foundation school helps to erase every wind of doctrine, hence the need to go through the levels.",
//     },
//     {
//       title: "CHILDREN MINISTRY",
//       image: children,
//       description:
//         "The Children's Ministry was provide the children with the guidance of the Holy Spirit as they learn to walk with God. We love, train and nurture the children who are molded by our message and the ministry's vision.",
//     },
//     {
//       title: "TEENS MINISTRY",
//       image: teens,
//       description:
//         "The Teens Ministry focuses on creating an environment that demonstrates the character of the Spirit present in Christ's teachings. We are committed to Christ, the vision of our Ministry and what changes in the world.",
//     },
//   ]

//   const textSectionJoe = `The man of God Highly Esteemed Pastor Joe Agbaje is the highly revered Zonal Pastor of Christ Embassy
//   Ibadan Zone 1, an ardent follower of the President of the Loveworld Nation Rev. Chris Oyakhilome DSc. DSc. DD.
//   Over the years, he has demonstrated the power of the Word in teaching, healing the sick, and setting the captives free.
//   Every meeting with him is epoch-making!`

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + window.innerHeight / 2

//       const sections = [
//         { ref: heroRef, id: "hero" },
//         { ref: pastorRef, id: "pastor" },
//         { ref: ministriesRef, id: "ministries" },
//         { ref: testimoniesRef, id: "testimonies" },
//         { ref: visionRef, id: "vision" },
//         { ref: programsRef, id: "programs" },
//       ]

//       for (const section of sections) {
//         if (!section.ref.current) continue

//         const element = section.ref.current
//         const rect = element.getBoundingClientRect()
//         const topPosition = rect.top + window.scrollY
//         const bottomPosition = topPosition + rect.height

//         if (scrollPosition >= topPosition && scrollPosition <= bottomPosition) {
//           setActiveSection(section.id)
//           break
//         }
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => {
//     let interval
//     if (carouselAutoplay) {
//       interval = setInterval(() => {
//         setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselBanners.length)
//       }, 5000)
//     }
//     return () => clearInterval(interval)
//   }, [carouselAutoplay, carouselBanners.length])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentDot((prevDot) => (prevDot + 1) % 4)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const handleCarouselPrev = () => {
//     setCarouselAutoplay(false)
//     setCarouselIndex((prevIndex) => (prevIndex - 1 + carouselBanners.length) % carouselBanners.length)
//     // Resume autoplay after 10 seconds of inactivity
//     setTimeout(() => setCarouselAutoplay(true), 10000)
//   }

//   const handleCarouselNext = () => {
//     setCarouselAutoplay(false)
//     setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselBanners.length)
//     // Resume autoplay after 10 seconds of inactivity
//     setTimeout(() => setCarouselAutoplay(true), 10000)
//   }

//   const handleDotClick = (index) => {
//     setCurrentDot(index)
//   }

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
//         color: theme === "dark" ? "#ffffff" : "#000000",
//       }}
//     >
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div style={{ paddingTop: "80px" }}>
//         {/* Hero Section with Carousel */}
//         <section
//           ref={heroRef}
//           style={{
//             position: "relative",
//             height: "calc(100vh - 80px)",
//             width: "100%",
//             overflow: "hidden",
//           }}
//         >
//           {/* Carousel */}
//           <div
//             style={{
//               position: "relative",
//               height: "100%",
//               width: "100%",
//             }}
//           >
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={carouselIndex}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 1 }}
//                 style={{
//                   position: "absolute",
//                   inset: 0,
//                   height: "100%",
//                   width: "100%",
//                 }}
//               >
//                 <img
//                   src={carouselBanners[carouselIndex].image || "/placeholder.svg"}
//                   alt="Carousel image"
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     objectPosition: "center",
//                   }}
//                 />
//                 <div
//                   style={{
//                     position: "absolute",
//                     inset: 0,
//                     backgroundColor: "rgba(42, 30, 122, 0.3)",
//                     zIndex: 1,
//                   }}
//                 ></div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Carousel Navigation */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: 0,
//                 right: 0,
//                 transform: "translateY(-50%)",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "0 20px",
//                 zIndex: 10,
//               }}
//             >
//               <motion.button
//                 whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
//                 whileTap={{ scale: 0.9 }}
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   backgroundColor: "rgba(255, 255, 255, 0.2)",
//                   border: "none",
//                   color: "white",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//                 onClick={handleCarouselPrev}
//               >
//                 <FaChevronLeft />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
//                 whileTap={{ scale: 0.9 }}
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   backgroundColor: "rgba(255, 255, 255, 0.2)",
//                   border: "none",
//                   color: "white",
//                   cursor: "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//                 onClick={handleCarouselNext}
//               >
//                 <FaChevronRight />
//               </motion.button>
//             </div>
//           </div>

//           {/* Live Service Banner - positioned to overlap with pastor section */}
//           <motion.div
//             initial={{ y: 100, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.8 }}
//             style={{
//               position: "absolute",
//               bottom: 3, // Position to overlap with pastor section
//               left: 0,
//               right: 0,
//               transform: "translateY(50%)", // This ensures 50% is on carousel and 50% on pastor section
//               backgroundColor: "#f59e0b",
//               padding: "16px",
//               zIndex: 1000, // Increased z-index to ensure it stays on top
//               maxWidth: "900px",
//               margin: "0 auto",
//               borderRadius: "4px",
//               boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <div
//               style={{
//                 maxWidth: "800px",
//                 margin: "0 auto",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: isMobile ? "column" : "row",
//                 gap: isMobile ? "10px" : "0",
//               }}
//             >
//               <p style={{ fontSize: "16px", fontWeight: "500", margin: 0, color: "#000000" }}>
//                 HAPPENING LIVE: SUNDAY SERVICE WITH PASTOR JOE AGBAJE
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 style={{
//                   backgroundColor: "#2a1e7a",
//                   color: "white",
//                   border: "none",
//                   padding: "8px 16px",
//                   fontSize: "14px",
//                   cursor: "pointer",
//                   borderRadius: "4px",
//                 }}
//                 onClick={() => navigate("/LiveStream")}
//               >
//                 WATCH LIVE
//               </motion.button>
//             </div>
//           </motion.div>
//         </section>

//         {/* Pastor Joe Section */}
//         <section
//           ref={pastorRef}
//           style={{
//             padding: isMobile ? "40px 16px" : "60px 32px",
//             paddingTop: "100px", // Increased padding to account for the overlapping banner
//             backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
//             color: theme === "dark" ? "#ffffff" : "#000000",
//             position: "relative", // Add position relative
//             zIndex: 0, // Lower z-index than the banner
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "1280px",
//               margin: "0 auto",
//             }}
//           >
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
//                 gap: "30px",
//                 alignItems: "center",
//               }}
//             >
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 style={{
//                   position: "relative",
//                   width: "100%",
//                   maxWidth: isMobile ? "90%" : "80%",
//                   margin: isMobile ? "0 auto" : "0",
//                   overflow: "hidden",
//                 }}
//               >
//                 <img
//                   src={pastorjoe || "/placeholder.svg"}
//                   alt="Pastor Joe Agbaje"
//                   style={{
//                     width: "100%",
//                     height: "auto",
//                     objectFit: "cover",
//                     borderRadius: "5px"
//                   }}
//                 />
//               </motion.div>

//               <motion.div
//                 initial={{ x: 50, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 style={{ marginTop: isMobile ? "24px" : "0" }}
//               >
//                 <h2
//                   style={{
//                     fontSize: isMobile ? "24px" : "30px",
//                     fontWeight: "bold",
//                     color: "#f59e0b",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   TODAY WITH PASTOR JOE
//                 </h2>
//                 <p
//                   style={{
//                     color: theme === "dark" ? "#ffffff" : "#333333",
//                     lineHeight: "1.75",
//                     marginBottom: "24px",
//                     fontSize: "16px",
//                   }}
//                 >
//                   {textSectionJoe}
//                 </p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   style={{
//                     backgroundColor: "#2a1e7a",
//                     color: "white",
//                     border: "none",
//                     padding: "10px 20px",
//                     cursor: "pointer",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                   }}
//                   onClick={() => navigate("/Contact")}
//                 >
//                   WRITE TO PASTOR
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           </div>
//         </section>

//         {/* Ministries Section */}
//         <section
//           ref={ministriesRef}
//           style={{
//             padding: isMobile ? "40px 16px" : "60px 32px",
//             backgroundColor: theme === "dark" ? "#111111" : "#f8f9fa",
//           }}
//         >
//           <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
//             <motion.h2
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               style={{
//                 fontSize: isMobile ? "24px" : "30px",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 marginBottom: "40px",
//                 color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
//               }}
//             >
//               OUR MINISTRIES
//             </motion.h2>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
//                 gap: "24px",
//               }}
//             >
//               {ministries.map((ministry, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ y: 50, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.2 }}
//                   style={{
//                     backgroundColor: theme === "dark" ? "#1a1a1a" : "white",
//                     overflow: "hidden",
//                     boxShadow: theme === "dark" ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
//                     borderRadius: "4px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: "relative",
//                       height: "200px",
//                       width: "100%",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <motion.img
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.5 }}
//                       src={ministry.image}
//                       alt={ministry.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>
//                   <div style={{ padding: "20px" }}>
//                     <h3
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: "bold",
//                         marginBottom: "12px",
//                         color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
//                       }}
//                     >
//                       {ministry.title}
//                     </h3>
//                     <p
//                       style={{
//                         color: theme === "dark" ? "#cccccc" : "#333333",
//                         marginBottom: "16px",
//                         fontSize: "14px",
//                         lineHeight: "1.6",
//                       }}
//                     >
//                       {ministry.description}
//                     </p>
//                     <motion.button
//                       whileHover={{
//                         scale: 1.05,
//                         backgroundColor: theme === "dark" ? "#f59e0b" : "#2a1e7a",
//                         color: "white",
//                       }}
//                       style={{
//                         backgroundColor: "transparent",
//                         color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
//                         border: `1px solid ${theme === "dark" ? "#f59e0b" : "#2a1e7a"}`,
//                         padding: "8px 16px",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                         textTransform: "uppercase",
//                         borderRadius: "4px",
//                       }}
//                       onClick={() => {
//                         if (ministry.title === "FOUNDATION SCHOOL") navigate("/foundationSchool")
//                         if (ministry.title === "CHILDREN MINISTRY") navigate("/children")
//                         if (ministry.title === "TEENS MINISTRY") navigate("/teens")
//                       }}
//                     >
//                       LEARN MORE
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Programs Section */}
//         <section
//           ref={programsRef}
//           style={{
//             padding: isMobile ? "40px 16px" : "60px 32px",
//             backgroundColor: "#2a1e7a",
//             color: "white",
//           }}
//         >
//           <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
//             <motion.h2
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               style={{
//                 fontSize: isMobile ? "24px" : "30px",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 marginBottom: "40px",
//                 color: "#f59e0b",
//               }}
//             >
//               UPCOMING PROGRAMS
//             </motion.h2>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
//                 gap: "20px",
//               }}
//             >
//               {programs.map((program, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ y: 50, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ y: -5 }}
//                   style={{
//                     position: "relative",
//                     overflow: "hidden",
//                     cursor: "pointer",
//                     borderRadius: "4px",
//                   }}
//                   onClick={() => navigate("/Programs")}
//                 >
//                   <img
//                     src={program.image || "/placeholder.svg"}
//                     alt={program.title}
//                     style={{
//                       width: "100%",
//                       height: "180px",
//                       objectFit: "cover",
//                     }}
//                   />
//                   <div
//                     style={{
//                       position: "absolute",
//                       bottom: 0,
//                       left: 0,
//                       right: 0,
//                       padding: "16px",
//                       background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
//                     }}
//                   >
//                     <h3
//                       style={{
//                         fontSize: "16px",
//                         fontWeight: "bold",
//                         marginBottom: "4px",
//                       }}
//                     >
//                       {program.title}
//                     </h3>
//                     <p
//                       style={{
//                         color: "#f59e0b",
//                         fontSize: "14px",
//                       }}
//                     >
//                       {program.date}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 marginTop: "32px",
//               }}
//             >
//               <div style={{ display: "flex", gap: "8px" }}>
//                 {[0, 1, 2, 3].map((dot) => (
//                   <motion.button
//                     key={dot}
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                     style={{
//                       width: "8px",
//                       height: "8px",
//                       borderRadius: "50%",
//                       backgroundColor: dot === currentDot ? "#f59e0b" : "#9ca3af",
//                       border: "none",
//                       cursor: "pointer",
//                       padding: 0,
//                     }}
//                     aria-label={`Go to slide ${dot + 1}`}
//                     onClick={() => handleDotClick(dot)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonies Section */}
//         <section
//           ref={testimoniesRef}
//           id="testimonies"
//           style={{
//             padding: isMobile ? "40px 16px" : "60px 32px",
//             backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
//             color: theme === "dark" ? "#ffffff" : "#000000",
//           }}
//         >
//           <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
//             <motion.h2
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               style={{
//                 fontSize: isMobile ? "24px" : "30px",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 marginBottom: "16px",
//                 color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
//               }}
//             >
//               TESTIMONIES
//             </motion.h2>

//             <motion.p
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               style={{
//                 textAlign: "center",
//                 color: theme === "dark" ? "#9ca3af" : "#6b7280",
//                 marginBottom: "40px",
//                 fontSize: "14px",
//               }}
//             >
//               Hear what our testifiers have to say
//             </motion.p>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
//                 gap: "24px",
//               }}
//             >
//               {testimonies.map((testimony, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ y: 50, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.2 }}
//                   whileHover={{ y: -8 }}
//                   style={{
//                     backgroundColor: theme === "dark" ? "#111111" : "#f9fafb",
//                     padding: "32px",
//                     position: "relative",
//                     border: theme === "dark" ? "1px solid #333333" : "none",
//                     borderRadius: "4px",
//                     boxShadow: theme === "dark" ? "0 4px 6px rgba(193, 147, 10, 0.17)" : "0 4px 6px rgba(57, 56, 56, 0.27)",
//                   }}
//                 >
//                   <div
//                     style={{

//                       color: "#f59e0b",
//                       position: "absolute",
//                       top: "16px",
//                       left: "16px",
//                     }}
//                   >
//                   <div
//                 style={{
//                   color: "#f59e0b",
//                   fontSize: "24px",
//                   marginBottom: "24px",
//                 }}
//               >
//                 <FaQuoteLeft  size={24}/>
//               </div>
//                   </div>
//                   <p
//                     style={{
//                       color: theme === "dark" ? "#ffffff" : "#4b5563",
//                       marginBottom: "24px",
//                       position: "relative",
//                       zIndex: 10,
//                       paddingTop: "24px",
//                       fontSize: "14px",
//                       lineHeight: "1.6",
//                     }}
//                   >
//                     {testimony.text}
//                   </p>
//                   <p
//                     style={{
//                       fontWeight: 500,
//                       color: theme === "dark" ? "#f59e0b" : "#2a1e7a",
//                       fontSize: "14px",
//                     }}
//                   >
//                     {testimony.author}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Vision Section */}
//         <section
//           ref={visionRef}
//           style={{
//             position: "relative",
//             padding: isMobile ? "60px 16px" : "80px 32px",
//             backgroundColor: "#2a1e7a",
//           }}
//         >
//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               backgroundImage: `url(${transparentImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               opacity: 0.2,
//               zIndex: 1,
//             }}
//           ></div>

//           <div
//             style={{
//               position: "relative",
//               zIndex: 10,
//               maxWidth: "896px",
//               margin: "0 auto",
//               padding: "0 16px",
//               color: "white",
//             }}
//           >
//             <motion.h2
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               style={{
//                 fontSize: isMobile ? "24px" : "30px",
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 marginBottom: "32px",
//                 color: "#f59e0b",
//               }}
//             >
//               OUR VISION
//             </motion.h2>

//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "24px",
//                 textAlign: "center",
//               }}
//             >
//               <p
//                 style={{
//                   fontSize: "18px",
//                   lineHeight: "1.75",
//                   color: "#ffffff",
//                 }}
//               >
//                 Christ Embassy is not just a local assembly; it's a vision.
//               </p>

//               <p
//                 style={{
//                   lineHeight: "1.75",
//                   color: "#ffffff",
//                   fontSize: "16px",
//                 }}
//               >
//                 The Lord has called us to fulfill a very definite purpose, which is to take His divine presence to the
//                 peoples and nations of the world, and to demonstrate the character of His Spirit everywhere.
//               </p>

//               <p
//                 style={{
//                   lineHeight: "1.75",
//                   color: "#ffffff",
//                   fontSize: "16px",
//                 }}
//               >
//                 When you worship with us, you learn more than just the letters of the Word; you're imparted with and
//                 impacted by the Spirit of the Word. As we share God's Word, it takes root in you, and you become exactly
//                 what the Lord wants you to be. The Holy Spirit gets a hold of your life, and His vision becomes real to
//                 you and in your life.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Live Service Banner */}
//         <section
//           style={{
//             backgroundColor: "#f59e0b",
//             padding: isMobile ? "10px 10px" : "20px 30px",
//             maxWidth: isMobile ? "90%" : "70%",
//             margin: "30px auto",
//             borderRadius: "10PX"
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "1280px",
//               margin: "0 auto",
//               padding: "0 16px",
//               display: "flex",
//               flexDirection: isMobile ? "column" : "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <p
//               style={{
//                 fontSize: isMobile ? "14px" : "16px",
//                 fontWeight: 600,
//                 marginBottom: isMobile ? "14px" : 0,
//                 color: "#2a1e7a",
//               }}
//             >
//               HAPPENING LIVE: SUNDAY SERVICE WITH PASTOR JOE AGBAJE
//             </p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               style={{
//                 backgroundColor: "#2a1e7a",
//                 color: "white",
//                 border: "none",
//                 padding: "8px 16px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 borderRadius: "4px",
//               }}
//               onClick={() => navigate("/LiveStream")}
//             >
//               WATCH LIVE
//             </motion.button>
//           </div>
//         </section>
//       </div>

//       <Footer />
//     </div>
//   )
// }

// export default MainScreen
