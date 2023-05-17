const generateResearch = async (message: string) => {
  const textValue = message;
  const node = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  node.x = 50;
  node.characters = textValue;
  node.fontSize = 18;
  node.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
  node.resize(800, node.height);
  figma.currentPage.appendChild(node);
  figma.currentPage.selection = [node];
  figma.viewport.scrollAndZoomIntoView([node]);
};

const getStorage = async (message = "") => {
  const storage = await figma.clientStorage.getAsync(message);

  figma.ui.postMessage({
    type: "get-storage",
    message: storage,
  });
};

const postStorage = async (key: string, message: string) => {
  await figma.clientStorage.setAsync(key, message);

  figma.ui.postMessage({
    type: "post-storage",
    message,
    key,
  });
};

const generateUpdateText = async (message: string) => {
  const textValue = message;
  const nodes = figma.currentPage.selection as TextNode[];

  if (nodes.length === 0) {
    figma.notify("Select a text layer to update.");
    return;
  } else {
    const node = nodes[0] as TextNode;
    if (node.type !== "TEXT") {
      figma.notify("Select a text layer to update.");
      return;
    } else {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      node.characters = textValue;
      node.fontSize = 18;
      node.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];
      node.resize(800, node.height);
    }
  }
};

export { generateResearch, getStorage, postStorage, generateUpdateText };
