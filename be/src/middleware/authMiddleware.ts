import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "12345";

export const requireAuth = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Unauthorized: Malformed token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach decoded token (user id) to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
