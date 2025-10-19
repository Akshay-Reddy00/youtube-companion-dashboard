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
exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "12345";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existing = yield user_1.User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: 'Email already in use' });
        const user = new user_1.User({ email, password });
        yield user.save();
        res.status(201).json({ message: 'User registered' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.login = login;
