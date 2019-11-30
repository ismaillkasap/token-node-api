import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes';

const app = express();

// Application-Level Middleware

app.use(
  cors({
    origin: true,
    allowedHeaders: false,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

// Routes

app.use('/payment', routes.payment);

// Start

app.listen(process.env.PORT, () =>
  console.log(`The app listening on port ${process.env.PORT}!`),
);
