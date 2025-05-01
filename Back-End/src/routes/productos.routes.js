import { Router } from 'express';
import { PrismaClient } from '@prisma/client';


const router = Router();
const prisma = new PrismaClient();

/* //Un producto
router.get("/productos/:id", async (req, res) => {
    const producto = await prisma.producto.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
        include: {
            categoria: true
        }
    })
    res.send(producto);
})
*/

//Agregar producto post
router.post("/productos", async (req, res) => {
    try{
        const producto = await prisma.producto.create({
            data: req.body
        })
        return res.json(producto)
    }catch(error){
        console.error("Error al crear producto:", error);
        res.status(500).json({ error: "Error al crear producto en el servidor" });
    }
});

//Obtener Productos
/* router.get("/productos", async (req, res) => {
    const productos = await prisma.producto.findMany()
    res.json(productos);
}); */

//Mostrar los productos con su categoria
router.get("/productos", async (req, res) => {
    try {
      const productos = await prisma.producto.findMany({
        include: {
          category: {
            select: { name: true }
          }
        }
      });
  
      const productosF = productos.map(producto => {
        const { category, ...productos } = producto;
  
        return {
          ...productos,
          categoryName: category.name
        };
      });
  
      res.json(productosF);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });

  //Buscar Producto
  router.get("/productos/s", async (req, res) => {
    const { nombre, precio, categoria } = req.query;
  
    try {
      // Construir el objeto 'where' dinámicamente
      const whereClause = {};
  
      if (nombre) {
        whereClause.name = { contains: nombre };
      }
      if (precio) {
        whereClause.price = parseFloat(precio);
      }
      if (categoria) {
        whereClause.category = {
          name: { contains: categoria },
        };
      }
  
      // Logs para depuración
      console.log('Parámetros recibidos:', { nombre, precio, categoria });
      console.log('whereClause:', JSON.stringify(whereClause, null, 2));
  
      const producto = await prisma.producto.findFirst({
        where: whereClause,
        include: {
          category: {
            select: { name: true },
          },
        },
      });
  
      if (!producto) {
        return res.status(404).json({ error: 'No se encontró ningún producto que coincida con los criterios de búsqueda' });
      }
  
      const { category, ...productoSinCategory } = producto;
      const productoConCategoria = {
        ...productoSinCategory,
        categoriaNombre: category ? category.name : 'Sin categoría',
      };
  
      res.json(productoConCategoria);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  });

// Add this new route to update stock
router.put("/productos/:id/stock", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { quantity } = req.body;

        // First get the current product
        const product = await prisma.producto.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Check if there's enough stock
        if (product.stock < quantity) {
            return res.status(400).json({ 
                error: "No hay suficiente stock disponible",
                availableStock: product.stock 
            });
        }

        // Update the stock
        const updatedProduct = await prisma.producto.update({
            where: { id: productId },
            data: {
                stock: product.stock - quantity
            }
        });

        res.json(updatedProduct);
    } catch (error) {
        console.error("Error al actualizar stock:", error);
        res.status(500).json({ error: "Error al actualizar el stock del producto" });
    }
});

export default router