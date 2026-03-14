// src/lib/prisma.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
// Usamos ruta relativa para evitar fallos de resolución en el build de Vercel
import { PrismaClient } from '../generated/prisma/client';

interface CustomGlobal {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as unknown as CustomGlobal;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está definida en las variables de entorno');
}

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
