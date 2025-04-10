import { Server } from '@hapi/hapi';
import { authController } from '../controllers/authController';
import { adminController } from '../controllers/adminController';
import { validateToken, isSuperAdmin } from '../middleware/auth';

export const registerRoutes = (server: Server) => {
  // Auth routes
  server.route({
    method: 'POST',
    path: '/api/auth/login',
    handler: authController.login
  });

  // Admin routes
  server.route([
    {
      method: 'POST',
      path: '/api/admin/sub-admin',
      handler: adminController.createSubAdmin,
      options: {
        pre: [
          { method: validateToken },
          { method: isSuperAdmin }
        ]
      }
    },
    {
      method: 'GET',
      path: '/api/admin/sub-admin',
      handler: adminController.listSubAdmins,
      options: {
        pre: [
          { method: validateToken },
          { method: isSuperAdmin }
        ]
      }
    },
    {
      method: 'GET',
      path: '/api/admin/sub-admin/{id}',
      handler: adminController.getSubAdmin,
      options: {
        pre: [
          { method: validateToken },
          { method: isSuperAdmin }
        ]
      }
    },
    {
      method: 'PUT',
      path: '/api/admin/sub-admin/{id}',
      handler: adminController.updateSubAdmin,
      options: {
        pre: [
          { method: validateToken },
          { method: isSuperAdmin }
        ]
      }
    },
    {
      method: 'DELETE',
      path: '/api/admin/sub-admin/{id}',
      handler: adminController.deleteSubAdmin,
      options: {
        pre: [
          { method: validateToken },
          { method: isSuperAdmin }
        ]
      }
    }
  ]);
};