import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import RedisStore from 'connect-redis';
import { redisClient } from "./config/redis";
import session, { SessionOptions } from "express-session";
import {router as problemRoutes}  from './routes/problem-routes';
import {router as  groupRoutes} from './routes/group-routes'
import {router as groupMemberRoutes} from './routes/group-member-route';
import {router as codeEditorRoutes} from './routes/code-editor-routes';

const app: Application = express();
const port = process.env.PORT || 5000;


// const RedisStore = new Store(session);

const sessionOptions: SessionOptions = {
  store: new RedisStore({ client: redisClient }),
  secret: 'topsecret~!@#$%^&*',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 10 // 10 minutes
  }
};



app.use(bodyParser.json());
app.use(session(sessionOptions));
app.use('/groups', groupRoutes);
app.use('/problems', problemRoutes);
app.use('/groupmembers', groupMemberRoutes);
app.use('/codeeditors', codeEditorRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the programming practice problem collaboration app!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
