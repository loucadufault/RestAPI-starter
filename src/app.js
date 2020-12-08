import cors from 'cors';
import express from 'express';

import routes from './routes';
import { errorHandler, errorLogger } from './middleware/error_handlers';

const app = express();

// application-level middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// routes
app.use('/', routes);

// error-handling middleware
if (process.env.NODE_ENV == "development") {
  app.use(errorLogger);
}
app.use(errorHandler);

// start server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port ${port}!`),
);

export default app;