"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FeedbackFormData, ValidationErrors } from "../types";
import { validateFeedback } from "../lib/validations";

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    employeeId: "",
    feedback: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFeedback(formData);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="feedback-card">
        {isSubmitted ? (
          <div className="success-state">
            <div className="success-icon">✅</div>
            <div className="header">
              <h2>Submission Successful!</h2>
              <p className="thank-you-msg">Thank you, <b>{formData.name}</b>.</p>
            </div>

            <div className="summary-box">
              <p><strong>Employee ID:</strong> {formData.employeeId}</p>
              <p><strong>Feedback:</strong> {formData.feedback}</p>
            </div>

            <button 
              className="submit-btn" 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: "", employeeId: "", feedback: "" });
              }}
            >
              Send Another Feedback
            </button>
          </div>
        ) : (
          <>
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
                  className={`input-style ${errors.name ? "error-border" : ""}`}
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
                  className={`input-style ${errors.employeeId ? "error-border" : ""}`}
                  value={formData.employeeId}
                  onChange={handleChange}
                />
                {errors.employeeId && <span className="error-msg">⚠ {errors.employeeId}</span>}
              </div>

              <div className="form-group">
                <label>Your Feedback</label>
                <textarea
                  name="feedback"
                  rows={4}
                  placeholder="What's on your mind?"
                  className={`input-style ${errors.feedback ? "error-border" : ""}`}
                  value={formData.feedback}
                  onChange={handleChange}
                />
                {errors.feedback && <span className="error-msg">⚠ {errors.feedback}</span>}
              </div>

              <button type="submit" className="submit-btn">Submit Feedback</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}