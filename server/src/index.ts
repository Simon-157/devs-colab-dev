import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
require('./services/db');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const problemRoutes = require('./routes/problem-routes');
const groupRoutes = require('./routes/group-routes');
const groupMemberRoutes = require('./routes/group-member-route');
const codeEditorRoutes = require('./routes/code-editor-routes');



dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

app.use(session({
  store: new redisStore({ client: client }),
  secret: 'topsecret~!@#$%^&*',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 10 // 10 minutes
  }
}))

// Mount the various routes
app.use('/problems', problemRoutes);
app.use('/groups', groupRoutes);
app.use('/groupmembers', groupMemberRoutes);
app.use('/codeeditors', codeEditorRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the programming practice problem collaboration app!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
