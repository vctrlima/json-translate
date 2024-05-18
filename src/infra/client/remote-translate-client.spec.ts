import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextRequest,
  TranslateTextResponse,
} from "@aws-sdk/client-translate";

import { RemoteTranslateClient } from "./remote-translate-client";

jest.mock("@aws-sdk/client-translate");

const mockTranslateClient = new TranslateClient({});
const sendMock = jest.fn();
mockTranslateClient.send = sendMock;

describe("RemoteTranslateClient", () => {
  let remoteTranslateClient: RemoteTranslateClient;

  beforeEach(() => {
    remoteTranslateClient = new RemoteTranslateClient(mockTranslateClient);
  });

  describe("translate", () => {
    it("should translate text using AWS Translate", async () => {
      const params = {
        content: ["Hello"],
        language: { source: "en", target: ["es"] },
      };
      const awsResponse: TranslateTextResponse = {
        TranslatedText: "Hola",
      } as any;
      sendMock.mockResolvedValue(awsResponse);

      const result = await remoteTranslateClient.translate(params);

      expect(result).toEqual([{ language: "es", content: ["Hola"] }]);
      expect(sendMock).toHaveBeenCalledWith(expect.any(TranslateTextCommand));
    });

    it("should handle errors from AWS Translate", async () => {
      const params = {
        content: ["Hello"],
        language: { source: "en", target: ["es"] },
      };
      const awsError = new Error("AWS Translate error");
      sendMock.mockRejectedValue(awsError);

      await expect(remoteTranslateClient.translate(params)).rejects.toThrow(
        "AWS Translate error"
      );
    });
  });

  describe("translateUsingAWS", () => {
    it("should return translated text", async () => {
      const params = { text: "Hello", source: "en", target: "es" };
      const awsResponse: TranslateTextResponse = {
        TranslatedText: "Hola",
      } as any;
      sendMock.mockResolvedValue(awsResponse);

      const result = await remoteTranslateClient["translateUsingAWS"](params);

      expect(result).toBe("Hola");
      expect(sendMock).toHaveBeenCalledWith(expect.any(TranslateTextCommand));
    });

    it("should handle errors from AWS Translate", async () => {
      const params = { text: "Hello", source: "en", target: "es" };
      const awsError = new Error("AWS Translate error");
      sendMock.mockRejectedValue(awsError);

      await expect(
        remoteTranslateClient["translateUsingAWS"](params)
      ).rejects.toThrow("AWS Translate error");
    });
  });

  describe("generateTranslationParams", () => {
    it("should generate translation parameters correctly", () => {
      const params = { text: "Hello", source: "en", target: "es" };
      const expected: TranslateTextRequest = {
        Text: "Hello",
        SourceLanguageCode: "en",
        TargetLanguageCode: "es",
      };

      const result = remoteTranslateClient["generateTranslationParams"](params);

      expect(result).toEqual(expected);
    });
  });
});
