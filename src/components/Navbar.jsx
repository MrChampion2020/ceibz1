
import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { useTheme } from "./ThemeProvider"
import { motion, AnimatePresence } from "framer-motion"
import { FaBars, FaTimes, FaChevronDown, FaGlobe, FaSun, FaMoon } from "react-icons/fa"
import logo from "../assets/logo.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showMinistries, setShowMinistries] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" })
  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "WATCH LIVE", path: "/LiveStream" },
    {
      name: "MINISTRIES",
      dropdown: true,
      items: [
        { name: "FOUNDATION SCHOOL", path: "/foundationSchool" },
        { name: "CHILDREN MINISTRY", path: "/children" },
        { name: "TEENS MINISTRY", path: "/teens" },
      ],
    },
    { name: "PROGRAMS", path: "/Programs" },
    { name: "TESTIFY", path: "/TestifyScreen" },
    { name: "GIVE", path: "/give" },
    { name: "CONTACT US", path: "/Contact" },
  ]

  return (
    <motion.header
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        height: "80px",
        left: 0,
        width: "100%",
        zIndex: 9999,
        backgroundColor: scrolled
          ? theme === "dark"
            ? "rgba(42, 30, 122, 0.95)"
            : "rgba(42, 30, 122, 0.95)"
          : theme === "dark"
            ? "rgba(42, 30, 122, 0.95)"
            : "rgba(42, 30, 122, 0.95)",
        transition: "background-color 0.3s ease",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo || "/placeholder.svg"}
            alt="Christ Embassy Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav
            style={{
              display: "flex",
              gap: isTablet ? "20px" : "30px",
            }}
          >
            {navLinks.map((link, index) =>
              link.dropdown ? (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={() => setShowMinistries(true)}
                  onMouseLeave={() => setShowMinistries(false)}
                >
                  <motion.div
                    whileHover={{ color: "#f59e0b" }}
                    style={{
                      color: "white",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {link.name}
                    <FaChevronDown size={12} />
                  </motion.div>
                  <AnimatePresence>
                    {showMinistries && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "200px",
                          backgroundColor: "#2a1e7a",
                          borderRadius: "0",
                          padding: "8px 0",
                          marginTop: "10px",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          zIndex: 1000,
                        }}
                      >
                        {link.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ backgroundColor: "#3a2e8a" }}
                            style={{
                              padding: "12px 16px",
                              color: "white",
                              fontSize: "14px",
                              cursor: "pointer",
                              transition: "background-color 0.2s",
                            }}
                            onClick={() => navigate(item.path)}
                          >
                            {item.name}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key={index}
                  whileHover={{ color: "#f59e0b" }}
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </motion.div>
              ),
            )}
          </nav>
        )}

        {/* Right Side Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Language Selector */}
          <motion.div whileHover={{ scale: 1.1 }} style={{ color: "white", cursor: "pointer" }}>
            <FaGlobe size={16} />
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "white", cursor: "pointer" }}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
          </motion.div>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <motion.div whileTap={{ scale: 0.9 }} style={{ color: "white", cursor: "pointer" }} onClick={toggleMenu}>
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#2a1e7a",
              overflow: "hidden",
            }}
          >
            {navLinks.map((link, index) =>
              link.dropdown ? (
                <div key={index}>
                  <motion.div
                    whileTap={{ backgroundColor: "#3a2e8a" }}
                    style={{
                      padding: "16px 24px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowMinistries(!showMinistries)}
                  >
                    {link.name}
                    <FaChevronDown
                      style={{
                        transform: showMinistries ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </motion.div>
                  <AnimatePresence>
                    {showMinistries && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            whileTap={{ backgroundColor: "#4a3e9a" }}
                            style={{
                              padding: "12px 24px 12px 40px",
                              color: "white",
                              fontSize: "14px",
                              backgroundColor: "#3a2e8a",
                              cursor: "pointer",
                              borderBottom:
                                idx !== link.items.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                            }}
                            onClick={() => {
                              navigate(item.path)
                              setMenuOpen(false)
                            }}
                          >
                            {item.name}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key={index}
                  whileTap={{ backgroundColor: "#3a2e8a" }}
                  style={{
                    padding: "16px 24px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate(link.path)
                    setMenuOpen(false)
                  }}
                >
                  {link.name}
                </motion.div>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar









// // import React, { useState, useEffect } from "react";
// // import { useMediaQuery } from "react-responsive";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// // import logo from "../assets/logo.png";
// // import blue from "../assets/blue.jpg";
// // import { useNavigate } from "react-router-dom";

// // const Navbar = () => {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
// //   const [showMinistries, setShowMinistries] = useState(false);

// //   const toggleMenu = () => {
// //     setMenuOpen(!menuOpen);
// //   };

// //   const navigation = useNavigate();

// //   return (
// //     <div>
// //       {/* Overlay Header and Content */}
// //       <div
// //         style={{
// //           position: "fixed",
// //           top: 0,
// //           left: 0,
// //           width: "100%",
// //           height: "100%",
// //           display: "flex",
// //           flexDirection: "column",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           zIndex: 1000,
// //         }}
// //       >
// //         <header
// //           style={{
// //             display: "flex",
// //             backgroundColor: "rgba(0, 0, 0, 0.4)",
// //             justifyContent: "space-between",
// //             width: "100%",
// //             alignItems: "center",
// //             padding: 20,
// //             zIndex: 1,
// //             borderBottom: "0.01px solid white",
// //           }}
// //         >
// //           <img
// //             src={logo}
// //             alt="Church Logo"
// //             style={{ width: "60px", height: "auto" }}
// //             onClick={() => navigation("/")}
// //           />
// //           {isMobile ? (
// //             <div
// //               style={{ color: "white", fontSize: "20px", cursor: "pointer" }}
// //               onClick={toggleMenu}
// //             >
// //               <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
// //             </div>
// //           ) : (
// //             <nav
// //               style={{
// //                 display: "flex",
// //                 gap: "70px",
// //                 color: "white",
// //                 marginRight: "5%",
// //                 fontWeight: 600,
// //               }}
// //             >
// //               <a
// //                 href=""
// //                 style={{ textDecoration: "none", color: "white" }}
// //                 onClick={() => {
// //                   navigation("/");
// //                 }}
// //               >
// //                 HOME
// //               </a>
// //               <a
// //                 href=""
// //                 style={{ textDecoration: "none", color: "white" }}
// //                 onClick={() => {
// //                   navigation("/LiveStream");
// //                 }}
// //               >
// //                 LIVE
// //               </a>
// //               <div
// //                 onMouseEnter={() => setShowMinistries(true)}
// //                 onMouseLeave={() => setShowMinistries(false)}
// //                 style={{ position: "relative", cursor: "pointer" }}
// //               >
// //                 <div style={{ textDecoration: "none", color: "white" }}>
// //                   MINISTRIES
// //                 </div>
// //                 {showMinistries && (
// //                   <div
// //                     style={{
// //                       position: "absolute",
// //                       width: "180px",
// //                       top: "20px",
// //                       left: 0,
// //                       backgroundColor: "rgba(0, 0, 0, 0.005)",
// //                       color: "white",
// //                       padding: "5px",
// //                       zIndex: 2,
// //                     }}
// //                   >
// //                     <a
// //                       href="#"
// //                       style={{ display: "block", marginBottom: "10px" }}
// //                       onClick={(e) => {
// //                         e.preventDefault(); // Prevent default anchor behavior (reload)
// //                         navigation("/foundationSchool");
// //                       }}
// //                     >
// //                       Foundation School
// //                     </a>

// //                     <a
// //                       href="#"
// //                       style={{ display: "block", marginBottom: "10px" }}
// //                       onClick={(e) => {
// //                         e.preventDefault();
// //                         navigation("/teens");
// //                       }}
// //                     >
// //                       Teens Ministry
// //                     </a>

// //                     <a
// //                       href="#"
// //                       style={{ display: "block" }}
// //                       onClick={(e) => {
// //                         e.preventDefault();
// //                         navigation("/children");
// //                       }}
// //                     >
// //                       Children Ministry
// //                     </a>
// //                   </div>
// //                 )}
// //               </div>
// //               <a
// //                 href="#testimonies"
// //                 style={{ textDecoration: "none", color: "white" }}
// //               >
// //                 TESTIMONIES
// //               </a>
// //               <a
// //                 href=""
// //                 style={{ textDecoration: "none", color: "white" }}
// //                 onClick={() => {
// //                   navigation("/Programs");
// //                 }}
// //               >
// //                 PROGRAMS
// //               </a>
// //               <a
// //                 href=""
// //                 style={{ textDecoration: "none", color: "white" }}
// //                 onClick={() => {
// //                   navigation("/give");
// //                 }}
// //               >
// //                 GIVE
// //               </a>
// //             </nav>
// //           )}
// //         </header>

// //         {/* Dropdown Menu for Mobile */}
// //         {menuOpen && isMobile && (
// //           <nav
// //             style={{
// //               position: "absolute",
// //               top: "100px",
// //               left: 0,
// //               width: "100%",
// //               height: "auto",
// //               backgroundImage: `url(${blue})`,
// //               backgroundSize: "cover",
// //               backgroundPosition: "center",
// //               backgroundColor: "rgba(0, 0, 0, 1)",
// //               display: "flex",
// //               flexDirection: "column",
// //               padding: "30px",
// //               fontSize: "16px",
// //               gap: 10,
// //               opacity: 1,
// //               borderBottomLeftRadius: "10px",
// //               borderBottomRightRadius: "10px",
// //               // borderTopLeftRadius: '10px',
// //               // borderTopRightRadius: '10px',
// //             }}
// //           >
// //             <a
// //               href=""
// //               style={{
// //                 textDecoration: "none",
// //                 color: "white",
// //                 borderBottom: "0.01px solid grey",
// //                 padding: "10px 0",
// //               }}
// //               onClick={() => {
// //                 navigation("/");
// //               }}
// //             >
// //               HOME
// //             </a>
// //             <a
// //               href=""
// //               style={{
// //                 textDecoration: "none",
// //                 color: "white",
// //                 padding: "10px 0",
// //                 borderBottom: "0.01px solid grey",
// //               }}
// //               onClick={toggleMenu}
// //             >
// //               LIVE
// //             </a>
// //             <div
// //               onMouseEnter={() => setShowMinistries(true)}
// //               onMouseLeave={() => setShowMinistries(false)}
// //               style={{
// //                 position: "relative",
// //                 cursor: "pointer",
// //                 padding: "10px 0",
// //                 borderBottom: "0.01px solid grey",
// //               }}
// //             >
// //               <a style={{ textDecoration: "none", color: "white" }}>
// //                 MINISTRIES
// //               </a>
// //               {showMinistries && (
// //                 <div
// //                   style={{
// //                     position: "absolute",
// //                     width: "70%",
// //                     height: "auto",
// //                     top: "20px",
// //                     left: 0,
// //                     backgroundColor: "rgba(0, 0, 0, 1)",
// //                     color: "white",
// //                     paddingRight: "10px",
// //                     zIndex: 1,
// //                     gap: 60,
// //                   }}
// //                 >
// //                   <a
// //                     href=""
// //                     style={{
// //                       display: "block",
// //                       marginBottom: "10px",
// //                       borderBottom: "0.01px solid grey",
// //                     }}
// //                     onClick={() => {
// //                       navigation("/foundationSchool");
// //                     }}
// //                   >
// //                     Foundation School
// //                   </a>

// //                   <a
// //                     href=""
// //                     style={{
// //                       display: "block",
// //                       marginBottom: "10px",
// //                       borderBottom: "0.01px solid grey",
// //                       padding: "10px 0",
// //                     }}
// //                     onClick={() => {
// //                       navigation("/teens");
// //                     }}
// //                   >
// //                     Teens Ministry
// //                   </a>
// //                   <a
// //                     href=""
// //                     style={{ display: "block", padding: "10px 0" }}
// //                     onClick={() => {
// //                       navigation("/children");
// //                     }}
// //                   >
// //                     Children Ministry
// //                   </a>
// //                 </div>
// //               )}
// //             </div>
// //             <a
// //               href="#testimonies"
// //               style={{
// //                 textDecoration: "none",
// //                 color: "white",
// //                 padding: "10px 0",
// //                 borderBottom: "0.01px solid grey",
// //               }}
// //               onClick={toggleMenu}
// //             >
// //               TESTIMONIES
// //             </a>
// //             <a
// //               href=""
// //               style={{
// //                 textDecoration: "none",
// //                 color: "white",
// //                 padding: "10px 0",
// //                 borderBottom: "0.01px solid grey",
// //               }}
// //               onClick={() => {
// //                 navigation("/Programs");
// //               }}
// //             >
// //               PROGRAMS
// //             </a>
// //             <a
// //               href=""
// //               style={{
// //                 textDecoration: "none",
// //                 color: "white",
// //                 padding: "10px 0",
// //                 borderBottom: "0.01px solid grey",
// //               }}
// //               onClick={() => {
// //                 navigation("/give");
// //               }}
// //             >
// //               GIVE
// //             </a>
// //             <a
// //               href=""
// //               style={{
// //                 textDecoration: "none",
// //                 color: "white",
// //                 padding: "10px 0",
// //                 borderBottom: "0.01px solid grey",
// //               }}
// //               onClick={() => {
// //                 navigation("/Contact");
// //               }}
// //             >
// //               CONTACT
// //             </a>
// //           </nav>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;



// "use client"

// import { useState } from "react"
// import { useMediaQuery } from "react-responsive"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
// import logo from "../assets/logo.png"
// import blue from "../assets/blue.jpg"
// import { useNavigate } from "react-router-dom"

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" })
//   const [showMinistries, setShowMinistries] = useState(false)

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen)
//   }

//   const navigation = useNavigate()

//   return (
//     <div>
//       {/* Overlay Header and Content */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//           alignItems: "center",
//           zIndex: 1000,
//         }}
//       >
//         <header
//           style={{
//             display: "flex",
//             backgroundColor: "rgba(0, 0, 0, 0.4)",
//             justifyContent: "space-between",
//             width: "100%",
//             alignItems: "center",
//             padding: 20,
//             zIndex: 1,
//             borderBottom: "0.01px solid white",
//           }}
//         >
//           <img
//             src={logo || "/placeholder.svg"}
//             alt="Church Logo"
//             style={{ width: "60px", height: "auto" }}
//             onClick={() => navigation("/")}
//           />
//           {isMobile ? (
//             <div style={{ color: "white", fontSize: "20px", cursor: "pointer" }} onClick={toggleMenu}>
//               <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
//             </div>
//           ) : (
//             <nav
//               style={{
//                 display: "flex",
//                 gap: "70px",
//                 color: "white",
//                 marginRight: "5%",
//                 fontWeight: 600,
//               }}
//             >
//               <a
//                 href=""
//                 style={{ textDecoration: "none", color: "white" }}
//                 onClick={() => {
//                   navigation("/")
//                 }}
//               >
//                 HOME
//               </a>
//               <a
//                 href=""
//                 style={{ textDecoration: "none", color: "white" }}
//                 onClick={() => {
//                   navigation("/LiveStream")
//                 }}
//               >
//                 LIVE
//               </a>
//               <div
//                 onMouseEnter={() => setShowMinistries(true)}
//                 onMouseLeave={() => setShowMinistries(false)}
//                 style={{ position: "relative", cursor: "pointer" }}
//               >
//                 <div style={{ textDecoration: "none", color: "white" }}>MINISTRIES</div>
//                 {showMinistries && (
//                   <div
//                     style={{
//                       position: "absolute",
//                       width: "180px",
//                       top: "20px",
//                       left: 0,
//                       backgroundColor: "rgba(0, 0, 0, 0.005)",
//                       color: "white",
//                       padding: "5px",
//                       zIndex: 2,
//                     }}
//                   >
//                     <a
//                       href="#"
//                       style={{ display: "block", marginBottom: "10px" }}
//                       onClick={(e) => {
//                         e.preventDefault() // Prevent default anchor behavior (reload)
//                         navigation("/foundationSchool")
//                       }}
//                     >
//                       Foundation School
//                     </a>

//                     <a
//                       href="#"
//                       style={{ display: "block", marginBottom: "10px" }}
//                       onClick={(e) => {
//                         e.preventDefault()
//                         navigation("/teens")
//                       }}
//                     >
//                       Teens Ministry
//                     </a>

//                     <a
//                       href="#"
//                       style={{ display: "block" }}
//                       onClick={(e) => {
//                         e.preventDefault()
//                         navigation("/children")
//                       }}
//                     >
//                       Children Ministry
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <a href="#testimonies" style={{ textDecoration: "none", color: "white" }}>
//                 TESTIMONIES
//               </a>
//               <a
//                 href=""
//                 style={{ textDecoration: "none", color: "white" }}
//                 onClick={() => {
//                   navigation("/Programs")
//                 }}
//               >
//                 PROGRAMS
//               </a>
//               <a
//                 href=""
//                 style={{ textDecoration: "none", color: "white" }}
//                 onClick={() => {
//                   navigation("/give")
//                 }}
//               >
//                 GIVE
//               </a>
//             </nav>
//           )}
//         </header>

//         {/* Dropdown Menu for Mobile */}
//         {menuOpen && isMobile && (
//           <nav
//             style={{
//               position: "absolute",
//               top: "100px",
//               left: 0,
//               width: "100%",
//               height: "auto",
//               backgroundImage: `url(${blue})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundColor: "rgba(0, 0, 0, 1)",
//               display: "flex",
//               flexDirection: "column",
//               padding: "30px",
//               fontSize: "16px",
//               gap: 10,
//               opacity: 1,
//               borderBottomLeftRadius: "10px",
//               borderBottomRightRadius: "10px",
//               // borderTopLeftRadius: '10px',
//               // borderTopRightRadius: '10px',
//             }}
//           >
//             <a
//               href=""
//               style={{
//                 textDecoration: "none",
//                 color: "white",
//                 borderBottom: "0.01px solid grey",
//                 padding: "10px 0",
//               }}
//               onClick={() => {
//                 navigation("/")
//               }}
//             >
//               HOME
//             </a>
//             <a
//               href=""
//               style={{
//                 textDecoration: "none",
//                 color: "white",
//                 padding: "10px 0",
//                 borderBottom: "0.01px solid grey",
//               }}
//               onClick={toggleMenu}
//             >
//               LIVE
//             </a>
//             <div
//               onMouseEnter={() => setShowMinistries(true)}
//               onMouseLeave={() => setShowMinistries(false)}
//               style={{
//                 position: "relative",
//                 cursor: "pointer",
//                 padding: "10px 0",
//                 borderBottom: "0.01px solid grey",
//               }}
//             >
//               <a style={{ textDecoration: "none", color: "white" }}>MINISTRIES</a>
//               {showMinistries && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     width: "70%",
//                     height: "auto",
//                     top: "20px",
//                     left: 0,
//                     backgroundColor: "rgba(0, 0, 0, 1)",
//                     color: "white",
//                     paddingRight: "10px",
//                     zIndex: 1,
//                     gap: 60,
//                   }}
//                 >
//                   <a
//                     href=""
//                     style={{
//                       display: "block",
//                       marginBottom: "10px",
//                       borderBottom: "0.01px solid grey",
//                     }}
//                     onClick={() => {
//                       navigation("/foundationSchool")
//                     }}
//                   >
//                     Foundation School
//                   </a>

//                   <a
//                     href=""
//                     style={{
//                       display: "block",
//                       marginBottom: "10px",
//                       borderBottom: "0.01px solid grey",
//                       padding: "10px 0",
//                     }}
//                     onClick={() => {
//                       navigation("/teens")
//                     }}
//                   >
//                     Teens Ministry
//                   </a>
//                   <a
//                     href=""
//                     style={{ display: "block", padding: "10px 0" }}
//                     onClick={() => {
//                       navigation("/children")
//                     }}
//                   >
//                     Children Ministry
//                   </a>
//                 </div>
//               )}
//             </div>
//             <a
//               href="#testimonies"
//               style={{
//                 textDecoration: "none",
//                 color: "white",
//                 padding: "10px 0",
//                 borderBottom: "0.01px solid grey",
//               }}
//               onClick={toggleMenu}
//             >
//               TESTIMONIES
//             </a>
//             <a
//               href=""
//               style={{
//                 textDecoration: "none",
//                 color: "white",
//                 padding: "10px 0",
//                 borderBottom: "0.01px solid grey",
//               }}
//               onClick={() => {
//                 navigation("/Programs")
//               }}
//             >
//               PROGRAMS
//             </a>
//             <a
//               href=""
//               style={{
//                 textDecoration: "none",
//                 color: "white",
//                 padding: "10px 0",
//                 borderBottom: "0.01px solid grey",
//               }}
//               onClick={() => {
//                 navigation("/give")
//               }}
//             >
//               GIVE
//             </a>
//             <a
//               href=""
//               style={{
//                 textDecoration: "none",
//                 color: "white",
//                 padding: "10px 0",
//                 borderBottom: "0.01px solid grey",
//               }}
//               onClick={() => {
//                 navigation("/Contact")
//               }}
//             >
//               CONTACT
//             </a>
//           </nav>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar


