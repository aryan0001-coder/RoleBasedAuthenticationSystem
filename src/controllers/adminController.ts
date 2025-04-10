import { Request, ResponseToolkit } from '@hapi/hapi';
import { User } from '../models/User';

export const adminController = {
  createSubAdmin: async (request: Request, h: ResponseToolkit) => {
    try {
      const payload = request.payload as { name: string; email: string; password: string };
      const subAdmin = new User({
        ...payload,
        role: 'sub-admin'
      });
      await subAdmin.save();
      return h.response({ message: 'Sub-admin created successfully', subAdmin }).code(201);
    } catch (error) {
      return h.response({ message: 'Internal server error' }).code(500);
    }
  },

  listSubAdmins: async (request: Request, h: ResponseToolkit) => {
    try {
      const subAdmins = await User.find({ role: 'sub-admin' }).select('-password');
      return h.response(subAdmins);
    } catch (error) {
      return h.response({ message: 'Internal server error' }).code(500);
    }
  },

  getSubAdmin: async (request: Request, h: ResponseToolkit) => {
    try {
      const { id } = request.params;
      const subAdmin = await User.findOne({ _id: id, role: 'sub-admin' }).select('-password');
      if (!subAdmin) {
        return h.response({ message: 'Sub-admin not found' }).code(404);
      }
      return h.response(subAdmin);
    } catch (error) {
      return h.response({ message: 'Internal server error' }).code(500);
    }
  },

  updateSubAdmin: async (request: Request, h: ResponseToolkit) => {
    try {
      const { id } = request.params;
      const payload = request.payload as { name?: string; email?: string; password?: string };
      const subAdmin = await User.findOneAndUpdate(
        { _id: id, role: 'sub-admin' },
        payload,
        { new: true }
      ).select('-password');
      
      if (!subAdmin) {
        return h.response({ message: 'Sub-admin not found' }).code(404);
      }
      return h.response(subAdmin);
    } catch (error) {
      return h.response({ message: 'Internal server error' }).code(500);
    }
  },

  deleteSubAdmin: async (request: Request, h: ResponseToolkit) => {
    try {
      const { id } = request.params;
      const subAdmin = await User.findOneAndDelete({ _id: id, role: 'sub-admin' });
      if (!subAdmin) {
        return h.response({ message: 'Sub-admin not found' }).code(404);
      }
      return h.response({ message: 'Sub-admin deleted successfully' });
    } catch (error) {
      return h.response({ message: 'Internal server error' }).code(500);
    }
  }
};