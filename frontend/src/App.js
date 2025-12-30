import React, { useState, useEffect } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  // State hooks for managing feedback data and UI states
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

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

  return (
    <div className="app">
      {/* Decorative background elements */}
      <div className="bg-decoration">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

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

