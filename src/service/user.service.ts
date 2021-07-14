import { DocumentDefinition } from "mongoose";
import UserScema from "../schema/user.schema";
import { UserDocument } from "../model/user.model";

export async function createUserService(
  data: DocumentDefinition<UserDocument>
) {
  try {
    return await UserScema.create(data);
  } catch (error) {
    throw new Error(error);
  }
}
