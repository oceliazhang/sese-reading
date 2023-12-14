import React, { useState } from 'react';
import './AuthorZone.css'; 
import PersonImages from '../PersonImages/1325.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faUserFriends, faFolder, faCog, faPencilAlt, faBell, faDollarSign, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

function AuthorZone() {
  const [activeTab, setActiveTab] = useState('benefits'); // State for active tab

  // Function to generate random user interaction numbers, like clicks
  const getRandomInteraction = () => {
    return Math.floor(Math.random() * 1000); 
  };

  return (
    <div className="author-zone">
      <header className="author-header">
        {/* Profile image and user name */}
        <img src={PersonImages} alt="User" className="author-profile-image" />
        <h2 className="author-name">Username</h2>
        <p className="author-id">User ID: td181196965</p>
      </header>
      <div className="icons-row">
  <div className="icon-container">
    <FontAwesomeIcon icon={faPencilAlt} className="icon" />
    <span className="icon-name">Write</span>
  </div>
  <div className="icon-container">
    <FontAwesomeIcon icon={faBell} className="icon" />
    <span className="icon-name">Notify</span>
  </div>
  <div className="icon-container">
    <FontAwesomeIcon icon={faDollarSign} className="icon" />
    <span className="icon-name">Income</span>
  </div>
  <div className="icon-container">
    <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
    <span className="icon-name">Help</span>
  </div>
  <div className="icon-container">
    <FontAwesomeIcon icon={faFileAlt} className="icon" />
    <span className="icon-name">Docs</span>
  </div>
  <div className="icon-container">
    <FontAwesomeIcon icon={faUserFriends} className="icon" />
    <span className="icon-name">Contacts</span>
  </div>
  <div className="icon-container">
    <FontAwesomeIcon icon={faFolder} className="icon" />
    <span className="icon-name">Files</span>
  </div>
  <div className="icon-container">
    <FontAwesomeIcon icon={faCog} className="icon" />
    <span className="icon-name">Settings</span>
  </div>
</div>

      <div className="author-content">
        {/* Tabbed interface for benefits and announcements */}
        <div className="tabs-row">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`tab-button ${activeTab === 'benefits' ? 'active' : ''}`}
          >
            Author Gifts
          </button>
          <button
            onClick={() => setActiveTab('announcement')}
            className={`tab-button ${activeTab === 'announcement' ? 'active' : ''}`}
          >
            Author Announcement
          </button>
        </div>
        <div className="tab-content">
        {/* {activeTab === 'benefits' && (
          <div className="benefits-content">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                summary={article.summary}
                date={article.date}
              />
            ))}
          </div>
        )} */}
        {/* {/* {activeTab === 'benefits' && ( */}
          <div className="benefits-content">
            {/* Content for 作者公告 */}
          </div>
        {/* )} */}
          {activeTab === 'benefits' && <div className="benefits-content">Content for Author Gifts</div>}
          {activeTab === 'announcement' && <div className="announcement-content">Content for Author Announcement</div>}
        </div>
        
        {/* Interaction numbers */}
        <div className="interactions">
          <p className="interaction-text">Weekly Clicks: {getRandomInteraction()}</p>
          <p className="interaction-text">Monthly Clicks: {getRandomInteraction()}</p>
        </div>
      </div>
      <footer className="author-footer">
        {/* Links or additional information */}
        <a href="#">Privacy Policy</a> • <a href="#">Terms of Use</a>
      </footer>
    </div>
  );
}

export default AuthorZone;
