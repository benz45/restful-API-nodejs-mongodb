import { Document } from "mongoose";
import { UserDocument } from "../model/user.model";

export interface ISessionSchema extends Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createAt: Date;
  updateAt: Date;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
