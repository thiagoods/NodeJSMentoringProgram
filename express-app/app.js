import express from 'express';
import router from './routes';
import cookieParser from './middlewares/cookieparser';
import queryParser from './middlewares/queryparser';

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(router);

export default app;