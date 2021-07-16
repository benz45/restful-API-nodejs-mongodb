import { Express } from "express";
import validateRequest from "./middleware/validate_request";
import { validateCreateUserSchema } from "./schema/user.schema.validate";
import { createUserHandler } from "./controller/user.controller";

const route = (app: Express) => {
  // Register user account
  app.post(
    "/api/user",
    validateRequest(validateCreateUserSchema),
    createUserHandler
  );

  // app.post("/api/session", validateRequest());
};

export default route;
