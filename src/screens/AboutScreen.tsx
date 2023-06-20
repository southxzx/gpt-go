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
    <div className="screen-container about-screen">
      <div className="info">
        <p>
          This plugin helps you guys faster the process of filling copies, now
          you can say good bye to the “Lorem Ipsum” Legendary.
        </p>
        <p>
          <span>NOTE: </span>To use this, you need to have{" "}
          <a
            href="https://platform.openai.com/account/usage"
            target="_blank"
            rel="nofollow"
          >
            available credit
          </a>{" "}
          in your OpenAI Account.
        </p>
      </div>
      <div className="bottom-block">
        <div className="left-bottom-block">
          <a href="mailto:example@example.com" target="_blank">
            Get Support
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSflzQh3ODnxBB6xxHyRRtl_N3tafGDLIvAwv9n0mpKFG-TjAQ/viewform?usp=sf_link"
            target="_blank"
            rel="nofollow"
          >
            Report Bug
          </a>
        </div>
        <Button onClick={onLogout} variant="secondary">
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default AboutScreen;
