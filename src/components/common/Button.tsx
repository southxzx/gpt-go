import React from "react";

import "../../ui.css";
import LoadingIcon from "./Loading";

type IButtonProps = {
  disabled?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IButtonProps> = ({
  children,
  disabled = false,
  loading,
  className,
  style,
  ...rest
}) => {
  const _disabled = disabled || loading;
  return (
    <button
      disabled={_disabled}
      className={`${className} btn ${_disabled ? "btn-disabled" : ""}`}
      style={style}
      onClick={!_disabled ? rest.onClick : undefined}
      {...rest}
    >
      {loading ? <LoadingIcon /> : children}
    </button>
  );
};

export default Button;
