import React from "react";
import get from "lodash/get";
import ItemBox from "./common/ItemBox";
import ChatGPTApi from "../api/chatgpt-api";
import { POST_MESSAGE_TYPE } from "../types/post-message";

import "../ui.css";

const research_options = [
  "Sample User Flow",
  "Page Structure",
  "User Personas",
  "Competitor Analysis",
];

interface IBlockResearchProps {
  api: ChatGPTApi;
  onClickOption: (value: string, key: string) => void;
}

const BlockResearch: React.FC<IBlockResearchProps> = ({
  api,
  onClickOption,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  // const onHandleClick = async (text: string) => {
  // setLoading(true);
  // const res = await api.sendMessage(
  //   `Generate a short research for ${text} in UI/UX design`
  // );
  // setLoading(false);
  // const message = get(
  //   res,
  //   "choices[0].message.content",
  //   "Can not generate! Please try again!"
  // );
  // // parent.postMessage({ type: POST_MESSAGE_TYPE.GENERATE_RESEARCH, message });
  // parent.postMessage(
  //   { pluginMessage: { type: POST_MESSAGE_TYPE.GENERATE_RESEARCH, message } },
  //   "*"
  // );
  // };

  return (
    <div>
      <label>Research</label>
      {loading && <span>&nbsp;...loading</span>}
      <div className="block-content-wrapper">
        {research_options.map((option) => (
          <ItemBox
            text={option}
            key={option}
            onClick={() =>
              onClickOption(
                `Generate a short research for ${option} in UI/UX design`,
                `research_${option}`
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BlockResearch;
