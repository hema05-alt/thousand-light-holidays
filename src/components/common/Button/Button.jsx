"use client";

import "./Button.css";

const Button = ({ title, type, className, onClick }) => {
  return (
    <button className={`custom-btn ${type} ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;