import React, { useState, useRef } from 'react';
import './Message.css';
import { ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Vector from "../assets/Vector.png";
import Jamwrite from "../assets/jam_write.png";
import messagesend from "../assets/messagesend.svg";

const Message = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const togglePopup = (e) => {
    e.stopPropagation();
    setShowPopup(prev => !prev);
  };

  const handleFileChange = (e) => {
    console.log('File uploaded:', e.target.files);
  };

  const handleCameraClick = () => {
    cameraInputRef.current.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current.click();
  };

  const handleDocumentClick = () => {
    fileInputRef.current.click();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages(prev => [{ sender: "user", text: newMessage }, ...prev]);
    setNewMessage("");
  };

  return (
    <div className="message-container">
      <div className='messages'>
        <div className="orderdetailsicons">
          <button className="orderdetails-back-btn1" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </button>
        </div>
        <p>Messages</p>
        <div className="jamwriteicons">
          <img 
            src={Jamwrite} 
            className="jamwrite-back-btn1" 
            alt="Write Message" 
            onClick={togglePopup}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <div className="message-content">
        <div className="message-empty">
          <img src={Vector} alt="Empty Orders" className="message-image" />
          <p className="messagetext0">No Messages</p>
          <p className="message-text">Your past messages with the team will be seen here</p>
          <button className="message-button">Send us a Message</button>
        </div>
      </div>

      {showPopup && (
        <div className="chat-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="chat-popup" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <div className="chat-avatar1">BVC</div>
              <span className="chat-title">Sir Bond</span>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="chat-body">
              <div className="chat-avatar">BVC</div>
              <p className="chat-subtext">Ask us anything, we are here to assist you.</p>

              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="chat-footer">
              <input 
                type="text" 
                placeholder="Message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <img 
                src={messagesend} 
                alt="Send" 
                onClick={handleSendMessage}
                style={{ cursor: 'pointer' }}
              />

              <div className="upload-icons">
                <button onClick={handleCameraClick} className="upload-icon">
                  <img src="/path_to_camera_icon.png" alt="Camera" />
                  <input 
                    ref={cameraInputRef} 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                  />
                </button>

                <button onClick={handleDocumentClick} className="upload-icon">
                  <img src="/path_to_document_icon.png" alt="Document" />
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                  />
                </button>

                <button onClick={handleGalleryClick} className="upload-icon">
                  <img src="/path_to_gallery_icon.png" alt="Gallery" />
                  <input 
                    ref={galleryInputRef} 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    onChange={handleFileChange} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
