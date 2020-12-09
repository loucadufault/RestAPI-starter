import cors from 'cors';
import express from 'express';

import routes from './routes';
import { errorHandler, errorLogger } from './middleware/error_handlers';
import models, { sequelize } from './db';

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

const port = process.env.PORT || 3000;


sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((e) => {
  console.error('Unable to connect to the database:', e);
});

// this can be destructive, migrations should be used on production // TODO
sequelize.sync({ force: true }).then(async () => {
  console.log("All models were synchronized successfully.");

  app.listen(port, () =>
    console.log(`Listening on port ${port}!`),
  );
});

export default app;