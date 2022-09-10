import type { FromSchema } from "json-schema-to-ts";
import type { JsonRequestBodySchema } from "../lib/Request";
import spec from "./spec";

const post: FromSchema<JsonRequestBodySchema<typeof spec, "/posts", "post">> = {
    id: 1,
    title: "Hello world"
}

// @ts-expect-error
const postWithoutTitle: FromSchema<JsonRequestBodySchema<typeof spec, "/posts", "post">> = {
    id: 1,
}