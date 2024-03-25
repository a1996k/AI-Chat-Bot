import { Router } from "express";
import { getAllUsers, userLogIn, userSignUp } from "../controller/user-controller.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";

const userRoutes = Router();


userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogIn);


export default userRoutes;