import { Document } from "mongoose";
interface UserModel {
  username: string;
  displayName: string;
  email: string;
  password: string;
  address: Address;
}

interface Address {
  homeId: number;
  district: string;
  parish: string;
}

// Interface for pasing user schema
export interface PasingUserSchema extends UserModel {
  confirmPassword: string;
}

// Interface for using user schema
export interface UserDocument extends UserModel, Document {
  createdAt: Date;
  updatedAt: Date;
}
