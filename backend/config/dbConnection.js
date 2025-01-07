import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
    });

    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectToDatabase;
