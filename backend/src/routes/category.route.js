import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';

import { AuthHandle, AdminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post('/createCategory', AuthHandle,AdminMiddleware,createCategory);
router.get('/getallCategories',AuthHandle, getAllCategories);
router.get('/:id',AuthHandle,AdminMiddleware, getCategoryById);
router.put('/:id',AuthHandle,AdminMiddleware, updateCategory);
router.delete('/:id',AuthHandle, AdminMiddleware,deleteCategory);
export default router;