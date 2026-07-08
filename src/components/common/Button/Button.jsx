"use client";

import "./Button.css";

const Button = ({ title, children, type, className, onClick, htmlType = "button" }) => {
  const classes = ["custom-btn", type, className].filter(Boolean).join(" ");

  return (
    <button type={htmlType} className={classes} onClick={onClick}>
      {children ?? title}
    </button>
  );
};

export default Button;