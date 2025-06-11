
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileSelectionScreen from './src/screens/ProfileSelectionScreen';
import DriverDashboard from './src/screens/DriverDashboard';
import PassengerDashboard from './src/screens/PassengerDashboard';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile-selection" element={<ProfileSelectionScreen />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
