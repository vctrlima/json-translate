import { RemoteTranslate } from "@/data/protocols/remote";
import { RemoteTranslateClient } from "@/infra/client";
import { faker } from "@faker-js/faker";
import { TranslateImpl } from "./translate-impl";

const remoteTranslateClientMock = (): RemoteTranslateClient => {
  return { translate: jest.fn() } as any as RemoteTranslateClient;
};

describe("TranslateImpl", () => {
  let translateImpl: TranslateImpl;
  let remoteTranslateClient: RemoteTranslateClient;

  beforeEach(() => {
    remoteTranslateClient = remoteTranslateClientMock();
    translateImpl = new TranslateImpl(remoteTranslateClient);
  });

  it("should translate parameter content and return it", async () => {
    const params: RemoteTranslate.Params = {
      content: [faker.word.words()],
      language: { source: "en", target: ["es", "pt"] },
    };
    const translation: RemoteTranslate.Response = [
      {
        content: { [faker.word.words()]: faker.word.words() },
        language: "es",
      },
      {
        content: { [faker.word.words()]: faker.word.words() },
        language: "pt",
      },
    ];
    jest
      .spyOn(remoteTranslateClient, "translate")
      .mockImplementationOnce(() => Promise.resolve(translation));

    const result = await translateImpl.translate(params);

    expect(result).toBe(translation);
    expect(remoteTranslateClient.translate).toHaveBeenCalledWith(params);
  });
});
