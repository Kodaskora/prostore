'use server';
//import { PrismaClient } from '@prisma/client';
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';

//Get latest products
export async function getLatestProducts() {
  //const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  const formattedProducts = data.map((v) => ({
    ...v,
    rating: Number(v.rating),
  }));

  return convertToPlainObject(formattedProducts);
}

//Get single product by it's slug
export async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug },
  });
}
