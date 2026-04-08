import express from 'express';
import {  getProducts } from "../controllers/pro.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

export default router;