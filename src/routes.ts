import { Express } from "express";
import validateRequest from "./middleware/validate_request";
import { pasingUserSchema } from "./schema/user.schema";
import { createUserHandler } from "./controller/user.controller";

const route = (app: Express) => {
  // Register user account
  app.post("/api/user", validateRequest(pasingUserSchema), createUserHandler);
};

export default route;
