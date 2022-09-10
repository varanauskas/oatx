import type { ReferenceObject, ResponseObject } from "openapi3-ts";
import type { ComponentRef, ComponentTypes, ObjectWithContentSchema, RequiredSpec, SpecOperation, SpecPath, SpecPathMethod, SpecPathTemplate } from "./common";

type SpecResponse<
    Spec extends RequiredSpec,
    Path extends keyof Spec["paths"],
    Method extends keyof Spec["paths"][Path],
    StatusCode extends keyof Spec["paths"][Path]["responses"]
> = SpecOperation<Spec, Path, Method>["responses"][StatusCode] extends ReferenceObject
    ? "responses" extends ComponentTypes<Spec>
    ? ComponentRef<Spec, "responses", SpecOperation<Spec, Path, Method>["responses"][StatusCode]>
    : never
    : SpecOperation<Spec, Path, Method>["responses"][StatusCode]

export type SpecResponses<
    Spec extends RequiredSpec,
    Path extends keyof Spec["paths"],
    Method extends keyof Spec["paths"][Path]
> = { [StatusCode in keyof SpecOperation<Spec, Path, Method>["responses"]]:
        SpecResponse<Spec, Path, Method, StatusCode> }

type SpecResponseSchema<
    Spec extends RequiredSpec,
    Object extends ResponseObject
> = ObjectWithContentSchema<Spec, Object>;

export type JsonResponseSchemas<
    Spec extends RequiredSpec,
    Path extends SpecPathTemplate<Spec>,
    Method extends SpecPathMethod<Spec, Path>
> = { [StatusCode in keyof SpecResponses<Spec, SpecPath<Spec, Path>, Method>]:
        SpecResponses<Spec, SpecPath<Spec, Path>, Method>[StatusCode] extends ResponseObject
        ? SpecResponseSchema<Spec, SpecResponses<Spec, SpecPath<Spec, Path>, Method>[StatusCode]>
        : never }

