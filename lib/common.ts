import type { ContentObject, OpenAPIObject, ReferenceObject } from "openapi3-ts";

export type RequiredSpec = Pick<OpenAPIObject, "paths" | "components">;
export type PathSpec = { paths: Record<string, unknown> };

/**
 * Get value types of `T`
 */
type ValueOf<T> = T[keyof T];

/**
 * Validate a string against OpenAPI path template
 * ```
 * const path = PathTemplate<"/posts/{postId}/comments/{commentId}"> = "/posts/1/comments/2"const pathWithParams: PathTemplate<"/posts/{postId}/comments/{commentId}"> = "/posts/1/comments/2"; 
 * const pathWithoutParams: PathTemplate<"/posts/comments"> = "/posts/comments";```
 * https://spec.openapis.org/oas/v3.1.0#path-templating-matching
 */
export type PathTemplate<Path extends string> = Path extends `${infer Prefix}{${string}}${infer Suffix}`
    ? `${Prefix}${string}${PathTemplate<Suffix>}`
    : Path;

/**
 * Extract path as specified in OpenAPI `Spec` based on request path
 * ```
 * const spec = {
 *   paths: {
 *       "/posts/{postId}/comments/{commentId}": {},
 *       "/posts/comments": {},
 *   }
 * };
 * const specPathWithParams: SpecPath<typeof spec, "/posts/1/comments/2"> = "/posts/{postId}/comments/{commentId}";
 * const specPathWithoutParams: SpecPath<typeof spec, "/posts/comments"> = "/posts/comments";
 * ```
 */
export type SpecPath<
    Spec extends PathSpec,
    Path extends PathTemplate<Extract<keyof Spec["paths"], string>>
> = ValueOf<{
    [Template in Extract<keyof Spec["paths"], string>]: Path extends PathTemplate<Template> ? Template : never
}>

export type SpecPathTemplate<Spec extends PathSpec> = PathTemplate<Extract<keyof Spec["paths"], string>>;
export type SpecPathMethod<Spec extends Pick<RequiredSpec, "paths">, Path extends SpecPathTemplate<Spec>> = keyof Spec["paths"][SpecPath<Spec, Path>];

export type SpecOperation<Spec extends RequiredSpec, Path extends keyof Spec["paths"], Method extends keyof Spec["paths"][Path]> =
    Spec["paths"][Path][Method];

export type ComponentTypes<Spec extends RequiredSpec> = Extract<keyof Spec["components"], string>;

export type ComponentRef<
    Spec extends RequiredSpec,
    Type extends ComponentTypes<Spec>,
    Ref extends ReferenceObject
> = Ref extends { $ref: `#/components/${Type}/${infer Name}` }
    ? Name extends keyof Spec["components"][Type]
    ? Spec["components"][Type][Name] extends ReferenceObject
    ? ComponentRef<Spec, Type, Spec["components"][Type][Name]>
    : Spec["components"][Type][Name]
    : never
    : never;

export type SchemaRef<
    Spec extends RequiredSpec,
    Schema> = Schema extends { $ref: `#/components/schemas/${infer Name}` }
    ? "schemas" extends keyof Spec["components"] ? Name extends keyof Spec["components"]["schemas"]
    ? SchemaRef<Spec, Spec["components"]["schemas"][Name]>
    : never : never
    : { [Key in keyof Schema]: SchemaRef<Spec, Schema[Key]> };


export type ObjectWithContentSchema<
    Spec extends RequiredSpec, Object extends { content?: ContentObject }
> = Object["content"] extends ContentObject
    ? SchemaRef<Spec, Object["content"]["application/json"]["schema"]>
    : never;
