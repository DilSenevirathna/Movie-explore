import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Movie Explorer. All rights reserved.</p>
        <p>
          Built with React and Material-UI By <b>Dilmi Senevirathna</b>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
