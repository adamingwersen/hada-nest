import * as chalk from "chalk";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const port = 5678;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log(
      chalk.cyan(`Relevant links: 
      📕 GraphQL explorer: http://localhost:${port}/graphql`),
    );
  }, 1000);
}
bootstrap();
