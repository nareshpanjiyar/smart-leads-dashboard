import mongoose from 'mongoose';

const printMongoConnectionHelp = (error: unknown) => {
  if (error instanceof Error && error.message.includes('querySrv ENOTFOUND')) {
    console.error(
      'MongoDB Atlas DNS lookup failed. Check that MONGO_URI in your host environment uses the latest Atlas Drivers connection string, and that the cluster hostname exists.'
    );
  }

  if (error instanceof Error && error.message.includes('Could not connect to any servers')) {
    console.error(
      'MongoDB Atlas rejected the connection. Add this server IP to Atlas Network Access, or temporarily allow 0.0.0.0/0 for deployment testing.'
    );
  }
};

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
    printMongoConnectionHelp(error);
    process.exit(1);
  }
};

export default connectDB;
