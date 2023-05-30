import React, { useEffect } from "react";
import Button from "./common/Button";
import TextField from "./common/TextField";

import "../ui.css";
import {
  MESSAGE_RESPONSE_TEXT,
  POST_MESSAGE_TYPE,
} from "../types/post-message";
import ItemBox from "./common/ItemBox";
import ItemBoxSelect from "./common/ItemBoxSelect";
import ChatGPTApi from "../api/chatgpt-api";
import { get } from "lodash";

const mocks = ["Simplify", "Make Longer", "Make Shorter"];
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

const BlockGenerate: React.FC<IBlockGenerateProps> = ({ api }) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

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

  const generateResponse = async (selectionValue: string) => {
    setLoading(true);
    const messageValue = `${inputValue}: ${selectionValue}`;
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
        },
      },
      "*"
    );
    setLoading(false);
  };

  const onClickOption = (text: string) => {
    let newText = "";
    if (inputValue) {
      newText = `${inputValue}, ${text}`;
    } else {
      newText = text;
    }
    setInputValue(newText);
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
        <Button disabled={!inputValue} onClick={onGenerate}>
          Generate
        </Button>
      </div>

      <label>Improve Copies</label>
      {loading && <span>&nbsp;...loading</span>}
      <div className="block-content-wrapper">
        <ItemBoxSelect
          values={tone_options}
          onSelect={(val) => onClickOption(`Change tone to ${val}`)}
          placeholder="Change Tone To..."
        />
        <ItemBoxSelect
          values={translate_options}
          onSelect={(val) => onClickOption(`Translate to ${val}`)}
          placeholder="Translate To..."
        />
        {mocks.map((mock) => (
          <ItemBox text={mock} key={mock} onClick={() => onClickOption(mock)} />
        ))}
      </div>
    </div>
  );
};

export default BlockGenerate;
