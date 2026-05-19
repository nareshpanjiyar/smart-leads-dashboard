import mongoose from 'mongoose';

const connectDB = async (uri?: string) => {
  try {
    if (!uri) {
      throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(uri);

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
