import get from "lodash/get";
import React, { useEffect } from "react";
import ChatGPTApi from "../api/chatgpt-api";
import Button from "../components/common/Button";
import ItemBox from "../components/common/ItemBox";
import LoadingLine from "../components/common/LoadingLine";
import SuggestionTextField from "../components/common/SuggestionTextField";
import { POST_MESSAGE_TYPE } from "../types/post-message";

interface IResearchScreenProps {
  api: ChatGPTApi;
}

const research_options = [
  "Sample User Flow",
  "Page Structure",
  "User Personas",
  "Competitor Analysis",
];

const suggestionPlaceholder = "News App";

const ResearchScreen: React.FC<IResearchScreenProps> = ({ api }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [shouldShowSuggestions, setShouldShowSuggestions] =
    React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const onClickOption = (text: string, key: string) => {
    setInputValue(text);
    setShouldShowSuggestions(true);
    inputRef.current?.focus();
  };

  const generateResponse = async (selectionValue = "") => {
    setLoading(true);

    const messageValue = selectionValue
      ? `${inputValue}: ${selectionValue}`
      : inputValue;
    const res = await api.sendMessage(messageValue);
    const message = get(
      res,
      "choices[0].message.content",
      "Can not generate. Please try again!"
    );
    parent.postMessage(
      {
        pluginMessage: {
          type: POST_MESSAGE_TYPE.GENERATE,
          message: message,
          needSelectionText: false,
        },
      },
      "*"
    );
    setLoading(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onGenerate = async () => {
    generateResponse();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!inputValue) {
      return;
    }
    if (e.key === "Tab" && shouldShowSuggestions) {
      setInputValue((prev) => prev + " " + suggestionPlaceholder);
      setShouldShowSuggestions(false);
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const onChangeTextField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    shouldShowSuggestions && setShouldShowSuggestions(false);
  };

  return (
    <div className="screen-container">
      <div>
        <div className="block-generate-input-wrapper">
          <SuggestionTextField
            ref={inputRef}
            value={inputValue}
            onChange={onChangeTextField}
            className="block-generate-input"
            placeholder="Generate copy for landing page..."
            autoFocus={true}
            shouldShowSuggestions={shouldShowSuggestions}
            suggestionPlaceholder={suggestionPlaceholder}
            onKeyDown={onKeyDown}
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
        <div className="block-content-wrapper">
          {research_options.map((option) => (
            <ItemBox
              text={option}
              key={option}
              disabled={loading}
              onClick={() =>
                onClickOption(`Generate ${option} for`, `research_${option}`)
              }
            />
          ))}
        </div>
      </div>
      {loading && <LoadingLine />}
    </div>
  );
};

export default ResearchScreen;
