To run the project:

1. Install dependencies

```bash
docker compose up -d
cd server
yarn install
npx prisma generate
npx prisma migrate dev
yarn run start:dev
cd ../client
yarn install
yarn dev
```

2. Generate Prisma client and create migrations

```bash

```

3. Install client dependencies and run

```bash
cd client
yarn install
yarn dev
```

To run server with docker, you need to set the environment variables. They are stored in the `.env` file in the server directory.

```bash
DATABASE_URL="postgresql://user:JW35u`^xYhZ@T2&7@localhost:5432/postgres_db_bladetech-agency?schema=public"
```

For client, you need to set the API_URL environment variable in the `.env.local` file in the client directory.

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```
