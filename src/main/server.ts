import "module-alias/register";

import { app, env } from "@/main/config";

const throwError = (error: Error) => {
  console.error(error);
  process.exit(1);
};

const start = async () => {
  const server = app;
  server.listen({ port: env.port as number }, (error) => {
    if (error) throwError(error);
    console.log(`Server listening at http://localhost:${env.port}`);
  });
};

start();
