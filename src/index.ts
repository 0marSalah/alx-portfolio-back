import app from './server';
import * as dotenv from 'dotenv';
import config from './config';

dotenv.config();

const port = config.port;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
