import { DocumentDefinition } from "mongoose";
import UserScema from "../schema/user.schema";
import { UserDocument } from "../model/user.model";
import { omit } from "lodash";

export async function createUserService(
  data: DocumentDefinition<UserDocument>
) {
  try {
    return await UserScema.create(data);
  } catch (error) {
    throw new Error(error);
  }
}

export async function validatePassword({
  username,
  password,
}: {
  username: UserDocument["username"];
  password: UserDocument["password"];
}) {
  const user = await UserScema.findOne({ username });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
