import AWS from "aws-sdk";

import { RemoteTranslateClient } from "./remote-translate-client";

jest.mock("aws-sdk", () => {
  const mockTranslate = {
    translateText: jest.fn(),
  };
  return {
    Translate: jest.fn(() => mockTranslate),
  };
});

const mockTranslateInstance = new AWS.Translate();

describe("RemoteTranslateClient", () => {
  let remoteTranslateClient: RemoteTranslateClient;

  beforeEach(() => {
    remoteTranslateClient = new RemoteTranslateClient(mockTranslateInstance);
  });

  describe("translate", () => {
    it("should translate text using AWS Translate", async () => {
      const params = {
        content: ["Hello"],
        language: { source: "en", target: ["es"] },
      };
      const awsResponse = { TranslatedText: "Hola" };
      (mockTranslateInstance.translateText as jest.Mock).mockImplementation(
        (params, callback) => {
          callback(null, awsResponse);
        }
      );

      const result = await remoteTranslateClient.translate(params);

      expect(result).toEqual([{ language: "es", content: ["Hola"] }]);
      expect(mockTranslateInstance.translateText).toHaveBeenCalledWith(
        {
          Text: "Hello",
          SourceLanguageCode: "en",
          TargetLanguageCode: "es",
        },
        expect.any(Function)
      );
    });

    it("should handle errors from AWS Translate", async () => {
      const params = {
        content: ["Hello"],
        language: { source: "en", target: ["es"] },
      };
      const awsError = new Error("AWS Translate error");
      (mockTranslateInstance.translateText as jest.Mock).mockImplementation(
        (params, callback) => {
          callback(awsError, null);
        }
      );

      await expect(remoteTranslateClient.translate(params)).rejects.toThrow(
        "AWS Translate error"
      );
    });
  });

  describe("translateUsingAWS", () => {
    it("should return translated text", async () => {
      const params = { text: "Hello", source: "en", target: "es" };
      const awsResponse = { TranslatedText: "Hola" };
      (mockTranslateInstance.translateText as jest.Mock).mockImplementation(
        (params, callback) => {
          callback(null, awsResponse);
        }
      );

      const result = await remoteTranslateClient["translateUsingAWS"](params);

      expect(result).toBe("Hola");
    });

    it("should handle errors from AWS Translate", async () => {
      const params = { text: "Hello", source: "en", target: "es" };
      const awsError = new Error("AWS Translate error");
      (mockTranslateInstance.translateText as jest.Mock).mockImplementation(
        (params, callback) => {
          callback(awsError, null);
        }
      );

      await expect(
        remoteTranslateClient["translateUsingAWS"](params)
      ).rejects.toThrow("AWS Translate error");
    });
  });
});
