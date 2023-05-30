import React from "react";
import ChatGPTApi from "../api/chatgpt-api";
import Button from "../components/common/Button";
import { POST_MESSAGE_TYPE } from "../types/post-message";

interface IAboutScreenProps {
  api: ChatGPTApi;
}

const AboutScreen: React.FC<IAboutScreenProps> = ({ api }) => {
  const onLogout = () => {
    api.setApiKey("");
    parent.postMessage(
      {
        pluginMessage: {
          type: POST_MESSAGE_TYPE.POST_STORAGE,
          key: "gpt_key",
          message: "",
        },
      },
      "*"
    );
  };
  return (
    <div>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default AboutScreen;
