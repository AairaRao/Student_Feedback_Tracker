import React, { useState } from 'react';

function FeedbackForm({ onSubmit, submitStatus }) {
  // State hooks for form inputs
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Character limit for message
  const MAX_MESSAGE_LENGTH = 500;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim() || !message.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    const success = await onSubmit({ 
      name: name.trim(), 
      message: message.trim() 
    });
    
    setIsSubmitting(false);
    
    // Clear form on successful submission
    if (success) {
      setName('');
      setMessage('');
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      {/* Name Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          <span>👤</span> Your Name
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
      </div>

      {/* Message Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="message">
          <span>💭</span> Your Feedback
        </label>
        <textarea
          id="message"
          className="form-textarea"
          placeholder="Share your thoughts, suggestions, or feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={MAX_MESSAGE_LENGTH}
          required
        />
        <span className="char-count">
          {message.length}/{MAX_MESSAGE_LENGTH} characters
        </span>
      </div>

      {/* Status Message */}
      {submitStatus.message && (
        <div className={`status-message ${submitStatus.type}`}>
          <span>{submitStatus.type === 'success' ? '✓' : '✕'}</span>
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        className="submit-btn"
        disabled={isSubmitting || !name.trim() || !message.trim()}
      >
        {isSubmitting ? (
          <>
            <svg className="loading-icon" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.4 31.4" style={{ animation: 'spin 1s linear infinite' }}>
              </circle>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Submit Feedback
          </>
        )}
      </button>
    </form>
  );
}

export default FeedbackForm;

