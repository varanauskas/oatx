import type { FromSchema } from "json-schema-to-ts";
import type { RequestBodySchema } from "..";
import spec from "./spec";

const post: FromSchema<RequestBodySchema<typeof spec, "/posts", "post">> = {
    id: 1,
    title: "Hello world"
}

// @ts-expect-error
const postWithoutTitle: FromSchema<RequestBodySchema<typeof spec, "/posts", "post">> = {
    id: 1,
}