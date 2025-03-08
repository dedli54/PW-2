import { Router } from 'express';
import { PrismaClient } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

//Obtener categorías
router.get("/categorias", async (req, res) => {
    const cateogrias = await prisma.categoria.findMany()
    res.json(cateogrias);
});

export default router