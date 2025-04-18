import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // eslint-disable-line no-var
}

//create singleton of db connection
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
