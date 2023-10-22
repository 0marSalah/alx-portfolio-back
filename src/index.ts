import app from './server';
import * as dotenv from 'dotenv';

dotenv.config();

const port = 8888;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
