import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './assets/Components/Login';
import SignUp from './assets/Components/SignUp';
import HomePage from './assets/Components/HomePage';
import ProfileInput from './assets/Components/ProfileInput';
import LandingPage from './assets/Components/LandingPage';
import HomePage2 from './assets/Components/HomePage2';
import HomePage3 from './assets/Components/HomePage3';
import HomeSidebar from './assets/Components/HomeSidebar';
import Settings from './assets/Components/Settings';
import Cardio from './assets/Components/Cardio';
import Strength from './assets/Components/Strength';
import Core from './assets/Components/Core';  // Import Core component
import Balance from './assets/Components/Balance';  // Import Balance component
import Flexibility from './assets/Components/Flexibility';  // Import Flexibility component

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<ProfileInput />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/home2" element={<HomePage2 />} />
      <Route path="/home3" element={<HomePage3 />} />
      <Route path="/hs" element={<HomeSidebar />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/cardio" element={<Cardio />} />
      <Route path="/strength" element={<Strength />} />
      <Route path="/core" element={<Core />} /> {/* Add Core route */}
      <Route path="/balance" element={<Balance />} /> {/* Add Balance route */}
      <Route path="/flexibility" element={<Flexibility />} /> {/* Add Flexibility route */}
    </Routes>
  </Router>
);

export default App;