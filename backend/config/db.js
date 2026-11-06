import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/architecture_wonders';
    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    // In production, Render backend will alert if MongoDB Atlas URI fails to connect.
    if (process.env.NODE_ENV === 'production') {
      console.warn('[MongoDB Atlas] Running in production without a live database will cause database endpoints to fail.');
    }
  }
};

export default connectDB;
