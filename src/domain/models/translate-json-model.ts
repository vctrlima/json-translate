export namespace TranslateJSON {
  export type Params = {
    content: string[];
    language: { source: string; target: string[] };
  };

  export type Response = {
    language: string;
    content: string[];
  }[];
}
