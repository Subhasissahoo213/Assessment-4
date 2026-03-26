import { FeedbackFormData, ValidationErrors } from "../types";

export const validateFeedback = (data: FeedbackFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!data.name.trim()) errors.name = "Full Name is required";
  if (!data.employeeId.trim()) errors.employeeId = "Employee ID is required";
  if (!data.feedback.trim()) errors.feedback = "Feedback is required";
  return errors;
};