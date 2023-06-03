import React from "react";
import ChatGPTApi from "../api/chatgpt-api";
import BlockResearch from "../components/BlockResearch";
import Button from "../components/common/Button";
import ItemBox from "../components/common/ItemBox";
import TextField from "../components/common/TextField";

interface IResearchScreenProps {
  api: ChatGPTApi;
}

const research_options = [
  "Sample User Flow",
  "Page Structure",
  "User Personas",
  "Competitor Analysis",
];

const ResearchScreen: React.FC<IResearchScreenProps> = ({ api }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const onGenerate = async () => {};
  return (
    <div>
      <div className="block-generate-input-wrapper">
        <TextField
          isTextArea={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block-generate-input"
          placeholder="Generate copy for landing page..."
        />
        <Button
          disabled={!inputValue || loading}
          onClick={onGenerate}
          // loading={loading}
          style={{ minWidth: 82 }}
        >
          Generate
        </Button>
      </div>
      <label>Quick Access</label>
      {loading && <span>&nbsp;...loading</span>}
      <div className="block-content-wrapper">
        {research_options.map((option) => (
          <ItemBox
            text={option}
            key={option}
            onClick={() =>
              // onClickOption(
              //   `Generate a short research for ${option} in UI/UX design`,
              //   `research_${option}`
              // )
              {}
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ResearchScreen;
