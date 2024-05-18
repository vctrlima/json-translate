import { Translate } from "@/domain/use-cases";
import { MissingParamError } from "@/presentation/errors";
import { badRequest, ok } from "@/presentation/helpers";
import { HttpRequest } from "@/presentation/protocols";
import { faker } from "@faker-js/faker";

import { TranslateController } from "./translate-controller";

const translateMock = (): Translate => ({
  translate: jest.fn(),
});

describe("TranslateController", () => {
  let translateController: TranslateController;
  let translateService: Translate;

  beforeEach(() => {
    translateService = translateMock();
    translateController = new TranslateController(translateService);
  });

  it("should return badRequest with missing body param error", async () => {
    const request: HttpRequest<Translate.Params> = { body: null };

    const result = await translateController.handle(request);

    expect(result).toEqual(badRequest(new MissingParamError("body")));
  });

  it("should return badRequest with missing content param error", async () => {
    const translateParams: Translate.Params = {
      content: null,
      language: {
        source: "en",
        target: ["es", "pt"],
      },
    };
    const request: HttpRequest<Translate.Params> = { body: translateParams };

    const result = await translateController.handle(request);

    expect(result).toEqual(badRequest(new MissingParamError("content")));
  });

  it("should return badRequest with missing language param error", async () => {
    const translateParams: Translate.Params = {
      content: [faker.word.words()],
      language: null,
    };
    const request: HttpRequest<Translate.Params> = { body: translateParams };

    const result = await translateController.handle(request);

    expect(result).toEqual(badRequest(new MissingParamError("language")));
  });

  it("should return the translated content correctly", async () => {
    const translateParams: Translate.Params = {
      content: [faker.word.words()],
      language: {
        source: "en",
        target: ["es", "pt"],
      },
    };
    const request: HttpRequest<Translate.Params> = { body: translateParams };
    const translation: Translate.Response = [
      { content: [faker.word.words()], language: "es" },
      { content: [faker.word.words()], language: "pt" },
    ];
    jest
      .spyOn(translateService, "translate")
      .mockImplementationOnce(() => Promise.resolve(translation));

    const result = await translateController.handle(request);

    expect(result).toEqual(ok(translation));
  });
});
