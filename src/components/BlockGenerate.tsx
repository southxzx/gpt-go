import React, { useEffect } from "react";
import { get } from "lodash";

import TextField from "./common/TextField";
import Button from "./common/Button";
import ItemBox from "./common/ItemBox";
import ItemBoxSelect from "./common/ItemBoxSelect";

import { POST_MESSAGE_TYPE } from "../types/post-message";

import ChatGPTApi from "../api/chatgpt-api";

import "../ui.css";
import BlockResearch from "./BlockResearch";

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

interface IBlockGenerateProps {
  api: ChatGPTApi;
}

const generateObj = new Map();

const BlockGenerate: React.FC<IBlockGenerateProps> = ({ api }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [needSelectionText, setNeedSelectionText] =
    React.useState<boolean>(false);

  const onGenerate = async () => {
    if (needSelectionText) {
      getSelectionText();
    } else {
      generateResponse();
    }
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
      ? `${inputValue}: ${selectionValue}`
      : inputValue;
    const res = await api.sendMessage(messageValue);
    const message = get(
      res,
      "choices[0].message.content",
      "Can not generate! Please try again!"
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
    generateObj.set(key, text);
    let newText = "";
    generateObj.forEach((value) => {
      if (value) {
        newText += newText.length ? `, ${value}` : value;
      }
    });
    setInputValue(newText);
    if (!needSelectionText) {
      setNeedSelectionText(true);
    }
  };

  const onClickResearch = (text: string, _: string) => {
    setInputValue(text);
    generateObj.clear();
    if (needSelectionText) {
      setNeedSelectionText(false);
    }
  };

  const onReceiveMessageGenerate = (event: MessageEvent<any>) => {
    const { type, message } = event.data.pluginMessage;
    if (type === POST_MESSAGE_TYPE.GET_SELECTION_TEXT) {
      message && generateResponse(message);
    }
  };

  useEffect(() => {
    window.addEventListener("message", onReceiveMessageGenerate);
    return () =>
      window.removeEventListener("message", onReceiveMessageGenerate);
  }, [inputValue]);

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
          disabled={!inputValue}
          onClick={onGenerate}
          loading={loading}
          style={{ minWidth: 82 }}
        >
          Generate
        </Button>
      </div>

      <label>Improve Copies</label>
      <div className="block-content-wrapper">
        <ItemBoxSelect
          values={tone_options}
          onSelect={(val) => onClickOption(`Change tone to ${val}`, "Tone")}
          placeholder="Change Tone To..."
        />
        <ItemBoxSelect
          values={translate_options}
          onSelect={(val) => onClickOption(`Translate to ${val}`, "Translate")}
          placeholder="Translate To..."
        />
        {improve_options.map((option) => (
          <ItemBox
            text={option}
            key={option}
            onClick={() => onClickOption(option, option)}
          />
        ))}
      </div>
      <BlockResearch api={api} onClickOption={onClickResearch} />
    </div>
  );
};

export default BlockGenerate;
