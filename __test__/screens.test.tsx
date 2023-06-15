import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import EditTextScreen from "../src/screens/EditTextScreen";

import mountTest from "./shared/mountTest";
import { chatGPT } from "../__mocks__/chatGptMock";
import {
  mockEventListenerOnMessage,
  mockPostMessage,
} from "../__mocks__/messageMock";
import { POST_MESSAGE_TYPE } from "../src/types/post-message";

describe("Screen EditText", () => {
  mountTest(() => <EditTextScreen api={chatGPT} />);

  it("renders correctly", () => {
    const { container } = render(<EditTextScreen api={chatGPT} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should disabled button Generate when input is empty", () => {
    const { container } = render(<EditTextScreen api={chatGPT} />);
    const button = container.querySelector(".btn") as HTMLElement;
    expect(button).toHaveClass("btn-disabled");
  });

  it("should not disabled button Generate when input is not empty", () => {
    const { container } = render(<EditTextScreen api={chatGPT} />);
    const input = container.querySelector(
      ".block-generate-input"
    ) as HTMLElement;
    const button = container.querySelector(".btn") as HTMLElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(button).not.toHaveClass("btn-disabled");
  });

  it("should send message to Figma when click Generate", async () => {
    const mockMessage = "hello";
    const { container } = render(<EditTextScreen api={chatGPT} />);
    const input = container.querySelector(
      ".block-generate-input"
    ) as HTMLElement;
    const button = container.querySelector(".btn") as HTMLElement;
    fireEvent.change(input, { target: { value: mockMessage } });
    expect(button).not.toHaveClass("btn-disabled");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPostMessage).toHaveBeenCalledTimes(1);
      expect(mockPostMessage).toHaveBeenCalledWith(
        {
          pluginMessage: {
            type: POST_MESSAGE_TYPE.GET_SELECTION_TEXT,
            option: "edit",
          },
        },
        "*"
      );

      expect(mockEventListenerOnMessage).toHaveBeenCalled();
      expect(mockEventListenerOnMessage).toHaveBeenCalledWith(
        "message",
        expect.any(Function)
      );
    });
  });

  it("should remove text when click Quick access option", () => {
    const { container } = render(<EditTextScreen api={chatGPT} />);
    const firstQuickAccessOption = container.querySelector(
      ".item-box-dropdown-wrapper"
    );
    const input = container.querySelector(
      ".block-generate-input"
    ) as HTMLElement;
    fireEvent.change(input, {
      target: {
        value: "hello",
      },
    });

    fireEvent.click(firstQuickAccessOption as HTMLElement);

    const firstQuickAccessOptionItem =
      container.querySelector(".dropdown-option");
    expect(firstQuickAccessOptionItem).toBeInTheDocument();

    fireEvent.click(firstQuickAccessOptionItem?.firstChild as HTMLElement);
    expect(input).toHaveValue("");
  });
});
