import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb'
export const dynamic = "force-dynamic";

export async function getSession(){
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        console.error("Error fetching session:", error);
        return null;
    }
}

export async function getCurrentUser(){
    try {
        const session = await getSession()

        if(!session?.user?.email){
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            },
            include: {
                orders: true
            }
        })

        if(!currentUser){
            return null
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }
    } catch (error) {
        console.log("Error fetching current user:", error);
        return null
    }
}