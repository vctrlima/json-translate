import { Translate } from "@/domain/use-cases";
import { RemoteTranslateClient } from "@/infra/client";

export class TranslateImpl implements Translate {
  constructor(private readonly remoteTranslateClient: RemoteTranslateClient) {}

  public translate(params: Translate.Params): Promise<Translate.Response> {
    return this.remoteTranslateClient.translate(params);
  }
}
