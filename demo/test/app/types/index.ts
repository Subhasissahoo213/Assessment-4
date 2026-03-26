export interface FeedbackFormData {
  name: string;
  employeeId: string;
  feedback: string;
}

export interface ValidationErrors {
  name?: string;
  employeeId?: string;
  feedback?: string;
}