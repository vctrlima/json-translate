import { TranslateImpl } from "@/data/use-cases";
import { Translate } from "@/domain/use-cases";
import { RemoteTranslateClient } from "@/infra/client";
import { env } from "@/main/config";

import AWS, { ConfigurationOptions } from "aws-sdk";

export const makeTranslate = (): Translate => {
  const awsConfigOptions: ConfigurationOptions = {
    accessKeyId: env.awsAccessKey,
    secretAccessKey: env.awsSecretKey,
    region: env.awsRegion,
  };
  const remoteTranslateClient = new RemoteTranslateClient(
    new AWS.Translate(awsConfigOptions)
  );
  return new TranslateImpl(remoteTranslateClient);
};
