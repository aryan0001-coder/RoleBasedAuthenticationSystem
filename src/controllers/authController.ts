import { Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '../models/User';
const  jwt = require('jsonwebtoken');
import { config } from '../config/config';

export const authController = {
  login: async (request: Request, h: ResponseToolkit) => {
    try {
      const { email, password } = request.payload as { email: string; password: string };
      
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return h.response({ message: 'Invalid credentials' }).code(401);
      }

      const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1d' });
      
      return h.response({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
      return h.response({ message: 'Internal server error' }).code(500);
    }
  }
};


//Further Improvements
// Rate Limiting: Prevent brute-force attacks.

// Refresh Tokens: For longer sessions.

// Logging: