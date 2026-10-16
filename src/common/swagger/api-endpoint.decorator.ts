
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

const DEFAULT_ERROR_DESCRIPTIONS: Record<number, string> = {
  400: 'خطای اعتبارسنجی ورودی',
  401: 'احراز هویت نشده',
  403: 'دسترسی مجاز نیست',
  404: 'منبع یافت نشد',
  409: 'تداخل داده',
};

export type ApiEndpointError =
  | number
  | {
      status: number;
      description: string;
      example?: unknown;
    };

export interface ApiEndpointParam {
  name: string;
  type?: NumberConstructor | StringConstructor;
  description?: string;
  example?: number | string;
  required?: boolean;
}

export interface ApiEndpointQuery {
  name: string;
  type?: NumberConstructor | StringConstructor | BooleanConstructor;
  description?: string;
  example?: number | string | boolean;
  required?: boolean;
  maxLength?: number;
}

export interface ApiEndpointBodyExample {
  summary: string;
  value: unknown;
}

export interface ApiEndpointSpec {
  summary: string;
  description?: string;
  params?: ApiEndpointParam[];
  queries?: ApiEndpointQuery[];
  body?: Type<unknown>;
  bodyExamples?: Record<string, ApiEndpointBodyExample>;
  ok?: Type<unknown>;
  okIsArray?: boolean;
  okExample?: unknown;
  created?: Type<unknown>;
  createdExample?: unknown;
  errors?: ApiEndpointError[];
}

export function ApiEndpoint(spec: ApiEndpointSpec) {
  const decorators = [
    ApiOperation({
      summary: spec.summary,
      description: spec.description,
    }),
  ];

  for (const param of spec.params ?? []) {
    decorators.push(
      ApiParam({
        name: param.name,
        type: param.type ?? Number,
        description: param.description,
        example: param.example,
        required: param.required ?? true,
      }),
    );
  }

  for (const query of spec.queries ?? []) {
    decorators.push(
      ApiQuery({
        name: query.name,
        type: query.type,
        description: query.description,
        example: query.example,
        required: query.required ?? false,
        ...(query.maxLength !== undefined
          ? {
              schema: {
                type: 'string',
                maxLength: query.maxLength,
              },
            }
          : {}),
      }),
    );
  }

  if (spec.body) {
    decorators.push(
      ApiBody({
        type: spec.body,
        ...(spec.bodyExamples
          ? {
              examples: Object.fromEntries(
                Object.entries(spec.bodyExamples).map(
                  ([name, example]) => [
                    name,
                    {
                      summary: example.summary,
                      value: example.value,
                    },
                  ],
                ),
              ),
            }
          : {}),
      }),
    );
  }

  if (spec.ok) {
    decorators.push(
      ApiOkResponse({
        type: spec.ok,
        isArray: spec.okIsArray === true,
        ...(spec.okExample !== undefined
          ? {
              content: {
                'application/json': {
                  example: spec.okExample,
                },
              },
            }
          : {}),
      }),
    );
  }

  if (spec.created) {
    decorators.push(
      ApiCreatedResponse({
        type: spec.created,
        ...(spec.createdExample !== undefined
          ? {
              content: {
                'application/json': {
                  example: spec.createdExample,
                },
              },
            }
          : {}),
      }),
    );
  }

  for (const error of spec.errors ?? []) {
    if (typeof error === 'number') {
      decorators.push(
        ApiResponse({
          status: error,
          description:
            DEFAULT_ERROR_DESCRIPTIONS[error] ?? `HTTP ${error}`,
        }),
      );

      continue;
    }

    decorators.push(
      ApiResponse({
        status: error.status,
        description: error.description,
        ...(error.example !== undefined
          ? {
              content: {
                'application/json': {
                  example: error.example,
                },
              },
            }
          : {}),
      }),
    );
  }

  return applyDecorators(...decorators);
}
