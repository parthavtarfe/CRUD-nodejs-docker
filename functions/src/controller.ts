const express = require('express');
// const mongoose = require('mongoose');
import { urlpath } from './config/environment';
import { productController } from './controller/product'
var app = express();
var mongo_instance = require('./connection');
let prod = require('./mongo_schemas/product');
app.set('view engine', 'ejs');

//CORS
app.options('/*',function (req, res, next) {
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
app.use(express.urlencoded({ extended :true}));

// Page renderers
app.get('/product/add',(req, res, next)=>{
    res.render('add');
})

app.get('/product/edit/:Id',(req, res, next)=>{
    let productID = req.params.Id;

    prod.findById(productID)
    .then((item) => {
        console.log(item);
        res.render('edit', { item });
    }).catch((error) => {
        res.json({"message" : "Something went wrong while getting product details"})
    })
})

app.get('/product/list',(req, res, next)=>{

    prod.find()
    .then((items) => {
        console.log(items);
        res.render('list', { items, urlpath });
    }).catch((error) => {
        console.log(error);
    })
})

app.get('/product/view/:Id',(req, res, next)=>{
    
    let productID = req.params.Id;

    prod.findById(productID)
    .then((item) => {
        console.log(item);
        res.render('view', { item });
    }).catch((error) => {
        res.json({"message" : "Something went wrong while getting product details"})
    })
    
})




// CRUD APIS

app.post('/product/addProduct', productController.addProduct)
app.post('/product/editproduct', productController.editProduct)
app.get('/product/getproduct', productController.getProduct)
app.post('/product/deleteproduct', productController.deleteProduct)
app.get('/product/listproducts', productController.listproducts);

// app.post('/product/addproduct', (req, res) => {
//     console.log("inside add product")
//     const newItem = new prod({
//         name: req.body.name ?? "NA",
//         description : req.body.description ?? "NA",
//         quantity : req.body.quantity ?? 0,
//         price : req.body.price ?? 0,
//     });

//     newItem.save().then(item => res.json({"status":true, "data":[], "message" : "Product added."}));
// })

// app.post('/product/editproduct', (req, res) => {
//     let productID = req.body.productID;

//     let updatedItem = {
//         name: req.body.name,
//         description : req.body.description,
//         quantity : req.body.quantity,
//         price : req.body.price,
//     };
//     console.log(updatedItem)
//     prod.findByIdAndUpdate(productID, { $set: updatedItem})
//     .then((response)=>{
//         res.json({"status":true, "data":[], "message" : "Product updated."});
//     }).catch((error)=>{
//         res.json({"status":false, "data":[], "message" : "Something went wrong while updating product details."});
//     })
// })

// app.get('/product/getproduct', (req, res) => {
//     let productID = req.body.productID;

//     prod.findById(productID)
//     .then((item) => {
//         res.render('view', { item });
//     }).catch((error) => {
//         res.json({"status":false, "data":[], "message" : "Something went wrong while getting product details"})
//     })
// })

// app.post('/product/deleteproduct', (req, res) => {
//     let productID = req.body.productID;

//     prod.findByIdAndRemove(productID)
//     .then((item) => {
//         res.json({"status":true, "data":[], "message" : "Product deleted."})
//     }).catch((error) => {
//         res.json({"status":false, "data":[], "message" : "Something went wrong while getting product details"})
//     })
// })

// app.get('/product/listproducts', (req, res) => {
   
//     prod.find()
//     .then((items) => {
//         console.log(items);
//         res.json({
//             "status":true,
//             "data":items,
//             "message":"Product list found."
//         })
//     }).catch((error) => {
//         console.log(error);
//     })
// })

module.exports = {app};
