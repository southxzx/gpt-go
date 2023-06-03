import React from "react";

interface ITabsProps {
  items: {
    label: string;
    children: React.ReactNode;
    key: string;
  }[];
  initialKey: string;
}

const Tabs: React.FC<ITabsProps> = ({ items, initialKey }) => {
  const [activeTab, setActiveTab] = React.useState<string>(initialKey);
  return (
    <>
      <div className="tab-label-wrapper">
        {items.map((item) => (
          <button
            className={`tab-label ${activeTab === item.key ? "selected" : ""}`}
            onClick={() => setActiveTab(item.key)}
            key={item.key}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          style={{ display: activeTab === item.key ? "block" : "none" }}
          key={item.key}
          className="tab-content"
        >
          {item.children}
        </div>
      ))}
    </>
  );
};

export default Tabs;
