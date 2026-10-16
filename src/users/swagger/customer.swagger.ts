import { ApiEndpointSpec } from "../../common/swagger/api-endpoint.decorator.js";
import { CreateUserDto } from "../dto/create-user.dto.js";

const CUSTOMER_ID_PARAM = {
  name: 'id',
  type: Number,
  description: 'شناسه مشتری',
  example: 1,
  required: true,
} as const;

export const UserSwagger = {
    create: {
        summary: 'Create a user',
        description: 'Creates a new user.',
        body: CreateUserDto,
        created: undefined,
        errors: [400, 409],
      },
} as const satisfies Record<string, ApiEndpointSpec>;
