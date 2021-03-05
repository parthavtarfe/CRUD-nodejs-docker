import { productModel } from '../models/product'
const DBinstance = require('../connection')
export const productController = {
    /*
    /product/addproduct

    /product/editproduct

    /product/getproduct

    /product/deleteproduct

    /product/listproducts
     */

    // addproduct
    addProduct : async(req, res, next) => {
        let name = req.body.name ?? "NA";
        let description = req.body.description ?? "NA";
        let quantity = req.body.quantity ?? 0;
        let price = req.body.price ?? 0;

        let productModelObject = new productModel(req, res, next);
        let responsedata = await productModelObject.addProduct(name, description, quantity, price);
        res.json(responsedata);
       
    },

    listproducts : async(req, res, next) => {

        let productModelObject = new productModel(req, res, next);
        let responsedata = await productModelObject.listproducts();
        res.json(responsedata);
       
    },

    editProduct : async(req, res, next) => {
        let productID = req.body.productID ?? -1;
        let name = req.body.name ?? "NA";
        let description = req.body.description ?? "NA";
        let quantity = req.body.quantity ?? 0;
        let price = req.body.price ?? 0;

        let productModelObject = new productModel(req, res, next);
        let responsedata = await productModelObject.editProduct(productID, name, description, quantity, price);
        res.json(responsedata);
       
    },

    getProduct : async(req, res, next) => {
        let productID = req.query.productID ?? -1;
        let productModelObject = new productModel(req, res, next);
        let responsedata = await productModelObject.getProduct(productID);
        res.json(responsedata);
    },

    deleteProduct : async(req, res, next) => {
        let productID = req.body.productID ?? -1;
        let productModelObject = new productModel(req, res, next);
        let responsedata = await productModelObject.deleteProduct(productID);
        res.json(responsedata);
    }
}