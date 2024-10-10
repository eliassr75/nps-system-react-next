import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class BaseModel {
    constructor(modelName) {
        this.modelName = modelName;
    }

    async create(data) {
        return await prisma[this.modelName].create({ data });
    }

    async findAll(args) {
        return await prisma[this.modelName].findMany(args);
    }

    async findById(id) {
        return await prisma[this.modelName].findUnique({ where: { id } });
    }

    async update(id, data) {
        return await prisma[this.modelName].update({
            where: { id },
            data,
        });
    }

    async delete(id) {
        return await prisma[this.modelName].delete({ where: { id } });
    }
}
