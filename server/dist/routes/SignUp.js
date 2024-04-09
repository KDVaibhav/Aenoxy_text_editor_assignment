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
exports.SignUp = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingUser = yield User_1.User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        else {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const newUser = new User_1.User({ username, email, password: hashedPassword });
            yield newUser.save();
            const Secret_key = process.env.SECRET_KEY;
            const token = jsonwebtoken_1.default.sign({ username }, Secret_key, { expiresIn: '1h' });
            return res.status(201).json({
                message: 'User created Successfully',
                token
            });
        }
    }
    catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.SignUp = SignUp;
