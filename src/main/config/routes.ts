import { FastifyInstance } from "fastify";
import translateRoutes from "../routes/translate-routes";

export default (server: FastifyInstance): void => {
  server.register(
    (instance, options, done) => {
      translateRoutes(instance);
      done();
    },
    { prefix: "/api" }
  );
};
