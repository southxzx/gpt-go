export const mockPostMessage = jest
  .spyOn(window, "postMessage")
  .mockImplementation(() => {
    // window.postMessage()
  });

export const mockOnReceiveMessageGenerate = jest.fn(() => {
  console.log("weeeee");
});

export const mockEventListenerOnMessage = jest
  .spyOn(window, "addEventListener")
  .mockImplementationOnce((event, handler) => {
    if (event === "message") {
      console.log(
        "🚀 ~ file: messageMock.tsx:15 ~ .mockImplementationOnce ~ event:",
        event
      );
      handler = mockOnReceiveMessageGenerate;
    }
  });
