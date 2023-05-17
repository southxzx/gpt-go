import React from "react";

import "../../ui.css";

interface IItemBoxProps {
  values: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

const ItemBoxSelect: React.FC<IItemBoxProps> = ({
  values,
  onSelect,
  placeholder,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>("...");
  return (
    <select
      value={selectedValue}
      className="item-box-wrapper"
      onChange={(e) => {
        const newValue = (e.target as any).value;
        setSelectedValue(newValue);
        onSelect(newValue);
      }}
    >
      {placeholder && (
        <option selected hidden>
          {placeholder}
        </option>
      )}
      {values.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default ItemBoxSelect;
