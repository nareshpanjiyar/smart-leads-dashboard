import mongoose from 'mongoose';

// Try a normal connection first. If no URI is provided or connection fails in dev,
// fall back to an in-memory MongoDB using mongodb-memory-server.
const connectDB = async (uri?: string) => {
  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected');
      return;
    } catch (error) {
      console.error('Database connection error (uri):', error);
      // continue to fallback below
    }
  }

  // Fallback to in-memory server for development convenience
  try {
    // lazy require to avoid adding dependency to production
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    await mongoose.connect(memUri);
    console.log('Connected to in-memory MongoDB');
  } catch (err) {
    console.error('Failed to start in-memory MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;