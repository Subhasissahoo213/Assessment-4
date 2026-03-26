import React from 'react';
import FeedbackForm from './components/FeedbackForm/FeedbackForm';

function App() {
  return (
    <div className="App">
      {/* 
          The FeedbackForm component contains its own 
          wrapper to center itself on the screen.
      */}
      <FeedbackForm />
    </div>
  );
}

export default App;