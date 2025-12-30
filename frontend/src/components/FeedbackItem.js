import React, { useState } from 'react';

function FeedbackItem({ feedback, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(feedback.name);
  const [editMessage, setEditMessage] = useState(feedback.message);
  const [isUpdating, setIsUpdating] = useState(false);

  // Get initials from name for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Show relative time for recent feedback
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    // Show full date for older feedback
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  // Handle edit save
  const handleSave = async () => {
    if (!editName.trim() || !editMessage.trim()) {
      alert('Please fill in both name and message');
      return;
    }
    
    setIsUpdating(true);
    const success = await onUpdate(feedback._id, {
      name: editName.trim(),
      message: editMessage.trim()
    });
    setIsUpdating(false);
    
    if (success) {
      setIsEditing(false);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditName(feedback.name);
    setEditMessage(feedback.message);
    setIsEditing(false);
  };

  // Render edit mode
  if (isEditing) {
    return (
      <div className="feedback-item editing">
        <div className="edit-form">
          <div className="edit-group">
            <label className="edit-label">Name</label>
            <input
              type="text"
              className="edit-input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="edit-group">
            <label className="edit-label">Message</label>
            <textarea
              className="edit-textarea"
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              maxLength={1000}
            />
          </div>
          <div className="edit-actions">
            <button 
              className="btn-save" 
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : '✓ Save'}
            </button>
            <button 
              className="btn-cancel" 
              onClick={handleCancel}
              disabled={isUpdating}
            >
              ✕ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render normal view
  return (
    <div className="feedback-item">
      <div className="feedback-header">
        <div className="feedback-author">
          <div className="author-avatar">
            {getInitials(feedback.name)}
          </div>
          <span className="author-name">{feedback.name}</span>
        </div>
        <div className="feedback-actions-wrapper">
          <span className="feedback-date">
            🕒 {formatDate(feedback.createdAt)}
          </span>
          <div className="feedback-actions">
            <button 
              className="btn-edit" 
              onClick={() => setIsEditing(true)}
              title="Edit feedback"
            >
              ✏️
            </button>
            <button 
              className="btn-delete" 
              onClick={() => onDelete(feedback._id)}
              title="Delete feedback"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
      <p className="feedback-message">{feedback.message}</p>
    </div>
  );
}

export default FeedbackItem;
