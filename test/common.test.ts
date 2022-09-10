import type { PathTemplate, SpecPath } from "../lib/common";

// PathTemplate
const pathWithParams: PathTemplate<"/posts/{postId}/comments/{commentId}"> = "/posts/1/comments/2";
const pathWithoutParams: PathTemplate<"/posts/comments"> = "/posts/comments";
// @ts-expect-error
const pathWithParamsWithoutThem: PathTemplate<"/posts/{postId}/comments/{commentId}"> = "/posts/1/comments";
// TODO: Fix empty param issue
// // @ts-expect-error
const pathWithParamsWithoutThemFailing: PathTemplate<"/posts/{postId}/comments/{commentId}"> = "/posts/1/comments/";

// SpecPath
const spec = {
    paths: {
        "/posts/{postId}/comments/{commentId}": {},
        "/posts/comments": {},
    }
};
const specPathWithParams: SpecPath<typeof spec, "/posts/1/comments/2"> = "/posts/{postId}/comments/{commentId}";
const specPathWithoutParams: SpecPath<typeof spec, "/posts/comments"> = "/posts/comments";
// @ts-expect-error
const specPathWithParamsWithoutThem: SpecPath<typeof spec, "/posts/1/comments"> = "/posts/{postId}/comments/{commentId}";
// TODO: Fix empty param issue
// // @ts-expect-error
const specPathWithParamsWithoutThemFailing: SpecPath<typeof spec, "/posts/1/comments/"> = "/posts/{postId}/comments/{commentId}";

