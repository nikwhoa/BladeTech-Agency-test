To run database, you need to set the environment variables. They are stored in the `.env` file in the server directory.

```bash
DATABASE_URL="postgresql://user:JW35u`^xYhZ@T2&7@localhost:5432/postgres_db_bladetech-agency?schema=public"
```

Run the project:

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

For client, you need to set the API_URL environment variable in the `.env.local` file in the client directory.

```bash
NEXT_PUBLIC_API_URL="http://localhost:3000"
```
