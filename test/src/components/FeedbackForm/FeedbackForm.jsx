import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Real-time error removal
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Advanced Validation logic
  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.employeeId)) {
      newErrors.employeeId = "ID should be alphanumeric";
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback cannot be empty";
    } else if (formData.feedback.length < 15) {
      newErrors.feedback = "Please provide at least 15 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API Call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

 if (isSubmitted) {
    return (
      <div className="form-wrapper">
        <div className="feedback-card success-state">
          <div className="success-icon">✅</div>
          <h2>Submission Successful!</h2>
          <p className="thank-you-msg">Thank you, <b>{formData.name}</b>.</p>
          
    
          <div className="summary-box">
            <p><strong>Employee ID:</strong> {formData.employeeId}</p>
            <p><strong>Feedback:</strong> {formData.feedback}</p>
          </div>

          <button 
            className="submit-btn" 
            onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', employeeId: '', feedback: '' }); // Clear form
            }}
          >
            Send Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="feedback-card">
        <div className="header">
          <h2>Share Feedback</h2>
          <p>Help us improve our workplace</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Alex Johnson"
              className={`input-style ${errors.name ? 'error-border' : ''}`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-msg">⚠ {errors.name}</span>}
          </div>

        
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              placeholder="e.g. EMP4022"
              className={`input-style ${errors.employeeId ? 'error-border' : ''}`}
              value={formData.employeeId}
              onChange={handleChange}
            />
            {errors.employeeId && <span className="error-msg">⚠ {errors.employeeId}</span>}
          </div>

         
          <div className="form-group">
            <label>Your Feedback</label>
            <textarea
              name="feedback"
              rows="4"
              placeholder="What's on your mind?"
              className={`input-style ${errors.feedback ? 'error-border' : ''}`}
              value={formData.feedback}
              onChange={handleChange}
            />
            {errors.feedback && <span className="error-msg">⚠ {errors.feedback}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;