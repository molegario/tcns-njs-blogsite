This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Installing ShadCN (legacy-peer-deps)

Because of incompatibilities with NextJS r15 (React 19) shadCN must be installed using the legacy-peer-deps flag (set in .npmrc in the app root).
```bash
npx shadcn@latest init -d
npx shadcn@latest add {shadCN component}
```

## Database Initialization/Updates

This project uses a Prisma model layer and connects to a mongodb hosted on an Atlas free account.  The connection string is set in the .env file in the project root.  Note that the schema was adapted from a schema originally coded for mySQL with a Prisma layer for a MongoDB collection.

Whenever the prisma schema is updated remember to:

1. generate the client side models
```bash
npx prisma generate
```

2. push the updated schema to the live remote database
```bash
npx prisma db push
```

NOTE: To locally review the DB state invoke the prisma studio from the prompt
```bash
npx prisma studio
```

## Uploadthing configuration

- This site uses Uploadthing for image storage.
- also requires legacy-peer-dep flag (set in .npmrc file in the project root)
