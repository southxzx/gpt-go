import ChatGPT from "../src/api/chatgpt-api";

export const chatGPT = new ChatGPT({
  apiKey: "1234567890",
});

export const mockSendMessage = jest.spyOn(chatGPT, "sendMessage");
mockSendMessage.mockResolvedValueOnce({
  choices: [
    {
      message: {
        content: "welcome to my world",
      },
    },
  ],
});
