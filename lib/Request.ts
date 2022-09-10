import type { ReferenceObject, RequestBodyObject } from "openapi3-ts";
import type { ComponentRef, ComponentTypes, ObjectWithContentSchema, PathTemplate, RequiredSpec, SpecOperation, SpecPath, SpecPathMethod, SpecPathTemplate } from "./common";

type SpecRequestBody<
    Spec extends RequiredSpec,
    Path extends Extract<keyof Spec["paths"], string>,
    Method extends keyof Spec["paths"][Path]
> = SpecOperation<Spec, Path, Method>["requestBody"] extends ReferenceObject
    ? "requestBodies" extends ComponentTypes<Spec>
    ? ComponentRef<Spec, "requestBodies", SpecOperation<Spec, Path, Method>["requestBody"]>
    : never
    : SpecOperation<Spec, Path, Method>["requestBody"];

export type JsonRequestBodySchema<
    Spec extends RequiredSpec,
    Path extends SpecPathTemplate<Spec>,
    Method extends SpecPathMethod<Spec, Path>
> = SpecRequestBody<Spec, SpecPath<Spec, Path>, Method> extends RequestBodyObject
    ? ObjectWithContentSchema<Spec, SpecRequestBody<Spec, SpecPath<Spec, Path>, Method>>
    : never;