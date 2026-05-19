import mongoose from 'mongoose';

const connectDB = async (uri?: string) => {
  if (!uri) {
    console.error('Database connection error: MONGO_URI is missing');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
