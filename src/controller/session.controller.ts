import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { IResponse } from "../model/response.model";
import { createSessionAndTokenService } from "../service/session.service";
import { get } from "lodash";

export async function createSessionHandler(req: Request, res: Response) {
  // Check is user and compare password
  const user = await validatePassword(req.body);

  // Without user
  if (!user) {
    return res.status(401).json(<IResponse>{
      status: false,
      message: "username หรือ password ไม่ถูกต้อง",
    });
  }

  // Create session to database and create access token and refresh token
  const newToken = await createSessionAndTokenService({
    user,
    userAgent: `${get(req.headers, "user-agent")}` || "",
  });

  return res.json(<IResponse>{
    status: true,
    message: "สร้าง token แล้ว",
    data: newToken,
  });
}
