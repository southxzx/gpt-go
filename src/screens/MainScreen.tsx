import React from "react";
import ChatGPTApi from "../api/chatgpt-api";
import BlockResearch from "../components/BlockResearch";
import Button from "../components/common/Button";
import { POST_MESSAGE_TYPE } from "../types/post-message";

interface IMainScreenProps {
  api: ChatGPTApi;
}

const MainScreen: React.FC<IMainScreenProps> = ({ api }) => {
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
      <BlockResearch api={api} />
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default MainScreen;
