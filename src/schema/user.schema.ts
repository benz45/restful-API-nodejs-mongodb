import { Schema, model, SchemaDefinitionProperty } from "mongoose";
import {
  object,
  string,
  number,
  StringSchema,
  AnyObjectSchema,
  ref,
} from "yup";
import { PasingUserSchema, UserDocument } from "../model/user.model";

export const pasingUserSchema = object({
  body: object(<Record<keyof PasingUserSchema, StringSchema | AnyObjectSchema>>{
    username: string()
      .required("กรุณากรอก username")
      .min(5, "username ไม่น้อยกว่า 5")
      .max(10, "username ไม่มากกว่า 10"),
    displayName: string().required("กรุณากรอก displayName"),
    email: string()
      .required("กรุณากรอก email")
      .email("กรุณากรอกรูปแบบ email ให้ถูกต้อง"),
    address: object().shape({
      homeId: number().required("กรุณากรอก homeId"),
      district: string().required("กรุณากรอก district"),
      parish: string().required("กรุณากรอก parish"),
    }),
    password: string()
      .required("กรุณากรอก password")
      .min(8, "password อย่างน้อง 8 ตัว")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "password a-z, A-Z, 0-9, ตัวอักษรพิเศษ อย่างละ 1 ตัว "
      ),
    confirmPassword: string()
      .required("กรุณากรอก confirmPassword")
      .oneOf([ref("password"), null], "password ไม่ต้องไม่ตรง"),
  }),
});

const UserSchema = new Schema(
  <Record<keyof UserDocument, SchemaDefinitionProperty>>{
    username: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: Object, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<UserDocument>("user", UserSchema);
