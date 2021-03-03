"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const environment_1 = require("./config/environment");
var app = express();
var mongo_instance = require('./connection');
let prod = require('./mongo_schemas/product');
app.set('view engine', 'ejs');
app.options('/*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.sendResponse(200);
});
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
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
app.post('/product/addproduct', (req, res) => {
    var _a, _b, _c, _d;
    console.log("inside add product");
    const newItem = new prod({
        name: (_a = req.body.name) !== null && _a !== void 0 ? _a : "NA",
        description: (_b = req.body.description) !== null && _b !== void 0 ? _b : "NA",
        quantity: (_c = req.body.quantity) !== null && _c !== void 0 ? _c : 0,
        price: (_d = req.body.price) !== null && _d !== void 0 ? _d : 0,
    });
    newItem.save().then(item => res.json({ "message": "Product added." }));
});
app.post('/product/editproduct', (req, res) => {
    let productID = req.body.productID;
    let updatedItem = {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
    };
    console.log(updatedItem);
    prod.findByIdAndUpdate(productID, { $set: updatedItem })
        .then((response) => {
        res.json({ "message": "Product updated." });
    }).catch((error) => {
        res.json({ "message": "Something went wrong while updating product details." });
    });
});
app.get('/product/getproduct', (req, res) => {
    let productID = req.body.productID;
    prod.findById(productID)
        .then((item) => {
        res.render('view', { item });
    }).catch((error) => {
        res.json({ "message": "Something went wrong while getting product details" });
    });
});
app.post('/product/deleteproduct', (req, res) => {
    let productID = req.body.productID;
    prod.findByIdAndRemove(productID)
        .then((item) => {
        res.json({ "message": "Product deleted." });
    }).catch((error) => {
        res.json({ "message": "Something went wrong while getting product details" });
    });
});
app.get('/product/listproducts', (req, res) => {
    prod.find()
        .then((items) => {
        console.log(items);
        res.json({
            data: items,
            message: "Product list found."
        });
    }).catch((error) => {
        console.log(error);
    });
});
module.exports = { app };
//# sourceMappingURL=controller.js.map