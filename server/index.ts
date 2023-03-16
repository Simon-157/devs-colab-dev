import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Import the various routes
import problemRoutes from './routes/problem';
import groupRoutes from './routes/group';
import groupMemberRoutes from './routes/groupMember';
import codeEditorRoutes from './routes/codeEditor';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

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
