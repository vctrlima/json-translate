import { Controller } from "@/presentation/protocols";
import {
  type FastifyReply,
  type FastifyRequest,
  type RouteHandlerMethod,
} from "fastify";

export const adaptRoute = (controller: Controller): RouteHandlerMethod => {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const response = await controller.handle(req);
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      res.status(response.statusCode).send(response.body);
    } else {
      res.status(response.statusCode).send({
        error: response.body.message,
      });
    }
  };
};
