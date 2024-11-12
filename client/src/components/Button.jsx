import React from "react";
import { Link } from "react-router-dom";

const Button = ({ link, children, white, className, onClick }) => {
  const classes = `button h-10 w-32 relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 rounded-lg bg-white/15 p-0.5 ${white ? "text-n-6" : "text-n-1"} ${className || ""}`;

  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button type="button" className={classes} onClick={onClick}>
      <span className="flex h-full w-full items-center justify-center rounded-lg bg-n-2">
        {children}
      </span>
    </button>
  );

  const renderLink = () => (
    <Link to={link}>
      <span className={spanClasses}> {children} </span>
    </Link>
  );

  return link ? renderLink() : renderButton();
};

export default Button;
