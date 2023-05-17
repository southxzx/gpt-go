import { POST_MESSAGE_TYPE } from "../types/post-message";
import {
  generateResearch,
  generateUpdateText,
  getStorage,
  postStorage,
} from "./utils";

figma.showUI(__html__, {
  width: 500,
  height: 500,
});

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case POST_MESSAGE_TYPE.GENERATE:
      generateUpdateText(msg.message);
      break;
    case POST_MESSAGE_TYPE.GENERATE_RESEARCH:
      generateResearch(msg.message);
      break;
    case POST_MESSAGE_TYPE.GET_STORAGE:
      getStorage(msg.message);
      break;
    case POST_MESSAGE_TYPE.POST_STORAGE:
      postStorage(msg.key, msg.message);
      break;
    default:
      break;
  }
};
