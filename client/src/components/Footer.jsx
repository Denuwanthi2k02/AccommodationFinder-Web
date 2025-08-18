import React from 'react';
import { assets } from '../assets/assets';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-top">
        {/* Logo & Description */}
        <div className="footer-section">
          <img src={assets.logo} alt="logo" className="footer-logo" />
          <p className="footer-description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
          <div className="footer-social">
            <a href="#"><img src={assets.facebook_logo} alt="Facebook" /></a>
            <a href="#"><img src={assets.instagram_logo} alt="Instagram" /></a>
            <a href="#"><img src={assets.twitter_logo} alt="Twitter" /></a>
            <a href="#"><img src={assets.gmail_logo} alt="Gmail" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2 className="footer-title">Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Browse Accommodations</a></li>
            <li><a href="#">List Your Accommodations</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h2 className="footer-title">Resources</h2>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h2 className="footer-title">Contact</h2>
          <ul>
            <li>1234 AnnexMate</li>
            <li>Colombo, Sri Lanka</li>
            <li>+94 77 123 1234</li>
            <li>annexmate@gmail.com</li>
          </ul>
        </div>
      </div>

      

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.</p>
        <ul>
          <li><a href="#">Privacy</a> </li>
          <li> | </li>
          <li><a href="#">Terms</a> </li>
          <li> | </li>
          <li><a href="#">Cookies</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
