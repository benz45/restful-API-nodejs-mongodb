import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { IResponse } from "../model/response.model";

export async function createSessionHandler({ body }: Request, res: Response) {
  const user = await validatePassword(body);

  if (!user) {
    return res.status(401).json(<IResponse>{
      status: false,
      message: "username หรือ password ไม่ถูกต้อง",
    });
  }

  return res.json(<IResponse>{
    status: true,
    message: "มี user",
  });
}
