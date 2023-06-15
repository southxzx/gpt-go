import {
  MESSAGE_RESPONSE_TEXT,
  POST_MESSAGE_TYPE,
} from "../types/post-message";

const generateResearch = async (message: string) => {
  const textValue = message;
  const node = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  node.x = 50;
  node.characters = textValue;
  node.fontSize = 18;
  node.fills = [{ type: "SOLID", color: { r: 0.3, g: 0.8, b: 0.6 } }];
  node.resize(800, node.height);
  figma.currentPage.appendChild(node);
  figma.currentPage.selection = [node];
  figma.viewport.scrollAndZoomIntoView([node]);
};

const getStorage = async (message = "") => {
  const storage = await figma.clientStorage.getAsync(message);

  figma.ui.postMessage({
    type: POST_MESSAGE_TYPE.GET_STORAGE,
    message: storage,
  });
};

const postStorage = async (key: string, message: string) => {
  await figma.clientStorage.setAsync(key, message);

  figma.ui.postMessage({
    type: POST_MESSAGE_TYPE.POST_STORAGE,
    message,
    key,
  });
};

const generateUpdateText = async (
  message: string,
  needSelectionText = true
) => {
  const textValue = message;
  const nodes = figma.currentPage.selection as TextNode[];

  try {
    if (nodes.length === 0 && needSelectionText) {
      notify(MESSAGE_RESPONSE_TEXT.SELECT_TEXT);
      return;
    } else {
      const node = (nodes[0] || {}) as TextNode;
      if (node.type !== "TEXT" && needSelectionText) {
        notify(MESSAGE_RESPONSE_TEXT.SELECT_TEXT);
        return;
      } else {
        if (!nodes.length || !node || node.type !== "TEXT") {
          generateResearch(message);
          return;
        }
        const fontName = getFontFromSelectedNode(node);
        await figma.loadFontAsync(fontName);
        node.characters = textValue;
        node.resize(800, node.height);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const getSelectionText = async (option: "edit" | "research" | "") => {
  const nodes = figma.currentPage.selection as TextNode[];
  const node = nodes[0] as TextNode;

  if (nodes.length === 0) {
    notify(MESSAGE_RESPONSE_TEXT.SELECT_TEXT);
    return;
  } else {
    const node = nodes[0] as TextNode;
    if (node.type !== "TEXT") {
      notify(MESSAGE_RESPONSE_TEXT.SELECT_TEXT);
      return;
    } else {
      figma.ui.postMessage({
        type: POST_MESSAGE_TYPE.GET_SELECTION_TEXT,
        option,
        message: node.characters || "",
      });
      return;
    }
  }
};

const notify = (message: string) => {
  figma.notify(message);
};

const getFontFromSelectedNode = (textNode: TextNode) => {
  if (textNode.fontName !== figma.mixed) {
    return textNode.fontName;
  }

  for (let i = 0; i < textNode.characters.length; i++) {
    const char = textNode.characters[i];
    const fontName = textNode.getRangeFontName(i, i + 1) as FontName;
    // get the first one.
    return fontName;
  }

  return {
    family: "Inter",
    style: "Regular",
  } as FontName;
};

export {
  generateResearch,
  getStorage,
  postStorage,
  generateUpdateText,
  getSelectionText,
  notify,
};
