import { Router } from 'express';
import { PrismaClient } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

//Login findUnique
router.post("/login", async (req, res) => {
    try{
        const usuario = await prisma.usuario.findUnique({
            where: {
                email: req.body.email,
                pass: req.body.pass
            }
        })
        return res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            usuario: usuario
        })
    }catch(error){
        console.error(error);
        return res.status(404).json({
            success: false,
            message: "Credenciales incorrectas"
        });
    }
});

//Registro create
router.post("/registro", async (req, res) => {
    try {
        const usuario = await prisma.usuario.create({
            data: req.body
        })
        return res.status(201).json({ message: 'Usuario creado con éxito', usuario });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error al crear usuario', details: error.message });
    }
});

//Perfil put
router.put("/perfil", async (req, res) => {
    try{
        console.log("EL ID ES: " + req.body.id); 
        const { id, name, email, pass, lastName } = req.body;
        const usuario = await prisma.usuario.update({
            where: { id },
            data: { name, email, pass, lastName }
        })
        
        
        return res.status(201).json({
            message: 'Usuario actualizado con éxito',
            usuario
        });
        
    }catch(error){
        console.error(error.message);
        res.status(500).json({ error: 'Error al actualizar usuario', details: error.message });
    }
})

export default router