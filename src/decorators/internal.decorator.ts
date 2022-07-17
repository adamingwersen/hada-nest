import { SetMetadata } from "@nestjs/common";

import { DecoratorKeys } from "./decorator.keys";

export const Internal = () => SetMetadata(DecoratorKeys.Internal, true);
