import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

// Configure CORS to allow frontend origin in production
const CLIENT_URL = process.env.CLIENT_URL || '*';
const corsOptions = {
	origin: CLIENT_URL === '*' ? true : CLIENT_URL,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

app.use(cors(corsOptions));
// enable preflight across the board
app.options('*', cors(corsOptions));
app.use(express.json());

// simple health route for browsers and checks
app.get('/', (_req, res) => res.send('Smart Leads API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorHandler);

export default app;
