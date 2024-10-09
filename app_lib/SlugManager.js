import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function createUniqueRandomSlug(survey = false) {
    
    function generateRandomSlug(length = 16) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let slug = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            slug += characters[randomIndex];
        }

        return slug;
    }

    let slug = generateRandomSlug();
    let uniqueSlug = slug;

    if(!survey){
        while (
            await prisma.Entity.findUnique({ where: { slug: uniqueSlug } })) {
            uniqueSlug = generateRandomSlug(); // gera um novo slug se já existir
        }
    }else{
        while (
            await prisma.Survey.findUnique({ where: { slug: uniqueSlug } })) {
            uniqueSlug = generateRandomSlug(); // gera um novo slug se já existir
        }

    }
 
    return uniqueSlug;
}
