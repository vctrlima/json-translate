import { Translate } from "@/domain/use-cases";
import { MissingParamError } from "@/presentation/errors";
import { badRequest, ok } from "@/presentation/helpers";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";

export class TranslateController implements Controller {
  constructor(private readonly translate: Translate) {}

  public async handle(
    request: HttpRequest<Translate.Params>
  ): Promise<HttpResponse<Translate.Response>> {
    const { body } = request;
    if (!body) return badRequest(new MissingParamError("body"));
    const { content, language } = body;
    if (!content) return badRequest(new MissingParamError("content"));
    if (!language) return badRequest(new MissingParamError("language"));
    return ok(await this.translate.translate(body));
  }
}
