import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables

// Load default configurations from config.env first
// These variables will be set in process.env
dotenv.config({ path: './config.env' });

// Load variables from .env if it exists.
// By default (without 'override: true'), dotenv will NOT overwrite any environment variables
// that are already set. So, if a variable is in both config.env and .env,
// the value from config.env will be used.
// .env is primarily for adding variables not present in config.env (e.g., secrets).
dotenv.config(); // Loads from default '.env' path

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the MERN Stack API' });
});

// Use Routes
import itemsRouter from './routes/api/items.js';
app.use('/api/items', itemsRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/dist'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'dist', 'index.html')
    );
  });
}

// Start server with port fallback
const startServer = (port) => {
  const server = app
    .listen(port)
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(
          `Port ${port} is already in use, trying port ${port + 1}...`
        );
        server.close();
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
      }
    })
    .on('listening', () => {
      const actualPort = server.address().port;
      console.log(
        `Server running on port ${actualPort} in ${process.env.NODE_ENV} mode`
      );

      // Update client env if needed
      if (actualPort !== PORT) {
        console.log(
          `Note: Server running on different port than configured. API calls might need adjustment.`
        );
      }
    });
};

startServer(PORT);
