const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

// Crear usuario
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({ data: { name, email, password } });
  res.json(user);
});

// Obtener usuarios
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(port, () => {
  console.log('Servidor corriendo en http://localhost:${port}');
});

