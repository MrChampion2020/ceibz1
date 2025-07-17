import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaSmile, 
  FaPray,
  FaHandsHelping,
  FaFireAlt,
  FaHeart,
  FaRegSadTear,
  FaUser,
  FaCompress,
  FaExpand
} from 'react-icons/fa';
import { useTheme } from './ThemeProvider';

const FloatingLiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef(null);
  const { theme } = useTheme();

  // Sample messages for demo
  const sampleMessages = [
    {
      id: 1,
      user: 'Sister Mary',
      message: 'Amen! This message is exactly what I needed today.',
      timestamp: '2 minutes ago',
      reactions: { amen: 5, praise: 2 },
      type: 'message'
    },
    {
      id: 2,
      user: 'Brother James',
      message: 'Praise God for this powerful word! My faith is strengthened.',
      timestamp: '5 minutes ago',
      reactions: { praise: 8, fire: 3 },
      type: 'message'
    },
    {
      id: 3,
      user: 'Prayer Team',
      message: 'We are praying for all those who need healing and breakthrough.',
      timestamp: '8 minutes ago',
      reactions: { amen: 12, heart: 7 },
      type: 'prayer'
    }
  ];

  useEffect(() => {
    setMessages(sampleMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userName.trim()) return;

    const message = {
      id: Date.now(),
      user: userName,
      message: newMessage,
      timestamp: 'Just now',
      reactions: {},
      type: activeTab === 'chat' ? 'message' : 'prayer'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleReaction = (messageId, reactionType) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [reactionType]: (msg.reactions[reactionType] || 0) + 1
          }
        };
      }
      return msg;
    }));
  };

  const reactionOptions = [
    { id: 'amen', icon: <FaPray />, label: 'Amen', color: '#f59e0b' },
    { id: 'praise', icon: <FaHandsHelping />, label: 'Praise', color: '#10b981' },
    { id: 'fire', icon: <FaFireAlt />, label: 'Fire', color: '#ef4444' },
    { id: 'heart', icon: <FaHeart />, label: 'Love', color: '#ec4899' },
    { id: 'sad', icon: <FaRegSadTear />, label: 'Prayer', color: '#6366f1' }
  ];

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#2a1e7a',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 12px rgba(42, 30, 122, 0.3)'
          }}
        >
          <FaComments />
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: isMinimized ? '300px' : '350px',
          height: isMinimized ? '60px' : '500px',
          backgroundColor: theme === 'dark' ? '#1a1a1a' : 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`,
          zIndex: 1000,
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px',
          backgroundColor: '#2a1e7a',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FaComments />
            <span style={{ fontWeight: '600' }}>
              Live Chat
            </span>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              animation: 'pulse 2s infinite'
            }} />
          </div>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              {isMinimized ? <FaExpand size={14} /> : <FaCompress size={14} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Login Form */}
            {showLogin && (
              <div style={{
                padding: '20px',
                borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: theme === 'dark' ? '#f59e0b' : '#2a1e7a'
                }}>
                  Join the Conversation
                </h3>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '8px',
                    backgroundColor: theme === 'dark' ? '#111' : 'white',
                    color: theme === 'dark' ? '#fff' : '#000'
                  }}
                />
                <button
                  onClick={() => setShowLogin(false)}
                  disabled={!userName.trim()}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: userName.trim() ? '#2a1e7a' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: userName.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '14px'
                  }}
                >
                  Join Chat
                </button>
              </div>
            )}

            {!showLogin && (
              <>
                {/* Tabs */}
                <div style={{
                  display: 'flex',
                  borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`
                }}>
                  <button
                    onClick={() => setActiveTab('chat')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: activeTab === 'chat' ? '#2a1e7a' : 'transparent',
                      color: activeTab === 'chat' ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeTab === 'chat' ? '500' : 'normal'
                    }}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => setActiveTab('prayers')}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: activeTab === 'prayers' ? '#2a1e7a' : 'transparent',
                      color: activeTab === 'prayers' ? 'white' : (theme === 'dark' ? '#ccc' : '#666'),
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: activeTab === 'prayers' ? '500' : 'normal'
                    }}
                  >
                    Prayer Requests
                  </button>
                </div>

                {/* Messages */}
                <div style={{
                  height: '300px',
                  overflowY: 'auto',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {messages
                    .filter(msg => activeTab === 'chat' ? msg.type === 'message' : msg.type === 'prayer')
                    .map((message) => (
                    <div
                      key={message.id}
                      style={{
                        backgroundColor: theme === 'dark' ? '#111' : '#f9fafb',
                        borderRadius: '8px',
                        padding: '12px',
                        border: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: message.type === 'prayer' ? '#f59e0b' : '#2a1e7a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px'
                        }}>
                          <FaUser size={10} />
                        </div>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '500',
                          color: theme === 'dark' ? '#f59e0b' : '#2a1e7a'
                        }}>
                          {message.user}
                        </span>
                        <span style={{
                          fontSize: '10px',
                          color: '#9ca3af'
                        }}>
                          {message.timestamp}
                        </span>
                      </div>
                      
                      <p style={{
                        fontSize: '13px',
                        color: theme === 'dark' ? '#ccc' : '#374151',
                        marginBottom: '8px',
                        lineHeight: 1.4
                      }}>
                        {message.message}
                      </p>

                      {/* Reactions */}
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        {Object.entries(message.reactions || {}).map(([type, count]) => (
                          <div
                            key={type}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '2px 6px',
                              backgroundColor: theme === 'dark' ? '#333' : '#e5e7eb',
                              borderRadius: '12px',
                              fontSize: '10px',
                              color: reactionOptions.find(r => r.id === type)?.color || '#666'
                            }}
                          >
                            {reactionOptions.find(r => r.id === type)?.icon}
                            {count}
                          </div>
                        ))}
                      </div>

                      {/* Reaction Buttons */}
                      <div style={{
                        display: 'flex',
                        gap: '4px',
                        marginTop: '8px'
                      }}>
                        {reactionOptions.slice(0, 3).map((reaction) => (
                          <button
                            key={reaction.id}
                            onClick={() => handleReaction(message.id, reaction.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: reaction.color,
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '4px',
                              fontSize: '12px'
                            }}
                          >
                            {reaction.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div style={{
                  padding: '16px',
                  borderTop: `1px solid ${theme === 'dark' ? '#333' : '#e5e7eb'}`
                }}>
                  <form onSubmit={handleSubmit}>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <input
                        type="text"
                        placeholder={activeTab === 'chat' ? 'Type your message...' : 'Share your prayer request...'}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '13px',
                          backgroundColor: theme === 'dark' ? '#111' : 'white',
                          color: theme === 'dark' ? '#fff' : '#000'
                        }}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: newMessage.trim() ? '#2a1e7a' : '#9ca3af',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaPaperPlane size={12} />
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: '8px 12px',
                          backgroundColor: theme === 'dark' ? '#333' : '#f3f4f6',
                          color: theme === 'dark' ? '#f59e0b' : '#2a1e7a',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <FaSmile size={12} />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </>
        )}

        <style>
          {`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingLiveChat; 