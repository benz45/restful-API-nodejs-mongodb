import { DocumentDefinition } from "mongoose";
import UserScema from "../schema/user.schema";
import { UserDocument } from "../model/user.model";
import log from "../log";

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
  try {
    // Where username on database
    const user = await UserScema.findOne({ username });

    // Without username
    if (!user) {
      return false;
    }

    // Compare password
    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return false;
    }

    return user.toJSON();
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
}
