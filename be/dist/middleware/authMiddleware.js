"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "12345";
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token)
        return res.status(401).json({ message: 'Unauthorized: Malformed token' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded; // attach decoded token (user id) to request
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
exports.requireAuth = requireAuth;
