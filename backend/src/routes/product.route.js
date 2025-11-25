import express from 'express';
import { AuthHandle, AdminMiddleware } from "../middleware/authMiddleware.js";
import checkId from '../middleware/checkId.js';
import { addproduct ,updateProduct ,deleteProduct,getProductbyId, fetchproducts,fetchAllproducts,addproductReview,topProducts,newProduct,uploadProductImage} from '../controllers/product.control.js';
const Router=express.Router();
Router.post("/addproduct",AuthHandle,AdminMiddleware,addproduct)
Router.put("/updateproduct/:id",AuthHandle,AdminMiddleware,updateProduct)
Router.get("/fetchproducts",fetchproducts);
Router.delete("/deleteproduct/:id",AuthHandle,AdminMiddleware,deleteProduct);
Router.get("/getproductbyid/:id",getProductbyId);
Router.get("/fetchallproducts",fetchAllproducts);

Router.route("/:id/review").post(AuthHandle,AdminMiddleware,addproductReview);

Router.get("/top",topProducts);
Router.get("/new",newProduct);

Router.post("/uploadimage/:id", AuthHandle, AdminMiddleware,uploadProductImage);

export default Router;