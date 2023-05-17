import React from "react";
import Button from "./common/Button";
import TextField from "./common/TextField";

import "../ui.css";
import { POST_MESSAGE_TYPE } from "../types/post-message";
import ItemBox from "./common/ItemBox";
import ItemBoxSelect from "./common/ItemBoxSelect";

const mocks = ["Simplify", "Make longer", "Make shorter"];
const tone_options = [
  "Professional",
  "Confident",
  "Casual",
  "Straightforward",
  "Friendly",
];
const translate_options = ["Vietnamese", "English"];

const BlockGenerate: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const onGenerate = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: POST_MESSAGE_TYPE.GENERATE,
          message: inputValue,
        },
      },
      "*"
    );
  };
  const onClickOption = (text: string) => {
    setInputValue(text);
    parent.postMessage(
      {
        pluginMessage: {
          type: POST_MESSAGE_TYPE.GENERATE,
          message: text,
        },
      },
      "*"
    );
  };
  return (
    <div>
      <div className="block-generate-input-wrapper">
        <TextField
          isTextArea={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button disabled={!inputValue} onClick={onGenerate}>
          Generate
        </Button>
      </div>

      <span>Improve Copies</span>
      {loading && <span>&nbsp;...loading</span>}
      <div className="block-content-wrapper">
        <ItemBoxSelect
          values={tone_options}
          onSelect={(val) => onClickOption(`Change tone to ${val}`)}
          placeholder="Change tone to..."
        />
        <ItemBoxSelect
          values={translate_options}
          onSelect={(val) => onClickOption(`Translate to ${val}`)}
          placeholder="Translate to..."
        />
        {mocks.map((mock) => (
          <ItemBox text={mock} key={mock} onClick={() => onClickOption(mock)} />
        ))}
      </div>
    </div>
  );
};

export default BlockGenerate;
