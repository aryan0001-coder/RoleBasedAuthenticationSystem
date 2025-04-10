import { Request, ResponseToolkit } from '@hapi/hapi';
const jwt = require('jsonwebtoken');
import { config } from '../config/config';
import { User } from '../models/User';

export const validateToken = async (request: Request, h: ResponseToolkit) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return h.response({ message: 'No token provided' }).code(401).takeover();
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; role: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return h.response({ message: 'User not found' }).code(401).takeover();
    }

    request.auth.credentials = { user };
    return h.continue;
  } catch (error) {
    return h.response({ message: 'Invalid token' }).code(401).takeover();
  }
};

export const isSuperAdmin = async (request: Request, h: ResponseToolkit) => {
  const user = (request.auth.credentials as any).user;
  if (user.role !== 'super-admin') {
    return h.response({ message: 'Access denied' }).code(403).takeover();
  }
  return h.continue;
};