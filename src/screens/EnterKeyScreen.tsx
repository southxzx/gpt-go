import React from "react";
import Button from "../components/common/Button";
import TextField from "../components/common/TextField";
import { POST_MESSAGE_TYPE } from "../types/post-message";

interface IEnterKeyScreenProps {
  onSubmitKey: (key: string) => void;
}

const EnterKeyScreen: React.FC<IEnterKeyScreenProps> = ({ onSubmitKey }) => {
  const [key, setKey] = React.useState("");

  const handleClick = () => {
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

  return (
    <div>
      <p>Bye bye "Lorem Ipsum" with GPT Go!</p>
      <p>Firstly, enter your openAI's API key to start using</p>

      <TextField
        placeholder="OpenAI's API Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Button onClick={() => handleClick()}>Let's Go</Button>
    </div>
  );
};

export default EnterKeyScreen;
