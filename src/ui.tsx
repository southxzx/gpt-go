import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ChatGPTApi from "./api/chatgpt-api";
import Tabs from "./components/common/Tabs";
import AboutScreen from "./screens/AboutScreen";
import EnterKeyScreen from "./screens/EnterKeyScreen";
import EditTextScreen from "./screens/EditTextScreen";
import ResearchScreen from "./screens/ResearchScreen";
import { POST_MESSAGE_TYPE } from "./types/post-message";

import "./ui.css";

const api = new ChatGPTApi({
  apiKey: "",
});

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const tab_items = [
    {
      label: "Edit Text",
      children: <EditTextScreen api={api} />,
      key: "quick_access",
    },
    {
      label: "Research",
      children: <ResearchScreen api={api} />,
      key: "prompt_template",
    },
    {
      label: "About",
      children: <AboutScreen api={api} />,
      key: "about",
    },
  ];

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

  React.useEffect(() => {
    authenticateUser();
    window.addEventListener("message", onReceiveMessage);
    return () => window.removeEventListener("message", onReceiveMessage);
  }, []);

  if (loading) {
    return <p>...loading</p>;
  }

  return (
    <div className="content-wrapper">
      {isAuthenticated ? (
        <Tabs items={tab_items} initialKey="quick_access" />
      ) : (
        <EnterKeyScreen onSubmitKey={onSubmitKey} />
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
