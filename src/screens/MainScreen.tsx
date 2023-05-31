import React from "react";
import ChatGPTApi from "../api/chatgpt-api";
import BlockGenerate from "../components/BlockGenerate";

interface IMainScreenProps {
  api: ChatGPTApi;
}

const MainScreen: React.FC<IMainScreenProps> = ({ api }) => {
  return <BlockGenerate api={api} />;
};

export default MainScreen;
