import { Router } from "express";
import userRouter from "./user.route.js"

export const handlerRouter = () => {
    const router = Router();
    router.use("/user",userRouter);
    return router
}