const Hapi = require('@hapi/hapi');
import { config } from './config/config';
import { connectDB } from './config/database';
import { registerRoutes } from './routes';
import { User } from './models/User';

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  await connectDB();

  registerRoutes(server);

  // Create super admin if not exists
  const superAdmin = await User.findOne({ role: 'super-admin' });
  if (!superAdmin) {
    await User.create({
      name: config.superAdmin.name,
      email: config.superAdmin.email,
      password: config.superAdmin.password,
      role: 'super-admin'
    });
    console.log('Super admin created successfully');
  }

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();