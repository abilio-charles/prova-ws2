import express from 'express';
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";

const router = express.Router();

router.post("/products", async (req, res) => {
    const { description, price, quantity } = req.body;

    if (!description || price === undefined || quantity === undefined) {
        return res.status(400).json({ message: "Invalid inputs" });
    }

    const product = new Product();
    product.description = description;
    product.price = price;
    product.quantity = quantity;

    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.save(product);

    res.status(201).json({ message: "Product registered" });
});

router.get("/products/:id", async (req, res) => {
    const productRepository = AppDataSource.getRepository(Product);
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await productRepository.findOne({ where: { id: productId } });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
});

router.get("/products/description/:description", async (req, res) => {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({ 
        where: {
            description: Like(`%${req.params.description}%`)
        }
    });

    res.json({ products });
});

export default router;
