import { generateResearch, getStorage, postStorage } from "./utils";

figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case "generate-research":
      generateResearch(msg.message);
    case "get-storage":
      getStorage(msg.message);
    case "post-storage":
      postStorage(msg.key, msg.message);
    default:
      break;
  }
};
