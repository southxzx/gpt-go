import React from "react";
import IconBackChevron from "../assets/IconBackChevron";

interface IGetKeyGuideScreenProps {
  onBack: () => void;
}

const GetKeyGuideScreen: React.FC<IGetKeyGuideScreenProps> = ({ onBack }) => {
  return (
    <div className="get-key-guide-screen">
      <button className="btn-back" onClick={onBack}>
        <IconBackChevron />
        <span>Back</span>
      </button>
      <div className="guide-list">
        <p>1. Login to OpenAI</p>
        <p>2. Select API</p>
        <p>3. Click Personal, a dropdown list will be shown</p>
        <p>4. Select View API Keys</p>
        <p>5. Create your new secret key</p>
        <p>6. Copy that key and back to previous page &amp; paste there.</p>
      </div>
    </div>
  );
};

export default GetKeyGuideScreen;
