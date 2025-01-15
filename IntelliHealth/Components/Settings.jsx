import React from 'react';
import { Link } from 'react-router-dom';
import './Settings.css'; // Add CSS file if you want to style the page

const Settings = () => {
  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <ul>
        <li><Link to="/home">Edit Profile</Link></li>
        <li><Link to="/password">Password</Link></li>
        <li><Link to="/delete-account" className="delete-account">Delete Account</Link></li>
      </ul>
    </div>
  );
};

export default Settings;
