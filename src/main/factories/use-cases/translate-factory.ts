import { TranslateImpl } from "@/data/use-cases";
import { Translate } from "@/domain/use-cases";
import { RemoteTranslateClient } from "@/infra/client";
import { env } from "@/main/config";
import { TranslateClient } from "@aws-sdk/client-translate";

export const makeTranslate = (): Translate => {
  const { awsRegion, awsAccessKey, awsSecretKey } = env;
  if (!awsRegion || !awsAccessKey || !awsSecretKey) {
    throw new Error("Invalid AWS credentials");
  }
  const awsTranslateClient = new TranslateClient({
    region: awsRegion,
    credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretKey,
    },
  });
  const remoteTranslateClient = new RemoteTranslateClient(awsTranslateClient);
  return new TranslateImpl(remoteTranslateClient);
};
