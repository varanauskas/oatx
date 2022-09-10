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
        },
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
            },
        }
        responses: {
            Post: {
                description: "Single post",
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/Post" }
                    }
                }
            },
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
            },
        }
    }
};

export default spec;