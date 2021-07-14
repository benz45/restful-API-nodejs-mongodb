import { Request, Response } from "express";
import { createUserService } from "../service/user.service";
import log from "../log";
import { IResponse } from "../model/response.model";
import { omit } from "lodash";

export async function createUserHandler({ body }: Request, res: Response) {
  try {
    const user = await createUserService(body);

    return res.json(<IResponse>{
      status: true,
      message: "success",
      data: omit(user.toJSON(), ""),
    });
  } catch (error) {
    log.error(error);
    return res.status(400).json(<IResponse>{
      status: false,
      message: error,
    });
  }
}
