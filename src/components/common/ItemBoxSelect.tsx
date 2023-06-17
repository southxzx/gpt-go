import React, { useEffect, useRef } from "react";
import IconArrowUp from "../../assets/IconArrowUp";
import useClickOutside from "../../hooks/useClickOutside";

import "../../ui.css";

interface IItemBoxProps {
  values: string[];
  placeholder?: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
  isReset?: boolean;
}

const ItemBoxSelect: React.FC<IItemBoxProps> = ({
  values,
  onSelect,
  placeholder,
  disabled = false,
  isReset = false,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>(
    placeholder || "..."
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (!selectRef.current?.contains(e.target as Node)) setOpen(false);
    e.stopPropagation();
  };

  useClickOutside(contentRef, handleOutsideClick);

  const onClick = () => {
    setOpen(!open);
  };

  const onSelectOption = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setOpen(false);
  };

  useEffect(() => {
    if (isReset) {
      setSelectedValue(placeholder || "...");
    }
  }, [isReset]);

  return (
    <div className="dropdown-wrapper">
      <div
        className={`item-box-wrapper item-box-dropdown-wrapper ${
          open ? "active" : ""
        } ${disabled ? "disabled" : ""}`}
        onClick={onClick}
        ref={selectRef}
      >
        <p>{selectedValue}</p>
        <IconArrowUp />
      </div>
      {open && (
        <div className="dropdown-content" ref={contentRef}>
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
