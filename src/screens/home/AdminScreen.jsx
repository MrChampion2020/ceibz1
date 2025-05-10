import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StreamForm from './AdminStreamForm';
import StreamList from './AdminStreamList';
import StreamPreview from './AdminStreamPreview';
import CommentSection from './AdminCommentSection';

const AdminScreen = () => {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);

  // Fetch all streams when the component mounts
  useEffect(() => {
    fetchStreams();
  }, []);

  // Fetch streams from the backend
  const fetchStreams = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/streams');
      setStreams(response.data);
    } catch (error) {
      console.error('Error fetching streams', error);
    }
  };

  // Handle the selection of a stream for preview
  const handleStreamSelect = (stream) => {
    setSelectedStream(stream); // Set the selected stream for preview
  };


  return (
    <div style={styles.dashboard}>
      <h1>Admin Dashboard</h1>

      {/* Stream Form for adding/updating streams */}
      <StreamForm fetchStreams={fetchStreams} />

      {/* Stream Preview Section */}
      {selectedStream && (
        <StreamPreview streamUrl={selectedStream.streamUrl} />
      )}

      {/* Stream List */}
      <StreamList streams={streams} onSelectStream={handleStreamSelect} fetchStreams={fetchStreams} />

      {/* Comment Section */}
      {selectedStream && (
        <CommentSection streamId={selectedStream._id} />
      )}
    </div>
  );
};

// Basic styling for the admin dashboard
const styles = {
  dashboard: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
  },
};

export default AdminScreen;
