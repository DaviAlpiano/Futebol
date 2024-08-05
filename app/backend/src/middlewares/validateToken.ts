import { NextFunction, Request, Response } from 'express';
import JwtScret from '../utils/jwt';
import UserService from '../service/user.service';

const validateToken = async (req: Request, res:Response, next: NextFunction) => {
  try {
    const bearerToken = req.header('Authorization');
    console.log(bearerToken, 'TESTE');
    if (!bearerToken) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const token = bearerToken.split(' ')[1];
    const decoded = JwtScret.verify(token);
    if (typeof decoded !== 'string' && 'email' in decoded) {
      await UserService.user(decoded.email);
      req.body.email = decoded.email;
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
