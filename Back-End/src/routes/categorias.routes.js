import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create new category
router.post("/categorias", async (req, res) => {
    try {
        const categoria = await prisma.categoria.create({
            data: {
                name: req.body.name
            }
        });
        return res.status(201).json(categoria);
    } catch (error) {
        console.error("Error al crear categoría:", error);
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Ya existe una categoría con ese nombre" });
        }
        res.status(500).json({ error: "Error al crear categoría en el servidor" });
    }
});

// Get all categories
router.get("/categorias", async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ error: "Error al obtener categorías" });
    }
});

export default router;