import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// simple health route for browsers and checks
app.get('/', (_req, res) => res.send('Smart Leads API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorHandler);

export default app;