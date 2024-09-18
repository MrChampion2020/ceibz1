import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from './logo.jpg';
import video1 from '../../assets/pastor.mp4';
import video2 from '../../assets/pastor.mp4';
import image1 from '../../assets/church.jpg';
import image2 from '../../assets/chuch.jpg';
import image3 from '../../assets/church.jpg';

const TeenScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [flippedIndex, setFlippedIndex] = useState(null); // To track which image is flipped
  const [currentDay, setCurrentDay] = useState(''); // For schedule buttons
  
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
    setFlippedIndex(index === flippedIndex ? null : index); // Toggle flip state
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
            <a href="#give" style={{ textDecoration: 'none', color: 'white'}}>GIVE</a>
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
        {[image1, image2, image3].map((image, index) => (
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
                <img src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
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
                transform: 'rotateY(180deg)'
              }}>
                <p>This is text for image {index + 1}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Section 2: Videos */}
      <section style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        padding: '50px',
        gap: '20px'
      }}>
        <div style={{ flex: 1 }}>
          <video controls style={{ width: '100%' }}>
            <source src={video1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={{ flex: 1 }}>
          <video controls style={{ width: '100%' }}>
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Section 3: Schedule */}
      <section style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '50px',
        textAlign: 'center',
        width: '100%',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '30px' }}>Our Schedule</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          {Object.keys(schedule).map((day) => (
            <button key={day} onClick={() => setCurrentDay(day)} style={{
              padding: '10px 20px',
              backgroundColor: 'orange',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}>
              {day}
            </button>
          ))}
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          padding: '20px'
        }}>
          {Object.keys(schedule).map((day, index) => (
            <div key={index} style={{
              width: '80px',
              height: '60px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
            }}>
              {currentDay === day ? schedule[day] : '--:--'}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
        backgroundColor: 'black',
        color: 'white',
        marginTop: '50px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
          <a href="#live" style={{ color: 'white', textDecoration: 'none' }}>Live Video</a>
          <a href="#give" style={{ color: 'white', textDecoration: 'none' }}>Give</a>
          <a href="#partnership" style={{ color: 'white', textDecoration: 'none' }}>Partnership</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a href="#ministries" style={{ color: 'white', textDecoration: 'none' }}>Ministries</a>
          <a href="#testimonies" style={{ color: 'white', textDecoration: 'none' }}>Testimonies</a>
          <a href="#services" style={{ color: 'white', textDecoration: 'none' }}>Services</a>
          <a href="#about" style={{ color: 'white', textDecoration: 'none' }}>About</a>
        </div>
      </footer>
    </div>
  );
};

export default TeenScreen;
