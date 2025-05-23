
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://shubhangshukla4158:<db_password>@cluster0.icaxnlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = 'JobPortal';

// Check if we have a connection to the database or if it's currently connecting or disconnected
let isConnected = false;

// Define MongoDB schemas and models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], required: true },
  googleId: { type: String, sparse: true },
  avatar: String,
  college: String,
  skills: [String],
  experience: String,
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  points: { type: Number, required: true },
  type: { type: String, enum: ['daily', 'once', 'repeatable'] },
  isActive: { type: Boolean, default: true },
});

const taskCompletionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  completedAt: { type: Date, default: Date.now },
  pointsEarned: { type: Number, required: true },
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
  description: String,
  skills: [String],
  salary: String,
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postedAt: { type: Date, default: Date.now },
});

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  appliedAt: { type: Date, default: Date.now },
});

const referralSchema = new mongoose.Schema({
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referralCode: { type: String, required: true, unique: true },
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

// Only create models in a server environment
let User, Task, TaskCompletion, Job, Application, Referral;

// Function to connect to the database (only works on the server)
export async function connectToDatabase() {
  // In browser environment, just return
  if (typeof window !== 'undefined') {
    console.warn('Attempted to connect to MongoDB from browser');
    return;
  }

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    console.log('=> connecting to MongoDB...');
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
    });

    isConnected = !!db.connections[0].readyState;
    console.log('=> using new database connection');

    // Create models after connection
    User = mongoose.models.User || mongoose.model('User', userSchema);
    Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
    TaskCompletion = mongoose.models.TaskCompletion || mongoose.model('TaskCompletion', taskCompletionSchema);
    Job = mongoose.models.Job || mongoose.model('Job', jobSchema);
    Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);
    Referral = mongoose.models.Referral || mongoose.model('Referral', referralSchema);

    return;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Dummy type definitions for the client side
export type UserType = {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  role: 'student' | 'recruiter' | 'admin';
  googleId?: string;
  avatar?: string;
  college?: string;
  skills?: string[];
  experience?: string;
  totalPoints?: number;
  createdAt?: Date;
}

export type TaskType = {
  _id?: string;
  name: string;
  description?: string;
  points: number;
  type: 'daily' | 'once' | 'repeatable';
  isActive: boolean;
}

// Export the models
export { User, Task, TaskCompletion, Job, Application, Referral };
