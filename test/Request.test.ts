import type { FromSchema } from "json-schema-to-ts";
import type { JsonRequestBodySchema } from "../lib/Request";

declare const spec: {
    paths: {
        "/posts": {
            post: {
                requestBody: { $ref: "#/components/requestBodies/Post"  }
            }
        }
    },
    components: {
        requestBodies: {
            Post: { $ref: "#/components/requestBodies/PostInternal" },
            PostInternal: {
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/Post" }
                    }
                }
            }
        }
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
        }
    }
};

const post: FromSchema<JsonRequestBodySchema<typeof spec, "/posts", "post">> = {
    id: 1,
    title: "Hello world"
}

// @ts-expect-error
const postWithoutTitle: FromSchema<JsonRequestBodySchema<typeof spec, "/posts", "post">> = {
    id: 1,
}