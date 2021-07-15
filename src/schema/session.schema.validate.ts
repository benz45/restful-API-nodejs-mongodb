import { object, SchemaOf } from "yup";
import { username, password } from "./user.schema.validate";
import { IValidateUserSchema } from "../model/user.model";

const body: SchemaOf<Pick<IValidateUserSchema, "username" | "password">> =
  object({
    username,
    password,
  });

export const validateCreateSessionSchema = object({
  body,
});
