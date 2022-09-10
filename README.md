# Oatx
Generator-less JSONSchema types straight from OpenAPI spec

This package transforms OpenAPI (3) requests and responses to JSONSchema that
can later be used with libraries that convert JSONSchema to a TypeScript type
such as:

* [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts)
* [as-typed](https://github.com/lbguilherme/as-typed)
* Or other similar libraries

It is still in a very experimental stage.

## Features

Only features working currently are:

* `application/json` request body type for a given relative path and method
* `application/json` response body parsing for relative path, method and statusCode

Planned features:

* Absolute URL
* Form data
* Headers
* Query parameters
* Path parameter validation
* Optional requestBody validation
* Typed Request and Response objects
* Type safe fetch
* Type safe Express/koa server

Other possible features:

* Describe endpoints as comments https://github.com/microsoft/TypeScript/issues/9694
* Import OpenAPI straight from JSON https://github.com/microsoft/TypeScript/issues/32063

## Install

```
npm install --save-dev oatx
```
Or if you are using `yarn`
```
yarn add --dev oatx
```

## Usage

```ts
import type { JsonRequestBodySchema, JsonResponseSchemas } from "oatx";
import type { FromSchema } from "json-schema-to-ts";

declare const spec: {
    paths: {
        "/posts/{id}": {
            get: {
                responses: {
                    200: {
                        description: "Single post",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Post" }
                            }
                        }
                    }
                },
            }
        },
        "/posts": {
            post: {
                requestBody: {
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Post" }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            Post: {
                type: "object",
                properties: {
                    id: { type: "number", },
                    title: { type: "string" }
                },
                required: ["id", "title"],
                additionalProperties: false
            }
        }
    }
};

type PostsRequestBody = JsonRequestBodySchema<typeof spec, "/posts", "post">
    // ^?
    //  {
    //      type: "object";
    //      properties: {
    //          id: {
    //              type: "number";
    //          };
    //          title: {
    //              type: "string";
    //          };
    //      };
    //      required: ["id", "title"];
    //      additionalProperties: false;
    //  }

const post: FromSchema<PostsRequestBody> = {
    id: 1,
    title: "Hello world"
}

const post: FromSchema<JsonResponseSchemas<typeof spec, "/posts/1", "get">[200]> = {
    id: 1,
    title: "Hello world"
}
```