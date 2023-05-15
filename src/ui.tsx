import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ChatGPTApi from "./api/chatgpt-api";
import BlockResearch from "./components/BlockResearch";
import EnterKeyScreen from "./screens/EnterKeyScreen";
import MainScreen from "./screens/MainScreen";
import { POST_MESSAGE_TYPE } from "./types/post-message";

import "./ui.css";

export const App = () => {
  const api = new ChatGPTApi({
    apiKey: "",
  });

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    authenticateUser();
  });

  const authenticateUser = async () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: POST_MESSAGE_TYPE.GET_STORAGE,
          message: "gpt_key",
        },
      },
      "*"
    );
  };

  const onReceiveMessage = (event: MessageEvent<any>) => {
    setLoading(false);
    const { data } = event;
    if (data.pluginMessage.type === POST_MESSAGE_TYPE.GET_STORAGE) {
      const { message } = data.pluginMessage;
      if (message) {
        setIsAuthenticated(true);
        api.setApiKey(message);
      }
    } else if (data.pluginMessage.type === POST_MESSAGE_TYPE.POST_STORAGE) {
      const { message, key } = data.pluginMessage;
      if (key === "gpt_key") {
        setIsAuthenticated(Boolean(message));
        api.setApiKey(message);
      }
    }
  };

  const onSubmitKey = (key: string) => {
    api.setApiKey(key);
    setIsAuthenticated(true);
  };

  window.addEventListener("message", onReceiveMessage);

  if (loading) {
    return <p>...loading</p>;
  }

  return isAuthenticated ? (
    <MainScreen api={api} />
  ) : (
    <EnterKeyScreen onSubmitKey={onSubmitKey} />
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
