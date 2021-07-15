// import { Schema } from "mongoose";
import { SchemaOf, string, ref, object, number } from "yup";

import { IValidateUserSchema } from "../model/user.model";

// * Username
export const username: SchemaOf<IValidateUserSchema["username"]> =
  string().required("กรุณากรอก username");

// * Password
export const password: SchemaOf<IValidateUserSchema["password"]> = string()
  .required("กรุณากรอก password")
  .min(8, "password อย่างน้อง 8 ตัว")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "password a-z, A-Z, 0-9, ตัวอักษรพิเศษ อย่างละ 1 ตัว "
  );

// * Confirm Password
export const confirmPassword: SchemaOf<IValidateUserSchema["confirmPassword"]> =
  string()
    .required("กรุณากรอก confirmPassword")
    .oneOf([ref("password"), null], "password ไม่ต้องไม่ตรง");

// * Address
export const address: SchemaOf<IValidateUserSchema["address"]> = object().shape(
  {
    homeId: number().defined().required("กรุณากรอก homeId"),
    district: string().defined().required("กรุณากรอก district"),
    parish: string().defined().required("กรุณากรอก parish"),
  }
);

// * Email
export const email: SchemaOf<IValidateUserSchema["email"]> = string()
  .required("กรุณากรอก email")
  .email("กรุณากรอกรูปแบบ email ให้ถูกต้อง");

// * Displayname
export const displayName: SchemaOf<IValidateUserSchema["displayName"]> =
  string().required("กรุณากรอก displayName");

const body: SchemaOf<IValidateUserSchema> = object()
  .shape({
    username,
    displayName,
    email,
    password,
    confirmPassword,
    address,
  })
  .defined();

export const validateCreateUserSchema = object({
  body,
});
