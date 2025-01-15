import React, { useState } from 'react';
import './HomePage2.css';
import { Link } from 'react-router-dom';

const HomeSidebar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleProfileHover = () => {
    setIsModalVisible(true);
  };

  const handleProfileLeave = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="homepage">
      {/* Top Navigation Bar */}
      <header className="top-bar">
        <nav className="navbar">
          <div className="logo">
            {/* Wrap the logo in a Link to navigate to the LandingPage */}
            <Link to="/">
              <img
                src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462636547_890081249996736_3820895762277585098_n.png?stp=dst-png_s480x480&_nc_cat=110&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHgTV-uknlkt8YDdrlpB-DyR8gzgLQE6_RHyDOAtATr9F7ESPDV0fXBtCVHQKu0olaG01TjAWutVkVeV1_41Yh4&_nc_ohc=3O6CFrBVI3wQ7kNvgEDLxrs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QH8KH11rsnCF5BbAxgNhmvQ-j4opweORqwdfmT-pPcg-w&oe=675BB6D6" 
                alt="Logo"
                className="logo-image" 
              />
            </Link>
          </div>
          <div className="nav-links">
            <div
              className="profile"
              onMouseEnter={handleProfileHover}
              onMouseLeave={handleProfileLeave}
            >
              <img
                src="https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-1/462101278_508801152002813_5193789042383961383_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEMMWbT_fCH4rWX5Q_gCcn4bfDM77yYbHZt8MzvvJhsdtps3NIkm5PrrzjJJ6X399eQTIuBFNEPw3ZIA_nJHQc-&_nc_ohc=ssrwUXqYWNAQ7kNvgFXK6uR&_nc_zt=24&_nc_ht=scontent.fmnl13-3.fna&_nc_gid=AkgPdBFT9xLgVbBueSbj20t&oh=00_AYDeD_7ud1R0mDtzNtPDvQdpIaew4ljY78Dq4hqhpNHOEA&oe=673A3E19"
                alt="profile"
                className="logo-image"
              />
              {isModalVisible && (
                <div className="profile-modal">
                  <Link to="/settings">
                    <button className="settings-option">Settings</button>
                  </Link>
                  <Link to="/">
                    <button className="settings-option">Sign Out</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
  
      {/* Main content and sidebar wrapper */}
      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-section">
            {/* Profile section (can be filled later) */}
          </div>
          <div className="features-list">
            <Link to="/hs">
              <p>Home</p>
            </Link>
            <p onClick={() => openModal('Goal')}>Goal</p>
            <p onClick={() => openModal('Progress')}>Progress</p>
            <Link to="/home2">
              <p>Exercise</p>
            </Link>
          </div>
        </div>

        {/* Main Content (add more content here) */}
      </div>
    </div>
  );
};

export default HomeSidebar;
