import { ServerError, UnauthorizedError } from "@/presentation/errors";
import { faker } from "@faker-js/faker";
import {
  badRequest,
  created,
  forbidden,
  noContent,
  ok,
  serverError,
  unauthorized,
} from "./http-helper";

describe("http response helpers", () => {
  it("should return 400 Bad Request", () => {
    const error = new Error("Invalid request");

    const response = badRequest(error);

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(error);
  });

  it("should return 403 Forbidden", () => {
    const error = new Error("Access forbidden");

    const response = forbidden(error);

    expect(response.statusCode).toBe(403);
    expect(response.body).toBe(error);
  });

  it("should return 401 Unauthorized", () => {
    const response = unauthorized();

    expect(response.statusCode).toBe(401);
    expect(response.body).toBeInstanceOf(UnauthorizedError);
  });

  it("should return 500", () => {
    const error = new Error("Something went wrong");

    const response = serverError(error);

    expect(response.statusCode).toBe(500);
    expect(response.body).toBeInstanceOf(ServerError);
  });

  it("should return 200 OK", () => {
    const data = { message: "Request successful" };

    const response = ok(data);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(data);
  });

  it("should return 201 Created", () => {
    const data = { id: faker.string.uuid, name: faker.person.fullName() };

    const response = created(data);

    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(data);
  });

  it("should return 204 No Content", () => {
    const response = noContent();

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeNull();
  });
});
