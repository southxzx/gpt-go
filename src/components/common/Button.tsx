import React from "react";

import "../../ui.css";

type IButtonProps = {
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IButtonProps> = ({
  children,
  disabled = false,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${disabled ? "btn-disabled" : ""}`}
      onClick={!disabled ? rest.onClick : undefined}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
