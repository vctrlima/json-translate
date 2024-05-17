import { ServerError, UnauthorizedError } from "@/presentation/errors";
import { HttpResponse } from "@/presentation/protocols";

export const badRequest = (error: any): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: any): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const serverError = (error: any): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
