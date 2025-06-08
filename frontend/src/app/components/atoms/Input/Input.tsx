'use client';
import React from 'react';

interface InputProps {
  type?: string;
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  className = '',
  required = false,
  disabled = false,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full py-1.5 px-3 border rounded-lg ${className}`}
      required={required}
      disabled={disabled}
    />
  );
};

export default Input;
