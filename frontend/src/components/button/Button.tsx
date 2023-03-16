// libraries
import React from 'react';
import Link from 'next/link';

// styles
import buttonStyles from "./button.module.scss";

interface ButtonProps {
  icon?: React.ReactNode;
  text: string;
  to?: string;
  styles?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, to, styles, onClick }) => {
  return (
    <button
      className={`${buttonStyles.button} ${!to ? buttonStyles.padding : ""}`}
      style={{ ...styles }}
      onClick={onClick}
    >
      {to ? (
        <Link href={to}>
        {icon ?? ""} {text}
      </Link>
      
      ) : (
        <>
          {icon ?? ""}
          {text}
        </>
      )}
    </button>
  );
};

export default Button;
