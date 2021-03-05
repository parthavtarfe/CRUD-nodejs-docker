"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_1 = require("../models/product");
const DBinstance = require('../connection');
exports.productController = {
    addProduct: async (req, res, next) => {
        var _a, _b, _c, _d;
        let name = (_a = req.body.name) !== null && _a !== void 0 ? _a : "NA";
        let description = (_b = req.body.description) !== null && _b !== void 0 ? _b : "NA";
        let quantity = (_c = req.body.quantity) !== null && _c !== void 0 ? _c : 0;
        let price = (_d = req.body.price) !== null && _d !== void 0 ? _d : 0;
        let productModelObject = new product_1.productModel(req, res, next);
        let responsedata = await productModelObject.addProduct(name, description, quantity, price);
        res.json(responsedata);
    },
    listproducts: async (req, res, next) => {
        let productModelObject = new product_1.productModel(req, res, next);
        let responsedata = await productModelObject.listproducts();
        res.json(responsedata);
    },
    editProduct: async (req, res, next) => {
        var _a, _b, _c, _d, _e;
        let productID = (_a = req.body.productID) !== null && _a !== void 0 ? _a : -1;
        let name = (_b = req.body.name) !== null && _b !== void 0 ? _b : "NA";
        let description = (_c = req.body.description) !== null && _c !== void 0 ? _c : "NA";
        let quantity = (_d = req.body.quantity) !== null && _d !== void 0 ? _d : 0;
        let price = (_e = req.body.price) !== null && _e !== void 0 ? _e : 0;
        let productModelObject = new product_1.productModel(req, res, next);
        let responsedata = await productModelObject.editProduct(productID, name, description, quantity, price);
        res.json(responsedata);
    },
    getProduct: async (req, res, next) => {
        var _a;
        let productID = (_a = req.query.productID) !== null && _a !== void 0 ? _a : -1;
        let productModelObject = new product_1.productModel(req, res, next);
        let responsedata = await productModelObject.getProduct(productID);
        res.json(responsedata);
    },
    deleteProduct: async (req, res, next) => {
        var _a;
        let productID = (_a = req.body.productID) !== null && _a !== void 0 ? _a : -1;
        let productModelObject = new product_1.productModel(req, res, next);
        let responsedata = await productModelObject.deleteProduct(productID);
        res.json(responsedata);
    }
};
//# sourceMappingURL=product.js.map