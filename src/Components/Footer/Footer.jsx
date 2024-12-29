import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>Get In Touch</h4>
                <hr className="footer-underline" />
                <p>Address: Delhi, India</p>
                <p>Phone: +919876543210</p>
                <p>Email: admin@gmail.com</p>
                <p>Monday-Friday: 9:27 PM - 9:27 PM</p>
                <p>Saturday: 9:27 PM - 9:27 PM</p>
               
            </div>

            <div className="footer-section">
                <h4>Useful Links</h4>
                <hr className="footer-underline" />
                <ul className="footer-links">
                    <li><a href="#">Faq</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms & Service</a></li>
                    <li><a href="#">Return Policy</a></li>
                    <li><a href="#">How It Works</a></li>
                </ul>
            </div>

            <div className="footer-section">
                <h4>Newsletter</h4>
                <hr className="footer-underline" />
                <form className="newsletter-form">
                    <input type="email" placeholder="Your e-mail" />
                    <button type="submit">Subscribe</button>
                </form>
                <p>Subscribe to our Newsletter to receive early discount offers, latest news, sales, and promo information.</p>
            </div>
        </footer>
    );
};

export default Footer;
