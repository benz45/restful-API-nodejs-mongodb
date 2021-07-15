import { Express } from "express";
import validateRequest from "./middleware/validate_request";
import { validateCreateUserSchema } from "./schema/user.schema.validate";
import { validateCreateSessionSchema } from "./schema/session.schema.validate";
import { createUserHandler } from "./controller/user.controller";
import { createSessionHandler } from "./controller/session.controller";

const route = (app: Express) => {
  // Register user account
  app.post(
    "/api/user",
    validateRequest(validateCreateUserSchema),
    createUserHandler
  );

  app.post(
    "/api/session",
    validateRequest(validateCreateSessionSchema),
    createSessionHandler
  );
};

export default route;
