import React from 'react';
import FeedbackItem from './FeedbackItem';

function FeedbackList({ feedbacks, loading, error, onRetry, onDelete, onUpdate }) {
  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading feedback...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
        <button className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3 className="empty-title">No feedback yet</h3>
        <p className="empty-subtitle">Be the first to share your thoughts!</p>
      </div>
    );
  }

  // Render feedback list
  return (
    <div className="feedback-list">
      {feedbacks.map((feedback, index) => (
        <FeedbackItem 
          key={feedback._id || index} 
          feedback={feedback}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default FeedbackList;
