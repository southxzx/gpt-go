import { waitFor } from "@testing-library/react";
import BlockGenerate from "../../src/components/BlockGenerate";

export const expectSendMessageToFigma = async (params: any, params2 = "*") => {
  const postMessage = jest.fn();
  global.postMessage = postMessage;

  await waitFor(() => {
    expect(postMessage).toHaveBeenCalledTimes(1);
    expect(postMessage).toHaveBeenCalledWith(JSON.stringify(params), params2);
    console.log("alo")
  });
};

export const expectReceiveMessageFromFigma = async () => {
  const onReceiveMessageFromFigma = jest.fn();
  window.addEventListener("message", (e) => {
    console.log(
      "🚀 ~ file: messageTest.tsx:19 ~ window.addEventListener ~ e:",
      e
    );
    onReceiveMessageFromFigma();
  });
};
