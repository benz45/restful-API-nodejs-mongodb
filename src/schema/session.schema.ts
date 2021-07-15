import { ISessionSchema } from "../model/session.model";
import { Schema, Model, model } from "mongoose";

const CreateSessionSchema = new Schema<
  ISessionSchema,
  Model<ISessionSchema>,
  ISessionSchema
>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionSchema = model<ISessionSchema>("session", CreateSessionSchema);

export default SessionSchema;
