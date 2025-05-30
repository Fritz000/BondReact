import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ShieldBan } from "lucide-react";
import "../pages/Resetpassword.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";

const Resetpassword = ({ onClose }) => {
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        email: "",
    });

    const [isFormComplete, setIsFormComplete] = useState(false); // Track if form is complete

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Check if the email field is filled
    useEffect(() => {
        const isComplete = formData.email.trim() !== "";
        setIsFormComplete(isComplete);
    }, [formData]);

    return (
        <div className="signup-overlay">
            <div className="signup-modal2">
                <div className="top-icons">
                    <button className="back-btnreset" onClick={() => navigate(-1)}>  
                        <ChevronLeft size={24} />
                    </button>
                    <button className="close-btn" onClick={onClose ? onClose : () => navigate("/")}>
                        <X size={24} />
                    </button>
                </div>

                {/* Header */}
                <img
                    src={logo}
                    alt="Feed the Nation Logo" className='logo-img'
                />
                <h2>Reset your password</h2>
                <p>We will send a security code to the email address below to reset your password.</p>
                <small>
                    <ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured
                </small>

                <form>
                    <div className="password-container">
                        <input
                            className="curved-input"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <Link to="/Securitycode">
                        <button
                            type="submit"
                            className="signup-btn1"
                            disabled={!isFormComplete}
                            style={{ backgroundColor: isFormComplete ? '#008000' : '#DAF0C6' }} // Green if filled
                        >
                            Reset Password
                        </button>
                    </Link>
                </form>

                <p className="signin4">
                    For further support, you may visit the Help Center or contact our support team.
                </p>
            </div>
        </div>
    );
};

export default Resetpassword;
