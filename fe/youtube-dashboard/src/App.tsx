// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/authContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
