import { RemoteTranslate } from "@/data/protocols/remote";

import AWS from "aws-sdk";

export class RemoteTranslateClient implements RemoteTranslate {
  constructor(private readonly awsTranslate: AWS.Translate) {}

  public async translate({
    content,
    language,
  }: RemoteTranslate.Params): Promise<RemoteTranslate.Response> {
    let response: RemoteTranslate.Response = [];
    const { source } = language;
    for (let target of language.target) {
      let translation: Translation = { language: target, content: [] };
      for (let text of content) {
        const params = { text, source, target };
        const result = await this.translateUsingAWS(params);
        translation.content.push(result as string);
      }
      response.push(translation);
    }
    return response;
  }

  private async translateUsingAWS(
    params: GenerateTranslationParams
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!params.text) return reject("Invalid text parameter");
      if (!params.source) return reject("Invalid source value");
      if (!params.target) return reject("Invalid target value");
      this.awsTranslate.translateText(
        this.generateTranslationParams(params),
        (error, result) => {
          if (error) reject(error);
          return resolve(result.TranslatedText);
        }
      );
    });
  }

  private generateTranslationParams(params: GenerateTranslationParams) {
    return {
      Text: params.text,
      TargetLanguageCode: params.target,
      SourceLanguageCode: params.source,
    };
  }
}

interface GenerateTranslationParams {
  text: string;
  target: string;
  source: string;
}

interface Translation {
  language: string;
  content: string[];
}
