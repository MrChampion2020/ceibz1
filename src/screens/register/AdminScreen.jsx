import React, { useState, useRef, useEffect } from 'react';

const AdminScreen = () => {
  const [streamOption, setStreamOption] = useState(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [currentStream, setCurrentStream] = useState({ type: null, url: null });
  const [volume, setVolume] = useState(1);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const startCameraStream = async (cameraType) => {
    if (isVideoLoaded && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: cameraType === 'front' ? 'user' : 'environment' },
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }

        setStreamOption(cameraType === 'front' ? 'front-camera' : 'back-camera');
        updateStreamOnServer(cameraType === 'front' ? 'front-camera' : 'back-camera', null);
      } catch (err) {
        console.error('Error accessing camera: ', err);
      }
    }
  };

  const handleStartUrlStream = (streamType) => {
    setStreamOption(streamType);
    updateStreamOnServer(streamType, streamUrl);
  };

  const updateStreamOnServer = (type, url) => {
    fetch('/api/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, url }),
    });
  };

  const toggleStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => (track.enabled = !track.enabled));
    }
  };

  const handleVolumeChange = (e) => {
    if (videoRef.current) {
      setVolume(e.target.value);
      videoRef.current.volume = e.target.value;
    }
  };

  const switchCamera = () => {
    if (streamOption === 'front-camera') {
      startCameraStream('back');
    } else {
      startCameraStream('front');
    }
  };

  useEffect(() => {
    fetch('/api/stream')
      .then((res) => res.json())
      .then((data) => setCurrentStream(data));
  }, []);

  return (
    <div style={{
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      textAlign: "center",
      backgroundColor: "#f5f5f5"
    }}>
      <h1 style={{ fontSize: "2.5em", color: "#333", marginBottom: "20px" }}>
        Admin Streaming Dashboard
      </h1>

      {/* Stream Options Section */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ fontSize: "1.5em", marginBottom: "10px", color: "#444" }}>
          Choose Stream Source
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px"
        }}>
          <button 
            onClick={() => startCameraStream('front')} 
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Front Camera
          </button>
          <button 
            onClick={() => startCameraStream('back')} 
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Back Camera
          </button>
          <button 
            onClick={() => handleStartUrlStream('youtube')} 
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            YouTube Live Stream
          </button>
          <button 
            onClick={() => handleStartUrlStream('obs')} 
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            OBS Stream
          </button>
        </div>
      </div>

      {/* Stream Preview Section */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ fontSize: "1.5em", marginBottom: "10px", color: "#444" }}>
          Stream Preview
        </h2>
        {streamOption === 'front-camera' || streamOption === 'back-camera' ? (
          <video
            ref={videoRef}
            autoPlay
            controls
            volume={volume}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "300px",
              borderRadius: "10px",
              border: "2px solid #ccc"
            }}
            onLoadedMetadata={() => setIsVideoLoaded(true)}
          />
        ) : streamOption === 'youtube' ? (
          <iframe 
            src={streamUrl} 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen 
            title="YouTube Live Stream" 
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "300px",
              borderRadius: "10px"
            }}
          />
        ) : streamOption === 'obs' ? (
          <iframe 
            src={streamUrl} 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen 
            title="OBS Stream" 
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "300px",
              borderRadius: "10px"
            }}
          />
        ) : (
          <p>No stream is currently active</p>
        )}
      </div>

      {/* Stream Controls Section */}
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ fontSize: "1.5em", marginBottom: "10px", color: "#444" }}>
          Stream Controls
        </h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px"
        }}>
          <button 
            onClick={toggleStream} 
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Toggle Stream
          </button>
          <button 
            onClick={switchCamera} 
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1em",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Switch Camera
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={volume} 
            onChange={handleVolumeChange} 
            style={{
              width: "200px",
              height: "30px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminScreen;