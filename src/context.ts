import { getUser } from "./helpers/context.helper.js";

export const context = async ({ req, res }) => {
  const accessToken = req.headers["accesstoken"] || "";
  const user = await getUser(accessToken);
  return { user: { id: user } };
};
export default context;
