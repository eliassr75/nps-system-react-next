import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function setupEntity(){
try {
    const responses = await prisma.Entity.findMany();
    
    if (!responses.lenght){
    
        await prisma.Entity.create({
            data: {
              name: "EtecSystems",
              cnpj: 52545261000190,
            },
          });
    }
    
    } catch (error) {
        console.error(error);
    }
}
