import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaRegBell, FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { UserRound, Briefcase, Wallet, Settings } from "lucide-react";
import { RiHome2Line, RiLogoutCircleRLine } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count
  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  };

  // Load cart count from localStorage and listen for changes
  useEffect(() => {
    updateCartCount();

    // Listen for storage updates across tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        updateCartCount();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Listen for local cart updates within the same tab
  useEffect(() => {
    const interval = setInterval(() => {
      updateCartCount();
    }, 500); // Check every 500ms

    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown, .hamburger-menu, .user-info, .icon-button")) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="navbar" onClick={closeDropdown}>
      {/* Left Section - Menu & Logo */}
      <div className="navbar-left">
        <button className="hamburger-menu" onClick={(e) => { e.stopPropagation(); toggleDropdown("menu"); }}>
          <HiMenuAlt2 size={24} />
        </button>

        <div className={`dropdown-menu ${activeDropdown === "menu" ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <h3 className="menu-title">
            <button className="hamburger-menu" onClick={() => toggleDropdown("menu")}>
              <HiMenuAlt2 style={{ marginRight: "2px" }} size={24} /> Menu
            </button>
          </h3>
          <ul>
            <li className="menu-item"><Link to="/" onClick={() => setActiveDropdown(null)}><RiHome2Line style={{ marginRight: "10px" }} size={15} /> Home</Link></li>
            <li className="menu-item"><Link to="/Order" onClick={() => setActiveDropdown(null)}><Briefcase style={{ marginRight: "10px" }} size={15} /> Orders</Link></li>
            <li className="menu-item"><Link to="/support" onClick={() => setActiveDropdown(null)}><MdOutlineSupportAgent style={{ marginRight: "7px" }} size={15} /> Support</Link></li>
            <li className="menu-item"><Link to="/wallet" onClick={() => setActiveDropdown(null)}><Wallet style={{ marginRight: "10px" }} size={15} /> Wallet</Link></li>
            <li className="menu-item"><Link to="/settings" onClick={() => setActiveDropdown(null)}><Settings style={{ marginRight: "7px" }} size={15} /> Settings</Link></li>
            <li className="menu-item"><Link to="/logout" onClick={() => setActiveDropdown(null)}><RiLogoutCircleRLine style={{ marginRight: "7px" }} size={15} /> Logout</Link></li>
          </ul>
        </div>

        <img src={logo} alt="Logo" style={{ width: "100px", height: "100px" }} />
      </div>

      {/* Center Section: Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-button"><CiSearch size={20} /></button>
      </div>

      {/* Right Section: User, Notifications & Cart */}
      <div className="navbar-right">
        {/* User Dropdown */}
        <div className="user-info" onClick={(e) => { e.stopPropagation(); toggleDropdown("user"); }}>
          <UserRound style={{ marginRight: "10px" }} size={24} />
          <div className="user-text">
            <p className="user-welcome">Welcome,</p>
            <p className="sign-in">Sign in / Register <FaChevronDown size={15} /></p>
          </div>
        </div>
        <div className={`user-dropdown ${activeDropdown === "user" ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <Link to="/Signin"><button>Sign in</button></Link>
          <Link to="/Signup"><button className="register1">Register</button></Link>
          <ul>
            <li><Link to="/profile"><UserRound style={{ marginRight: '10px' }} size={15} /> My Account</Link></li>
            <li><Link to="/orders"><Briefcase style={{ marginRight: "10px" }} size={15} /> My Orders</Link></li>
            <li><Link to="/wallet"><Wallet style={{ marginRight: "10px" }} size={15} /> Wallet</Link></li>
            <li><Link to="/settings"><Settings style={{ marginRight: "10px" }} size={15} /> Settings</Link></li>
          </ul>
        </div>

        {/* Notifications Dropdown */}
        <button className="icon-button" onClick={(e) => { e.stopPropagation(); toggleDropdown("notifications"); }}>
          <FaRegBell size={24} />
        </button>
        <div className={`notifications-dropdown ${activeDropdown === "notifications" ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-notch"></div>
          <ul>
            <li>No new notifications</li>
          </ul>
        </div>

        {/* Shopping Cart with Dynamic Count */}
        <Link to={cartCount > 0 ? "/Populatedcart" : "/Emptycart"}>
          <button className="icon-button">
            <FaShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
