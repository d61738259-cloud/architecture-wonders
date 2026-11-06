import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { isDbConnected } from '../utils/jsonStore.js';

export const protectAdmin = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.adminToken) {
      token = req.cookies.adminToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Administrator authentication required.',
      });
    }

    const secret = process.env.JWT_SECRET || 'architecture-wonders-secure-secret-key-2026';
    const decoded = jwt.verify(token, secret);

    if (decoded.id === 'master_admin_offline' || !isDbConnected()) {
      req.admin = {
        _id: 'master_admin_offline',
        name: 'Studio Super Admin',
        email: 'admin@architecturewonders.com',
        role: 'super_admin',
      };
      return next();
    }

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session or administrator account not found.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is invalid or expired.',
    });
  }
};
