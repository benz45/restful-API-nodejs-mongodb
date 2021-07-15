import SessionSchema from "../schema/session.schema";
import { UserDocument } from "../model/user.model";
import { LeanDocument } from "mongoose";
import { jwtSign } from "../utils/jwt.utils";
import { get } from "config";
import { IToken } from "../model/session.model";

export async function createSessionAndTokenService({
  user,
  userAgent,
}: {
  user: LeanDocument<Omit<UserDocument, "password">>;
  userAgent: string;
}) {
  // Create session to database
  const session = await SessionSchema.create({ user: user._id, userAgent });

  //   Get access token and refresh token time out default value
  const accessTokenTimeOut: string = get("accessTokenTimeOut");
  const refreshTokenTimeOut: string = get("refreshTokenTimeOut");

  //   Create access token
  const accessToken = jwtSign(
    { ...user, session: session._id },
    { expiresIn: accessTokenTimeOut }
  );

  //   Create refresh token
  const refreshToken = jwtSign(session.toJSON(), {
    expiresIn: refreshTokenTimeOut,
  });

  return <IToken>{
    accessToken,
    refreshToken,
  };
}
