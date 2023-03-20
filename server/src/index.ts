import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import express, { Application, Request, Response } from 'express';
import RedisStore from 'connect-redis';
import { redisClient } from "./config/redis";
import session, { SessionOptions } from "express-session";
import {router as problemRoutes}  from './routes/problem-routes';
import {router as  groupRoutes} from './routes/group-routes'
import {router as groupMemberRoutes} from './routes/group-member-route';
import {router as codeEditorRoutes} from './routes/code-editor-routes';
import { initializeSocket } from './services/socket';
import { socketResources } from './socket-colab/socketResources';


const app: Application = express();
const port = process.env.PORT || 5000;


// initiaizing socket instance
const io = initializeSocket(app);

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

app.use(
  cors({
      origin: "http://localhost:3000",
      credentials: true,
  })
)

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(session(sessionOptions));
app.use('/groups', groupRoutes);
app.use('/challenges', problemRoutes);
app.use('/groupmembers', groupMemberRoutes);
app.use('/codeeditors', codeEditorRoutes);

// io.use(session(sessionOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the programming practice problem collaboration app!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

socketResources(io);