import React from "react";
import IconArrowUp from "../../assets/IconArrowUp";

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
  const [selectedValue, setSelectedValue] = React.useState<string>(
    placeholder || "..."
  );
  const [open, setOpen] = React.useState<boolean>(false);

  const onClick = () => {
    setOpen(!open);
  };

  const onSelectOption = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setOpen(false);
  };

  return (
    // <select
    //   value={selectedValue}
    //   className="item-box-wrapper"
    //   onChange={(e) => {
    //     const newValue = (e.target as any).value;
    //     setSelectedValue(newValue);
    //     onSelect(newValue);
    //   }}
    // >
    //   {placeholder && <option hidden>{placeholder}</option>}
    //   {values.map((value) => (
    //     <option value={value} key={value}>
    //       {value}
    //     </option>
    //   ))}
    // </select>
    <div className="dropdown-wrapper">
      <div
        className={`item-box-wrapper item-box-dropdown-wrapper ${
          open ? "active" : ""
        }`}
        onClick={onClick}
      >
        <p>{selectedValue}</p>
        <IconArrowUp />
      </div>
      {open && (
        <div className="dropdown-content">
          {values.map((value) => (
            <div key={value} className="dropdown-option">
              <p onClick={() => onSelectOption(value)}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemBoxSelect;
