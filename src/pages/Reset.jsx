import React, { useState, useEffect } from "react";
import { X, ShieldBan, CheckCircle, ChevronLeft } from "lucide-react";
import "../pages/Reset.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Eye, EyeOff } from "lucide-react";

const Reset = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

  // Check if passwords match
  useEffect(() => {
    if (formData.password && formData.confirmpassword) {
      setDoPasswordsMatch(formData.password === formData.confirmpassword);
    }
  }, [formData.password, formData.confirmpassword]);

  // Check if form is valid
  useEffect(() => {
    const isEmailFilled = formData.email.trim() !== "";
    const isPasswordFilled = isPasswordValid;
    const isPasswordsMatch = doPasswordsMatch;
    
    // Form is valid if all conditions are met
    setIsFormValid(isEmailFilled && isPasswordFilled && isPasswordsMatch);
  }, [formData, isPasswordValid, doPasswordsMatch]);

  const handleClose = () => {
    navigate("/"); // Always navigate instead of calling onClose
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      if (name === "password") {
        setIsPasswordValid(validatePassword(value));
      }
      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setErrorMessage("Password must be 6-20 characters and include letters, numbers, and symbols.");
      return;
    }

    if (!doPasswordsMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(""); // Clear error message on successful submission
    console.log("Form submitted successfully");
    navigate("/Passwordresetsuccesfully");
  };

  return (
    <div className="signup-overlay">
      <div className="signup-modal2000">
        {/* Back and Close Icons */}
        <div className="top-icons">
          <button className="back-btnreset" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <button className="close-btn" onClick={onClose ? onClose : () => navigate("/")}>
            <X size={24} />
          </button>
        </div>

        <img
          src={logo}
          alt="Feed the Nation Logo"
          className="logo-img7"
        />
        <h2 className="reyp">Reset your password</h2>
        <p>Enter your new password</p>
        <small>
          <ShieldBan size={24} style={{ position: "relative", top: "5px", color: "black" }} /> Your information is 100% secured
        </small>

        <form onSubmit={handleSubmit}>
          <input
            className="curved-input"
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="password-container">
            <input
              className="curved-input"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-password12" onClick={() => setIsPasswordVisible((prev) => !prev)}>
              {isPasswordVisible ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="password-container">
            <input
              className="curved-input"
              type={isConfirmPasswordVisible ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm Password"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />
            <span className="toggle-password13" onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}>
              {isConfirmPasswordVisible ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}

          <ul className="password-hints190">
            <li>
              {isPasswordValid ? <CheckCircle size={20} color="green" /> : <span className="bullet1">&bull;</span>} 6 - 20 characters
            </li>
            <li>
              {isPasswordValid ? <CheckCircle size={20} color="green" /> : <span className="bullet1">&bull;</span>} Contains numbers, letters, and symbols
            </li>
            <li>
              {doPasswordsMatch ? <CheckCircle size={20} color="green" /> : <span className="bullet1">&bull;</span>} Passwords match
            </li>
          </ul>

          <button
            type="submit"
            className="signup-btn1"
            disabled={!isFormValid}
            style={{ backgroundColor: isFormValid ? '#008000' : '#DAF0C6' }} // Green if form is valid
          >
            Change Password
          </button>
        </form>

        <p className="signin1l90">For further support, you may visit the Help Center or contact our support team.</p>
      </div>
    </div>
  );
};

export default Reset;
