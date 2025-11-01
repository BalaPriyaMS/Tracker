import { Router } from "express";
import userRouter from "./user.route.js"
import authRouter from "./auth.route.js"

export const handlerRouter = () => {
    const router = Router();
    router.use("/user",userRouter);
    router.use("/auth",authRouter);
    return router
}