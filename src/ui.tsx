import * as React from "react";
import * as ReactDOM from "react-dom/client";
import ChatGPTApi from "./api/chatgpt-api";
import BlockResearch from "./components/BlockResearch";

import "./ui.css";

export const App = () => {
  const api = new ChatGPTApi({
    apiKey: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await api.sendMessage(message);
  };
  const [message, setMessage] = React.useState<string>("");
  return (
    <div>
      <BlockResearch api={api} />
      {/* <form onSubmit={onSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form> */}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
