import { NextFunction, Request, Response } from "express"
import User from "../models/User.js"
import { hash, compare } from "bcrypt";
import { create } from "domain";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constsnts.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //get all users
      const users = await User.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };

  export const userSignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //Sign up
      const { name, email, password } = req.body
      const existingUser = await User.findOne({ email })

      if (existingUser) return  res.status(401).send("Email already exists");

      const hashedPassword = await hash(password, 10)
      const user = new User({ name, email, password:hashedPassword })
      await user.save();

      //Create Token and Store Cookie
      res.clearCookie(COOKIE_NAME, { 
        path: "/", 
        domain:"localhost", 
        httpOnly: true,
        signed: true
      });

      const token = createToken(user.id.toString(), user.email.toString(), "7d")
      const expires = new Date();
      expires.setDate(expires.getDate()+7)
      res.cookie(COOKIE_NAME, token, { 
        path: "/", 
        domain:"localhost", 
        expires: expires,
        httpOnly: true,
        signed: true
      })
      
      return res.status(201).json({ message: "OK", id:user._id.toString() });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };

  export const userLogIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //LogIn
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user){ res.status(401).send("User not registered"); }

      const isPasswordCorrect = await compare(password, user.password)
      if (!isPasswordCorrect){
        return res.status(403).send("Incorrect Password")
      }
      res.clearCookie(COOKIE_NAME, { 
        path: "/", 
        domain:"localhost", 
        httpOnly: true,
        signed: true
      });

      //Create Token and Store Cookie
      const token = createToken(user.id.toString(), user.email.toString(), "7d")
      const expires = new Date();
      expires.setDate(expires.getDate()+7)
      res.cookie(COOKIE_NAME, token, { 
        path: "/", 
        domain:"localhost", 
        expires: expires,
        httpOnly: true,
        signed: true
      })
      
      return res.status(200).send(`${user.email} Login Sucessful`);
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
    }
  };