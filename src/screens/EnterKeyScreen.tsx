import React from "react";
import Button from "../components/common/Button";
import TextField from "../components/common/TextField";
import { POST_MESSAGE_TYPE } from "../types/post-message";
import GetKeyGuideScreen from "./GetKeyGuideScreen";

interface IEnterKeyScreenProps {
  onSubmitKey: (key: string) => void;
}

type ScreenToShow = "enter-key" | "get-key-guide";

const EnterKeyScreen: React.FC<IEnterKeyScreenProps> = ({ onSubmitKey }) => {
  const [key, setKey] = React.useState("");
  const [screenToShow, setScreenToShow] =
    React.useState<ScreenToShow>("enter-key");

  const handleSubmitKey = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: POST_MESSAGE_TYPE.POST_STORAGE,
          key: "gpt_key",
          message: key,
        },
      },
      "*"
    );
    onSubmitKey(key);
  };

  const handleNavigate = (key: ScreenToShow) => {
    setScreenToShow(key);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitKey();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  if (screenToShow === "enter-key") {
    return (
      <div className="enter-key-screen">
        <h1>Say Good Bye to “Lorem Ipsum”</h1>
        <p className="description">To continue, enter your OpenAI's API key</p>

        <TextField
          placeholder="Enter OpenAI's API Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={onKeyDown}
          className="key-input"
        />
        <div className="bottom-block">
          <p
            className="get-key-question"
            onClick={() => handleNavigate("get-key-guide")}
          >
            How to have API Key?
          </p>
          <Button onClick={handleSubmitKey} disabled={!key}>
            Let's Go
          </Button>
        </div>
      </div>
    );
  } else {
    return <GetKeyGuideScreen onBack={() => handleNavigate("enter-key")} />;
  }
};

export default EnterKeyScreen;
