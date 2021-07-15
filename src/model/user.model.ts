import { Document } from "mongoose";

interface UserModel {
  username: string;
  displayName: string;
  email: string;
  password: string;
  address: IAddress;
}

interface IAddress {
  homeId: number;
  district: string;
  parish: string;
}

// * Interface for parsing and validate user schema
export interface IValidateUserSchema extends UserModel {
  confirmPassword: string;
}

// * Interface for using user document schema
export interface UserDocument extends UserModel, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
