import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import leadRoutes from './routes/leadRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

// Configure CORS: allow a comma-separated list in CLIENT_ORIGINS or single CLIENT_URL
const originsEnv = process.env.CLIENT_ORIGINS || process.env.CLIENT_URL || '';
const allowedOrigins = originsEnv
	.split(',')
	.map((s) => s.trim())
	.filter(Boolean);

const corsOptions = {
	origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
		// allow non-browser tools like curl/postman (no origin)
		if (!origin) return callback(null, true);
		// if no allowedOrigins configured, allow everything (fallback)
		if (allowedOrigins.length === 0) return callback(null, true);
		if (allowedOrigins.includes(origin)) return callback(null, true);
		return callback(new Error('Not allowed by CORS'));
	},
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
