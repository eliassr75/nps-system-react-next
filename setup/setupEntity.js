import { PrismaClient } from '@prisma/client';
import PasswordManager from "../app_lib/PasswordManager";  // Ajuste na importação
import createUniqueRandomSlug from "../app_lib/SlugManager";

const prisma = new PrismaClient();

export default async function setupEntity() {
  try {
    const responses = await prisma.Entity.findMany();
    
    // Verifica se não há nenhuma entidade cadastrada
    if (!responses.length) {

      // Criação da entidade
      let slug = await createUniqueRandomSlug();
      const entity = await prisma.Entity.create({
        data: {
          name: "EtecSystems",
          cnpj: "52545261000190",  // Lembrando que o CNPJ deve ser uma string para evitar perda de precisão
          slug: slug
        },
      });
      console.info("Master Entity has been created: " + entity.name);

      // Criação do usuário
      const hashedPassword = await PasswordManager.hash("abc@123");  // Utiliza await para aguardar o hash

      const user = await prisma.User.create({
        data: {
          name: "Elias Craveiro",
          email: "elias@etecsystems.com.br",
          password: hashedPassword,  // Senha já hashada
          entityId: entity.id,
          role: "MASTER",  // Corrigido o papel como string
        },
      });
      console.info("Master user has been created: " + user.name);
      
      slug = await createUniqueRandomSlug(true);
      const survey = await prisma.Survey.create({
        data: {
          name: "Padrão",
          type: "minimal",
          entityId: entity.id,
          slug: slug
        },
      });
      console.info("Master Survey has been created: " + survey.name);
      
      return survey;
      
    }else{
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
