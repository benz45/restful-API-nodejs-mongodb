import {
  Schema,
  model,
  SchemaDefinitionProperty,
  HookNextFunction,
} from "mongoose";

import bcrypt from "bcrypt";
import { get } from "config";
import { UserDocument } from "../model/user.model";

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

UserSchema.pre<UserDocument>("save", async function (next: HookNextFunction) {
  let user = this;

  const salt = await bcrypt.genSalt(get<number>("genSalt"));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

// Compare the password from the client and the same password?
UserSchema.methods.comparePassword = async function (clientPassword: string) {
  const user = this as UserDocument;

  return bcrypt.compare(clientPassword, user.password);
};

export default model<UserDocument>("user", UserSchema);
