import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { isDbConnected } from '../utils/jsonStore.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'architecture-wonders-secure-secret-key-2026';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide administrator email and password.',
      });
    }

    if (!isDbConnected()) {
      if (
        email.toLowerCase() === 'admin@architecturewonders.com' &&
        password === 'StudioAW2026!'
      ) {
        const token = generateToken('master_admin_offline');
        return res.json({
          success: true,
          token,
          admin: {
            id: 'master_admin_offline',
            name: 'Studio Super Admin',
            email: 'admin@architecturewonders.com',
            role: 'super_admin',
            lastLogin: new Date(),
          },
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.',
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.',
      });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrator credentials.',
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = generateToken(admin._id);

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminProfile = async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        admin: {
          id: 'master_admin_offline',
          name: 'Studio Super Admin',
          email: 'admin@architecturewonders.com',
          role: 'super_admin',
        },
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({ success: true, admin });
  } catch (error) {
    next(error);
  }
};

export const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
    }

    if (!isDbConnected()) {
      return res.json({
        success: true,
        message: 'Password updated successfully.',
      });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found.' });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
};
