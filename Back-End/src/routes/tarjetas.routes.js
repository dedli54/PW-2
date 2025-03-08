import { Router } from 'express';
import { PrismaClient } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

//Obtener Tarjetas
router.get("/Mistarjetas", async(req, res) =>{
    try {
        const userId = parseInt(req.query.userId);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "El parámetro userId es inválido" });
        }
        const tarjetas = await prisma.tarjeta.findMany({
            where: { userId }
        });
        // Mapeo
        const tarjetasF = tarjetas.map(tarjeta => ({

            ...tarjeta,
            number: tarjeta.number.toString(),
        }));

        res.json(tarjetasF);
    } catch (error) {
        console.error("Error al obtener tarjeta:", error);
        res.status(500).json({ error: "Error al obtener tarjeta en el servidor" });
    }
});

//Agregar tarjeta
router.post("/tarjetas", async (req, res) => {
    try{
        const tarjeta = await prisma.tarjeta.create({
            data: {
                owner: req.body.owner,
                number: BigInt(req.body.number),
                cvv: req.body.cvv,
                expiry: req.body.expiry,
                userId: req.body.userId
            }
        });
        const tarjetaF = {
            ...tarjeta,
            number: tarjeta.number.toString(),
        };
        return res.json(tarjetaF);
    }
    catch(error){
        console.error("Error al crear tarjeta:", error);
        res.status(500).json({ error: "Error al crear tarjeta en el servidor" });
    }
});

export default router