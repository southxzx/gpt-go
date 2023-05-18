import { ChatGPTApiOptions } from "../types/chatgpt-api";
import fetch from "../api/fetch";

export default class ChatGPTApi {
  protected _apiKey: string;
  protected _apiURL: string;
  protected _model: string;

  constructor(options: ChatGPTApiOptions) {
    const {
      apiKey,
      apiURL = "https://api.openai.com/v1",
      model = "gpt-3.5-turbo",
    } = options;
    this._apiKey = apiKey;
    this._apiURL = apiURL;
    this._model = model;

    // if (!this._apiKey) {
    //   throw new Error("OpenAI missing required apiKey");
    // }
  }

  async sendMessage(textValue: string) {
    const response = await fetch(`${this._apiURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._apiKey}`,
      },
      body: JSON.stringify({
        model: this._model,
        messages: [
          {
            content: textValue,
            role: "user",
          },
        ],
        temperature: 0.9,
        // max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        // stop: ["\n", " Human:", " AI:"],
      }),
    });
    const data = await response.json();
    return data;
  }

  async sendPrompt(textValue: string) {
    const response = await fetch(`${this._apiURL}/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._apiKey}`,
      },
      body: JSON.stringify({
        model: "davinci",
        prompt: `Generate a short research for ${textValue} in UI/UX design`,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      }),
    });
    const data = await response.json();
    return data;
  }

  setApiKey(apiKey: string) {
    this._apiKey = apiKey;
  }

  get apiKey() {
    return this._apiKey;
  }
}
