import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-Wealth.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;

