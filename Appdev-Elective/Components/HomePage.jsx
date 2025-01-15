import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  // Retrieve user data (assuming this is saved during signup)
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', email: 'user@example.com' };
  // Fetch the user profile from localStorage
  const storedProfile = localStorage.getItem('userProfile');
  const initialProfile = storedProfile
    ? JSON.parse(storedProfile)
    : { fitnessLevel: '', weight: '', height: '', goalWeight: '' };
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);

  // Sync with localStorage on component mount
  useEffect(() => {
    const updatedProfile = localStorage.getItem('userProfile');
    if (updatedProfile) {
      setProfile(JSON.parse(updatedProfile));
    }
  }, []);

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdateProfile = () => {
    // Save the updated profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setEditMode(false); // Exit edit mode
  };

  const handleFinish = () => {
    navigate('/home2'); // Redirect to HomePage2
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <h2>Your Profile</h2>
      <div>
        <span>Fitness Level: </span>
        {editMode ? (
          <input
            type="text"
            name="fitnessLevel"
            value={profile.fitnessLevel}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.fitnessLevel || 'Not set'}</span>
        )}
      </div>
      <div>
        <span>Weight: </span>
        {editMode ? (
          <input
            type="number"
            name="weight"
            value={profile.weight}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.weight ? `${profile.weight} kg` : 'Not set'}</span>
        )}
      </div>
      <div>
        <span>Height: </span>
        {editMode ? (
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.height ? `${profile.height} cm` : 'Not set'}</span>
        )}
      </div>
      <div>
        <span>Goal Weight: </span>
        {editMode ? (
          <input
            type="number"
            name="goalWeight"
            value={profile.goalWeight}
            onChange={handleChange}
          />
        ) : (
          <span>{profile.goalWeight ? `${profile.goalWeight} kg` : 'Not set'}</span>
        )}
      </div>
      <button
        onClick={editMode ? handleUpdateProfile : handleEditToggle}
        style={{ fontSize: '12px', padding: '6px 12px', marginTop: '20px' }}
      >
        {editMode ? 'Save Profile' : 'Edit Profile'}
      </button>
      <button
        onClick={handleFinish}
        style={{ fontSize: '12px', padding: '6px 12px', marginTop: '20px', marginLeft: '10px' }}
      >
        Finish
      </button>
    </div>
  );
};

export default HomePage;
