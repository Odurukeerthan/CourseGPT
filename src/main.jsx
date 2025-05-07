import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CourseProvider } from './contexts/CourseContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CourseProvider>
      <App />
    </CourseProvider>
  </React.StrictMode>
);