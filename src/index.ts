import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { countryRoutes } from './routes/countryRoutes.js';
import { cityRoutes } from './routes/cityRoutes.js';
import { attractionRoutes } from './routes/attractionRoutes.js';
import { languageRoutes } from './routes/languageRoutes.js';

dotenv.config();
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Gør filer i assets-mappen tilgængelige på fx /assets/images/countries/san-marino.jpg.
app.use('/assets', express.static('assets'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/attractions', attractionRoutes);
app.use('/api/languages', languageRoutes);


// Handle all errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  const statusCode = (err as any).statusCode ?? 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
