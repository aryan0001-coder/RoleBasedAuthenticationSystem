const dotenv = require('dotenv');
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'MONGO_URI=mongodb+srv://aryan:aryan1234@cluster0.u2p1f.mongodb.net/Assignment?retryWrites=true&w=majority&appName=Cluster0',
  jwtSecret: process.env.JWT_SECRET || 'aryan-123',
  superAdmin: {
    email: process.env.SUPER_ADMIN_EMAIL || 'admin@example.com',
    password: process.env.SUPER_ADMIN_PASSWORD || 'Admin@123',
    name: 'Super Admin'
  }
};