import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import BlockGenerate from "../src/components/BlockGenerate";

import mountTest from "./shared/mountTest";
import ChatGPTApi from "../src/api/chatgpt-api";
import {
  expectReceiveMessageFromFigma,
  expectSendMessageToFigma,
} from "./shared/messageTest";
import { POST_MESSAGE_TYPE } from "../src/types/post-message";

describe("Block Generate component", () => {
  const api = new ChatGPTApi({
    apiKey: "1234567890",
  });
  mountTest(() => <BlockGenerate api={api} />);

  it("renders correctly", () => {
    const { container } = render(<BlockGenerate api={api} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should disabled button Generate when input is empty", () => {
    const { container } = render(<BlockGenerate api={api} />);
    const button = container.querySelector(".btn") as HTMLElement;
    expect(button).toHaveClass("btn-disabled");
  });

  it("should not disabled button Generate when input is not empty", () => {
    const { container } = render(<BlockGenerate api={api} />);
    const input = container.querySelector(
      ".block-generate-input"
    ) as HTMLElement;
    const button = container.querySelector(".btn") as HTMLElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(button).not.toHaveClass("btn-disabled");
  });

  const postMessageSpy = jest
    .spyOn(global, "postMessage")
    .mockImplementation(() => {});

  it("should send message to Figma when click Generate", async () => {
    const mockMessage = "hello";
    const { container } = render(<BlockGenerate api={api} />);
    const input = container.querySelector(
      ".block-generate-input"
    ) as HTMLElement;
    const button = container.querySelector(".btn") as HTMLElement;
    fireEvent.change(input, { target: { value: mockMessage } });
    expect(button).not.toHaveClass("btn-disabled");
    fireEvent.click(button);

    expect(
      container.querySelector(".loading-container") as HTMLElement
    ).toBeInTheDocument();
    expect(button).toHaveClass("btn-disabled");

    await waitFor(() => {
      expect(postMessageSpy).toHaveBeenCalledTimes(1);
      expect(postMessageSpy).toHaveBeenCalledWith(
        {
          pluginMessage: {
            type: POST_MESSAGE_TYPE.GENERATE,
            message: "Can not generate! Please try again!",
            needSelectionText: false,
          },
        },
        "*"
      );
      expect(
        container.querySelector(".loading-container") as HTMLElement
      ).not.toBeInTheDocument();
    });
  });
});
