"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const environment_1 = require("./config/environment");
const product_1 = require("./controller/product");
var app = express();
var mongo_instance = require('./connection');
let prod = require('./mongo_schemas/product');
app.set('view engine', 'ejs');
app.options('/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.sendResponse(200);
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/product/add', (req, res, next) => {
    res.render('add');
});
app.get('/product/edit/:Id', (req, res, next) => {
    let productID = req.params.Id;
    prod.findById(productID)
        .then((item) => {
        console.log(item);
        res.render('edit', { item });
    }).catch((error) => {
        res.json({ "message": "Something went wrong while getting product details" });
    });
});
app.get('/product/list', (req, res, next) => {
    prod.find()
        .then((items) => {
        console.log(items);
        res.render('list', { items, urlpath: environment_1.urlpath });
    }).catch((error) => {
        console.log(error);
    });
});
app.get('/product/view/:Id', (req, res, next) => {
    let productID = req.params.Id;
    prod.findById(productID)
        .then((item) => {
        console.log(item);
        res.render('view', { item });
    }).catch((error) => {
        res.json({ "message": "Something went wrong while getting product details" });
    });
});
app.post('/product/addProduct', product_1.productController.addProduct);
app.post('/product/editproduct', product_1.productController.editProduct);
app.get('/product/getproduct', product_1.productController.getProduct);
app.post('/product/deleteproduct', product_1.productController.deleteProduct);
app.get('/product/listproducts', product_1.productController.listproducts);
module.exports = { app };
//# sourceMappingURL=controller.js.map