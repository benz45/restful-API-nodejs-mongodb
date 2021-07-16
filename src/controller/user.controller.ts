import { Request, Response } from "express";
import { findUserService, createUserService } from "../service/user.service";
import log from "../log";
import { IResponse } from "../model/response.model";

export async function createUserHandler({ body }: Request, res: Response) {
  try {
    const isUser = await findUserService(body.email);

    if (!isUser) {
      return res.status(400).json(<IResponse>{
        status: false,
        message: "user ซ้ำ",
      });
    }

    const user = await createUserService(body);

    return res.json(<IResponse>{
      status: true,
      message: "success",
      data: user.toJSON(),
    });
  } catch (error) {
    log.error(error);
    return res.status(400).json(<IResponse>{
      status: false,
      message: error,
    });
  }
}
