import _ from "lodash";
import path from "path";

interface ILodashMixin extends _.LoDashStatic {
  getRootPath(): string;
  getPath(...paths: string[]): string;
}
function getRootPath(): string {
  return process.cwd();
}

function getPath(...paths: string[]): string {
  console.log(path.resolve(getRootPath(), ...paths));
  return path.resolve(getRootPath(), ...paths);
}

_.mixin({
  getPath,
  getRootPath,
});

const utils: ILodashMixin = _ as any;

export default utils as ILodashMixin;
