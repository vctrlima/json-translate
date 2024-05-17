import { TranslateJSON } from "@/domain/models";

export interface Translate {
  translate: (params: Translate.Params) => Promise<Translate.Response>;
}

export namespace Translate {
  export type Params = TranslateJSON.Params;
  export type Response = TranslateJSON.Response;
}
