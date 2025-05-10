import React from 'react';

// StreamViewer Component
const StreamViewer = ({ streamUrl }) => {
  let embedUrl = streamUrl;

  // Extract the video ID from the URL for YouTube Live or regular videos
  if (embedUrl.includes('youtube.com/live/') || embedUrl.includes('watch?v=')) {
    const videoId = embedUrl.split('/').pop().split('?')[0]; // Extract VIDEO_ID from live or watch URLs
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  // Convert shortened URLs (youtu.be) to embed format
  if (embedUrl.includes('youtu.be')) {
    const videoId = embedUrl.split('/').pop(); // Extract VIDEO_ID from shortened URLs
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  // Ensure mobile URLs (m.youtube.com) are converted to desktop URLs
  if (embedUrl.includes('m.youtube.com')) {
    embedUrl = embedUrl.replace('m.youtube.com', 'www.youtube.com');
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Live Stream</h2>
      <div style={styles.iframeContainer}>
        <iframe
          width="100%"  // Make the iframe width responsive
          height="100%"
          src={embedUrl}  // Use the corrected embed URL
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Live Stream"
          style={styles.iframe}
        ></iframe>
      </div>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    maxWidth: '1200px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  iframeContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%', // Maintain 16:9 aspect ratio
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#000',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },
};

export default StreamViewer;
