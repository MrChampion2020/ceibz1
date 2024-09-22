import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from './logo.png';
import kingschat from "../../assets/kingschat.png";
import { useNavigate } from "react-router-dom";
import video1 from '../../assets/pastor.mp4';
import video2 from '../../assets/pastor.mp4';
import image1 from '../../assets/church.jpg';
import image2 from '../../assets/chuch.jpg';
import image3 from '../../assets/church.jpg';

const GiveScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', amount: '', currency: '', category: '' });
  const navigation = useNavigate();

  const schedule = {
    Monday: "Bible Study at 6 PM",
    Tuesday: "Youth Fellowship at 5 PM",
    Wednesday: "Service Rehearsal at 7 PM",
    Thursday: "Outreach at 6 PM",
    Friday: "Game Night at 8 PM",
    Saturday: "Sports Event at 9 AM",
    Sunday: "Youth Service at 10 AM"
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleFlip = (index) => {
    setFlippedIndex(index === flippedIndex ? null : index);
    if (index === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Navigate to Stripe screen after submission
    navigation('/stripe');
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {/* Header Section */}
      <header style={{
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        padding: 20,
        zIndex: 1,
        borderBottom: '0.2px solid white'
      }}>
        <img src={logo} alt="Church Logo" style={{ width: '60px', height: 'auto' }} />
        {isMobile ? (
          <div style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }} onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
          </div>
        ) : (
          <nav style={{ display: 'flex', gap: '70px', color: 'white', marginRight: '5%', fontWeight: 600 }}>
            <a href="#live" style={{ textDecoration: 'none', color: 'white' }}>LIVE</a>
            <a href="#ministries" style={{ textDecoration: 'none', color: 'white' }}>MINISTRIES</a>
            <a href="#testimonies" style={{ textDecoration: 'none', color: 'white' }}>TESTIMONIES</a>
            <a href="#programs" style={{ textDecoration: 'none', color: 'white' }}>PROGRAMS</a>
            <a href="#give" style={{ textDecoration: 'none', color: 'white' }}>GIVE</a>
          </nav>
        )}
      </header>

      {/* Section 1: Image Flip Cards */}
      <section style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px',
        gap: '20px'
      }}>
        {[{ img: image1, text: "Click to proceed to give your offering" }, 
          { img: image2, text: "Feature for image 2" }, 
          { img: image3, text: "Feature for image 3" }].map((item, index) => (
          <div
            key={index}
            style={{
              width: '300px',
              height: '300px',
              position: 'relative',
              perspective: '1000px',
              cursor: 'pointer'
            }}
            onClick={() => handleFlip(index)}
          >
            <div style={{
              width: '100%',
              height: '100%',
              transition: 'transform 0.8s',
              transformStyle: 'preserve-3d',
              transform: flippedIndex === index ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>
              {/* Front Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden'
              }}>
                <img src={item.img} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
              </div>
              {/* Back Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'rotateY(180deg)',
                cursor: 'pointer' // Indicate it's clickable
              }}
              onClick={() => navigation('/stripe')} // Navigate to Stripe on back side click
              >
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Form Section for Image 1 */}
      {showForm && (
        <section style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Provide Your Offering</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
            <select name="currency" onChange={handleChange} required>
              <option value="">Select Currency</option>
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
            </select>
            <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
            <button type="submit">Proceed to Payment</button>
          </form>
        </section>
      )}

      {/* Footer Section */}
      <footer style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'white', padding: '20px', textAlign: 'center' }}>
        <p>Contact Us:</p>
        <p><FaMapMarkerAlt /> Church Address</p>
        <p><FaPhoneAlt /> (123) 456-7890</p>
        <p><FaEnvelope /> contact@church.com</p>
        <p><FaGlobe /> www.churchwebsite.com</p>
        <p>
          <FaFacebook /> <FaYoutube /> <FaInstagram /> <FaTwitter />
        </p>
      </footer>
    </div>
  );
};

export default GiveScreen;
