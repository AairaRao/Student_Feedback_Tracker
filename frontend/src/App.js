import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  // State hooks for managing feedback data and UI states
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme state

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // useEffect hook to fetch feedback on component mount
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Function to fetch all feedbacks from the backend
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/feedback`);
      const data = await response.json();
      
      if (data.success) {
        setFeedbacks(data.data);
      } else {
        setError(data.message || 'Failed to fetch feedback');
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Unable to connect to server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Function to submit new feedback
  const handleSubmitFeedback = async (feedbackData) => {
    try {
      setSubmitStatus({ type: '', message: '' });
      
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({ type: 'success', message: 'Feedback submitted successfully!' });
        // Add the new feedback to the beginning of the list
        setFeedbacks(prevFeedbacks => [data.data, ...prevFeedbacks]);
        return true;
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to submit feedback' });
        return false;
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setSubmitStatus({ type: 'error', message: 'Unable to connect to server. Please try again.' });
      return false;
    }
  };

  // Function to delete feedback
  const handleDeleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/feedback/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFeedbacks(prevFeedbacks => prevFeedbacks.filter(f => f._id !== id));
      } else {
        alert(data.message || 'Failed to delete feedback');
      }
    } catch (err) {
      console.error('Error deleting feedback:', err);
      alert('Unable to delete feedback. Please try again.');
    }
  };

  // Function to update feedback
  const handleUpdateFeedback = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFeedbacks(prevFeedbacks => 
          prevFeedbacks.map(f => f._id === id ? data.data : f)
        );
        return true;
      } else {
        alert(data.message || 'Failed to update feedback');
        return false;
      }
    } catch (err) {
      console.error('Error updating feedback:', err);
      alert('Unable to update feedback. Please try again.');
      return false;
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        {isDarkMode ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M19.07 19.07L17.66 17.66M6.34 6.34L4.93 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className="container">
        {/* Header Section */}
        <header className="header">
          <div className="header-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="currentColor"/>
              <path d="M7 9H17M7 13H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="header-title">Student Feedback Tracker</h1>
          <p className="header-subtitle">
            Share your thoughts and help us improve the learning experience
          </p>
        </header>

        {/* Main Content */}
        <main className="main-content">
          {/* Feedback Form Section */}
          <section className="form-section">
            <h2 className="section-title">
              <span className="section-icon">✍️</span>
              Submit Your Feedback
            </h2>
            <FeedbackForm 
              onSubmit={handleSubmitFeedback} 
              submitStatus={submitStatus}
            />
          </section>

          {/* Feedback List Section */}
          <section className="list-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">💬</span>
                Recent Feedback
              </h2>
              <span className="feedback-count">
                {feedbacks.length} {feedbacks.length === 1 ? 'response' : 'responses'}
              </span>
            </div>
            <FeedbackList 
              feedbacks={feedbacks} 
              loading={loading} 
              error={error}
              onRetry={fetchFeedbacks}
              onDelete={handleDeleteFeedback}
              onUpdate={handleUpdateFeedback}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>MERN Stack Application • Built with React, Express, Node.js & MongoDB</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

