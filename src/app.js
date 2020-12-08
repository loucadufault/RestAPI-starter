import cors from 'cors';
import express from 'express';

import routes from './routes';

const app = express();

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Set up routes
app.use('/', routes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port ${port}!`),
);

export default app;