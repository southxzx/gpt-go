import React from "react";

import "../../ui.css";

type IButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <button className="btn" {...rest}>
      {children}
    </button>
  );
};

export default Button;
