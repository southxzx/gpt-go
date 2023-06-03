import React from "react";

import "../../ui.css";

interface IItemBoxProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

const ItemBox: React.FC<IItemBoxProps> = ({
  text,
  disabled = false,
  onClick,
}) => {
  return (
    <div
      className={`item-box-wrapper ${disabled ? "disabled" : ""}`}
      onClick={onClick}
    >
      <p>{text}</p>
    </div>
  );
};

export default ItemBox;
