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
		// don't throw — signal disallowed origin so express/cors will respond without ACAO
		return callback(null, false);
	},
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

app.use(cors(corsOptions));
// lightweight origin logger for debugging (no-op in production)
app.use((req, _res, next) => {
	try {
		if (process.env.NODE_ENV !== 'production') {
			const origin = req.headers.origin || null;
			// use console.debug so it's easy to filter in logs
			// eslint-disable-next-line no-console
			console.debug('[CORS DEBUG] incoming Origin:', origin);
		}
	} catch (err) {
		// ignore logging errors
	}
	next();
});
// preflight OPTIONS are handled by the global CORS middleware above; no explicit app.options needed
app.use(express.json());

// simple health route for browsers and checks
app.get('/', (_req, res) => res.send('Smart Leads API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorHandler);

// Debug endpoint to inspect CORS configuration at runtime
app.get('/debug/cors', (_req, res) => {
	res.json({
		clientOriginsEnv: process.env.CLIENT_ORIGINS || null,
		clientUrlEnv: process.env.CLIENT_URL || null,
		allowedOrigins,
	});
});

export default app;
