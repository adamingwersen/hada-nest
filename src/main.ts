import * as chalk from "chalk";
import * as cookieParser from "cookie-parser";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { PORT } from "./common/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(PORT);

  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log(
      chalk.cyan(`Relevant links: 
      📕 GraphQL explorer: http://localhost:${PORT}/graphql`),
    );
  }, 1000);
}
bootstrap();
