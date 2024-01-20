import prisma from "@/prisma/prisma"
import { NextResponse } from "next/server"



export async function POST(request: Request) {
    const body: any = await request.json()
    const { query, take } = body
    try {
        const product = await prisma.product.findMany({
            take: take,
            where: {
                OR: [
                    { name: { some: { name: { contains: query, mode: 'insensitive' } } } },
                    { description: { some: { des: { contains: query, mode: 'insensitive' } } } },
                ],
            }
        });
        const productsWithCategory = await Promise.all(
            product.map(async (product) => {
              const category = await prisma.category.findFirst({
                where: {
                  id: product.category_id,
                },
              });
              return { ...product, path: category?.page + '/' + category?.name[0].name };
            })
          );
        
        return NextResponse.json(productsWithCategory)
    }
    catch (error) {
        console.log('Error creating the post', error)
        return NextResponse.error()
    }
}
