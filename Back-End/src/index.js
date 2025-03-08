import app from "./app/app.js";

//const port = process.env.port || 3001
const port = 3000

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


