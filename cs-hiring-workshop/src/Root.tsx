import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ui/ThemeProvider';
import { ModeToggle } from './components/ui/Mode-toggel';
import { NewLogin } from './NewLogin';
import { Dashboard } from './Dashboard';

function PrivateRoute({ element }: { element: React.ReactElement }) {
  // Authentication Check
  const isAuthenticated = Boolean(localStorage.getItem('email'));

  return isAuthenticated ? element : <Navigate to="/" />;
}

function Root() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
        <Routes>
          <Route path="/" element={<NewLogin />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default Root;
