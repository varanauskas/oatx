import type { FromSchema } from "json-schema-to-ts";
import type { JsonResponseSchemas } from "../lib/Response";
import spec from "./spec";

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
