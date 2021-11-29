import { envsafe, str } from 'envsafe';

export default () =>
  envsafe({
    DATABASE_URL: str({
      devDefault: 'postgresql://postgres:postgres@localhost:5432/mydb',
    }),
    NODE_ENV: str({
      devDefault: 'development',
      choices: ['development', 'production'],
    }),
    JWT_SECRET: str({
      devDefault: 's3cr3t',
    }),
  });
