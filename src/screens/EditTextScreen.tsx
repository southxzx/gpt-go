import get from "lodash/get";
import React, { useEffect } from "react";
import ChatGPTApi from "../api/chatgpt-api";
import Button from "../components/common/Button";
import ItemBox from "../components/common/ItemBox";
import ItemBoxSelect from "../components/common/ItemBoxSelect";
import LoadingLine from "../components/common/LoadingLine";
import TextField from "../components/common/TextField";
import { POST_MESSAGE_TYPE } from "../types/post-message";

const improve_options = ["Simplify", "Make Longer", "Make Shorter"];
const tone_options = [
  "Professional",
  "Confident",
  "Casual",
  "Straightforward",
  "Friendly",
];
const translate_options = [
  "Arabic",
  "Chinese",
  "English",
  "French",
  "German",
  "Japanese",
  "Korean",
  "Portuguese",
  "Russian",
  "Spanish",
  "Thai",
  "Vietnamese",
];

interface IEditTextScreenProps {
  api: ChatGPTApi;
}

const generateObj = new Map();

const EditTextScreen: React.FC<IEditTextScreenProps> = ({ api }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [quickAccessValue, setQuickAccessValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [needSelectionText, setNeedSelectionText] =
    React.useState<boolean>(false);

  const onGenerate = async () => {
    getSelectionText();
  };

  const getSelectionText = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: POST_MESSAGE_TYPE.GET_SELECTION_TEXT,
        },
      },
      "*"
    );
  };

  const generateResponse = async (selectionValue = "") => {
    setLoading(true);

    const messageValue = selectionValue
      ? `${inputValue || quickAccessValue}: ${selectionValue}`
      : inputValue || quickAccessValue;
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
          needSelectionText,
        },
      },
      "*"
    );
    setLoading(false);
  };

  const onClickOption = (text: string, key: string) => {
    setQuickAccessValue(text);
    setInputValue("");
    onGenerate();
  };

  const onReceiveMessageGenerate = (event: MessageEvent<any>) => {
    const { type, message } = event.data.pluginMessage;
    if (type === POST_MESSAGE_TYPE.GET_SELECTION_TEXT) {
      message && generateResponse(message);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue) {
      return;
    }
    if (e.key === "Enter") {
      onGenerate();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("message", onReceiveMessageGenerate);
    return () =>
      window.removeEventListener("message", onReceiveMessageGenerate);
  }, [inputValue]);

  return (
    <div className="screen-container">
      <div>
        <div className="block-generate-input-wrapper">
          <TextField
            isTextArea={true}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="block-generate-input"
            placeholder="Generate copy for landing page..."
            onKeyDown={onKeyDown}
            autoFocus={true}
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
          <ItemBoxSelect
            values={tone_options}
            disabled={loading}
            onSelect={(val) => onClickOption(`Change tone to ${val}`, "Tone")}
            placeholder="Change Tone To..."
          />
          <ItemBoxSelect
            values={translate_options}
            disabled={loading}
            onSelect={(val) =>
              onClickOption(`Translate to ${val}`, "Translate")
            }
            placeholder="Translate To..."
          />
          {improve_options.map((option) => (
            <ItemBox
              text={option}
              key={option}
              disabled={loading}
              onClick={() => onClickOption(option, option)}
            />
          ))}
        </div>
      </div>
      {loading && <LoadingLine />}
    </div>
  );
};

export default EditTextScreen;
