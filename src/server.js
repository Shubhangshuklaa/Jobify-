
import express from 'express';
import cors from 'cors';
import userRoutes from './api/users';
import jobRoutes from './api/jobs';
import taskRoutes from './api/tasks';
import { connectToDatabase } from './utils/mongodb';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection
connectToDatabase().catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
