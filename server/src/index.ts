import 'dotenv/config';
import app from './app';
import { env } from './config/env';

app.listen(env.PORT, () => {
  console.log(`MEGACORP INDUSTRIES HR Portal online. Synergizing on port ${env.PORT}.`);
});
