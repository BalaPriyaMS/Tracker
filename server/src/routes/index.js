import { Router } from "express";
import userRouter from "./user.route.js"
import authRouter from "./auth.route.js"
import groupRouter from "./group.route.js"

export const handlerRouter = () => {
    const router = Router();
    router.use("/user",userRouter);
    router.use("/auth",authRouter);
    router.use("/group",groupRouter);
    return router
}