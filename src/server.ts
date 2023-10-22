import express from 'express';
import morgan from 'morgan';
import {
  deleteUser,
  getUser,
  getUsers,
  signin,
  signup,
  updateUser
} from './handlers/user';
import { verifyUser } from './middleware/user';
import router from './router';

const app = express();
app.use(express.json()); // you cant response with json without this middleware

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', verifyUser, router);

app.post('/signup', signup);
app.post('/signin', signin);
app.get('/user', verifyUser, getUser);
app.put('/user/:id', updateUser);
app.delete('/user/:id', verifyUser, deleteUser);
app.get('/users', getUsers);

export default app;
