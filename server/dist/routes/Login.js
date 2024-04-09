"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, password } = req.body;
        const foundUser = yield User_1.User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (!foundUser) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        else {
            const passwordMatch = yield bcrypt_1.default.compare(password, foundUser.password);
            if (!passwordMatch) {
                return res.status(400).json({ error: "invalid password" });
            }
            const token = jsonwebtoken_1.default.sign({ username: foundUser.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.Login = Login;
