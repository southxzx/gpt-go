import React from "react";
import get from "lodash/get";
import ItemBox from "./common/ItemBox";
import ChatGPTApi from "../api/chatgpt-api";
import { POST_MESSAGE_TYPE } from "../types/post-message";

import "../ui.css";

const mocks = ["Sample User Flow", "Page Structure", "Page Layout"];

interface IBlockResearchProps {
  api: ChatGPTApi;
}

const BlockResearch: React.FC<IBlockResearchProps> = ({ api }) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const onHandleClick = async (text: string) => {
    setLoading(true);
    const res = await api.sendMessage(
      `Generate a short research for ${text} in UI/UX design`
    );
    setLoading(false);
    const message = get(
      res,
      "choices[0].message.content",
      "Can not generate! Please try again!"
    );
    // parent.postMessage({ type: POST_MESSAGE_TYPE.GENERATE_RESEARCH, message });
    parent.postMessage(
      { pluginMessage: { type: POST_MESSAGE_TYPE.GENERATE_RESEARCH, message } },
      "*"
    );
  };

  return (
    <div>
      <span>Research</span>
      {loading && <span>&nbsp;...loading</span>}
      <div className="block-content-wrapper">
        {mocks.map((mock) => (
          <ItemBox text={mock} key={mock} onClick={() => onHandleClick(mock)} />
        ))}
      </div>
    </div>
  );
};

export default BlockResearch;
