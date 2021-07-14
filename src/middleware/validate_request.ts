import { AnySchema, ValidationError } from "yup";
import { Request, Response, NextFunction } from "express";
import { omit } from "lodash";
import { IResponse } from "../model/response.model";

const validateRequest =
  (schema: AnySchema) =>
  async (
    { body, params, query }: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.validate(
        {
          body,
          params,
          query,
        },
        {
          abortEarly: false,
          strict: false,
        }
      );

      return next();
    } catch (error) {
      const _error = omit(error as ValidationError, ["stack", "inner"]);
      return res.status(400).json(<IResponse>{
        status: false,
        message: _error.errors,
      });
    }
  };

export default validateRequest;
