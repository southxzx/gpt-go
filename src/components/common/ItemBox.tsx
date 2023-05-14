import React from "react";

import "../../ui.css";

interface IItemBoxProps {
  text: string;
  onClick: () => void;
}

const ItemBox: React.FC<IItemBoxProps> = ({ text, onClick }) => {
  return (
    <div className="item-box-wrapper" onClick={onClick}>
      <p>{text}</p>
    </div>
  );
};

export default ItemBox;
