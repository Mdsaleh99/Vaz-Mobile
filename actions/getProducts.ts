import prisma from "@/libs/prismadb"

export interface IProductParams {
    category?: string | null
    searchTerm?: string | null
}
// npx prisma db push

export default async function getProducts(params: IProductParams){
    try {
        const {category, searchTerm} = params
        let searchString = searchTerm

        if(!searchTerm){
            searchString = ''
        }

        const query:any = {}
        if(category){
            query.category = category
        }

        const product = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                    },
                    {
                        description: {
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }
        })

        return product
    } catch (error: any) {
        throw new Error(error)
    }
}