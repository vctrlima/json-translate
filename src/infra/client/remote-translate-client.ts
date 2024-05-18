import { RemoteTranslate } from "@/data/protocols/remote";
import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextRequest,
} from "@aws-sdk/client-translate";

export class RemoteTranslateClient implements RemoteTranslate {
  constructor(private readonly awsTranslateClient: TranslateClient) {}

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
    const input = this.generateTranslationParams(params);
    const command = new TranslateTextCommand(input);
    const { TranslatedText } = await this.awsTranslateClient.send(command);
    return TranslatedText as string;
  }

  private generateTranslationParams(
    params: GenerateTranslationParams
  ): TranslateTextRequest {
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
