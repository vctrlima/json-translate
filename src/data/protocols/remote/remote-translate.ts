import { Translate } from "@/domain/use-cases";

export interface RemoteTranslate {
  translate: (
    params: RemoteTranslate.Params
  ) => Promise<RemoteTranslate.Response>;
}

export namespace RemoteTranslate {
  export type Params = Translate.Params;
  export type Response = Translate.Response;
}
