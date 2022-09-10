import type { FromSchema } from "json-schema-to-ts";
import type { JsonResponseSchemas } from "../lib/Response";

declare const spec: {
    paths: {
        "/posts/{id}": {
            get: {
                responses: {
                    200: { $ref: "#/components/responses/Post" },
                    404: {
                        description: "Not Found",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Error" }
                            }
                        }
                    }
                },
            }
        }
    },
    components: {
        responses: {
            Post: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/Post" }
                    }
                }
            }
        },
        schemas: {
            Id: {
                type: "number",
            }
            Post: {
                type: "object",
                properties: {
                    id: { $ref: "#/components/schemas/Id" },
                    title: { type: "string" }
                },
                required: ["id", "title"],
                additionalProperties: false
            },
            Error: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    message: { type: "string" }
                },
                required: ["name"],
                additionalProperties: false
            }
        }
    }
};

const post: FromSchema<JsonResponseSchemas<typeof spec, "/posts/1", "get">[200]> = {
    id: 1,
    title: "Hello world"
}

// @ts-expect-error
const postWithoutTitle: FromSchema<JsonResponseSchemas<typeof spec, "/posts/1", "get">[200]> = {
    id: 1
}

const error: FromSchema<JsonResponseSchemas<typeof spec, "/posts/1", "get">[404]> = {
    name: "Error"
}

const errorWithMessage: FromSchema<JsonResponseSchemas<typeof spec, "/posts/1", "get">[404]> = {
    name: "Error",
    message: "Post not found"
}

// @ts-expect-error
const errorWithoutName: FromSchema<JsonResponseSchemas<typeof spec, "/posts/1", "get">[404]> = {
    message: "Post not found"
}
