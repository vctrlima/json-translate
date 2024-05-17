import { adaptRoute } from "@/main/adapters";
import { makeTranslateController } from "@/main/factories/controllers";
import { FastifyInstance } from "fastify";

export default (instance: FastifyInstance) => {
  instance.post("/translate", adaptRoute(makeTranslateController()));
};
