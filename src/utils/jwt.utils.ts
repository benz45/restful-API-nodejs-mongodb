import { sign, SignOptions } from "jsonwebtoken";
import { get } from "config";

export function jwtSign(object: Object, option?: SignOptions | undefined) {
  return sign(object, get("privateKey"), option);
}
