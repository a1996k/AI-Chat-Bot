import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-router.js";

const appRouter = Router();
console.log("in APP->Index")

appRouter.use("/user", userRoutes); 
appRouter.use("/chats", chatRoutes);

export default appRouter;