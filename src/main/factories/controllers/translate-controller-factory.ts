import { makeTranslate } from "@/main/factories/use-cases";
import { TranslateController } from "@/presentation/controllers";

export const makeTranslateController = (): TranslateController =>
  new TranslateController(makeTranslate());
