import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
export const SignUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body as {
      username: string;
      email: string;
      password: string;
    };
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      const Secret_key = process.env.SECRET_KEY as string;
      const token = jwt.sign({username}, Secret_key, {expiresIn: '1h'});
      return res.status(201).json({
        message: 'User created Successfully',
        token
      })
    }
  } catch (error) {
      console.error( 'Error signing up user:', error );
      res.status(500).json({error: 'Internal server error'})
  }
};
