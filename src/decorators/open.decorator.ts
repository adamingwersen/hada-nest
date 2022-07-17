import { SetMetadata } from "@nestjs/common";

import { DecoratorKeys } from "./decorator.keys";

export const Open = () => SetMetadata(DecoratorKeys.Open, true);
