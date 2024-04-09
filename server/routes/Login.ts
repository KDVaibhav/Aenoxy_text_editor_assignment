import { User } from "../models/User"
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const Login = async(req:Request, res: Response)=>{
    try{
        const {identifier, password} = req.body as {identifier: string; password: string};
        const foundUser = await User.findOne({
            $or:[{email: identifier}, {username:identifier}],
        })

        if (!foundUser) {
            return res.status(400).json({
                error: "User not found"
            })
        }
        else {
            const passwordMatch = await bcrypt.compare(password, foundUser.password)
            if(!passwordMatch){
                return res.status(400).json({error: "invalid password"});
            }
            const token = jwt.sign({username: foundUser.username}, process.env.SECRET_KEY as string, {expiresIn: '1h'});
            res.json({token});
        }

    }
    catch(error){
        res.status(500).json({error: 'Internal Server Error'});
    }
}