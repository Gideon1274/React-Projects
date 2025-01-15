import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure you're using the same CSS file

const ProfileInput = () => {
  const [profile, setProfile] = useState({
    fitnessLevel: '',
    weight: '',
    height: '',
    goalWeight: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault(); 
    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/home');  // Navigate to home after saving the profile
  };

  return (
    <div className="form-container"> {/* Use the same container class */}
      <form className="form-content" onSubmit={handleSaveProfile}> {/* Use the same form class */}
        <h2>Complete Your Profile</h2>
        <div className="input-group">
          <input
            type="text"
            name="fitnessLevel"
            placeholder="Fitness Level"
            onChange={handleChange}
            value={profile.fitnessLevel}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            value={profile.weight}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            value={profile.height}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="goalWeight"
            placeholder="Goal Weight (kg)"
            onChange={handleChange}
            value={profile.goalWeight}
            required
          />
        </div>
        <button type="submit">Save and Proceed</button>
      </form>
    </div>
  );
};

export default ProfileInput;
