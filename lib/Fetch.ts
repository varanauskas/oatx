interface JsonRequest extends Request {

}

const request = Request();
const response = fetch();

type RelativePath<Path> = Path extends `${string}://${string}/${infer Path}` ? `/${Path}` : ``;
