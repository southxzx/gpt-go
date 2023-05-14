import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./ui.css";

export const App = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
