import { type User } from "./entities/user.js";

export interface Context {
  user?: User;
}
