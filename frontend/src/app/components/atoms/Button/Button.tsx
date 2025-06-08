"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border rounded-lg px-3 py-1.5 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
