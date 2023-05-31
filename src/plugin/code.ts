import { POST_MESSAGE_TYPE } from "../types/post-message";
import {
  generateResearch,
  generateUpdateText,
  getStorage,
  postStorage,
  getSelectionText,
  notify,
} from "./utils";

figma.showUI(__html__, {
  width: 400,
  height: 400,
});

figma.ui.onmessage = (msg) => {
  const message = msg.message || "";
  switch (msg.type) {
    case POST_MESSAGE_TYPE.GENERATE:
      generateUpdateText(message, msg.needSelectionText);
      break;
    case POST_MESSAGE_TYPE.GENERATE_RESEARCH:
      generateResearch(message);
      break;
    case POST_MESSAGE_TYPE.GET_STORAGE:
      getStorage(message);
      break;
    case POST_MESSAGE_TYPE.POST_STORAGE:
      postStorage(msg.key, message);
      break;
    case POST_MESSAGE_TYPE.GET_SELECTION_TEXT:
      getSelectionText();
      break;
    case POST_MESSAGE_TYPE.NOTIFY:
      notify(message);
      break;
    default:
      break;
  }
};
