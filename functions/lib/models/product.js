"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
var mongo_instance = require('../connection');
let prod = require('../mongo_schemas/product');
class productModel {
    constructor(req, res, next) {
        this.addProduct = async (name, description, quantity, price) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const newItem = new prod({
                        name: name,
                        description: description,
                        quantity: quantity,
                        price: price,
                    });
                    let promise = newItem.save().then(item => {
                        let responsedata = { "status": true, "data": [], "message": "Product added." };
                        return responsedata;
                    }).catch(err => {
                        return err;
                    });
                    let data = await promise;
                    return resolve(data);
                }
                catch (err) {
                    this.next(err);
                }
            });
        };
        this.listproducts = async () => {
            return new Promise(async (resolve, reject) => {
                try {
                    let responsedata;
                    let promise = prod.find().then((items) => {
                        if (items) {
                            console.log(items);
                            responsedata = { "status": true, "data": items, "message": "Product list found." };
                        }
                        else {
                            responsedata = { "status": false, "data": [], "message": "No products found" };
                        }
                        return responsedata;
                    }).catch((err) => {
                        return err;
                    });
                    let data = await promise;
                    return resolve(data);
                }
                catch (err) {
                    this.next(err);
                }
            });
        };
        this.editProduct = async (productID, name, description, quantity, price) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let responsedata;
                    if (productID == -1) {
                        responsedata = { "status": false, "data": [], "message": "Please provide proper productID" };
                        return resolve(responsedata);
                    }
                    let updatedItem = {
                        name: name,
                        description: description,
                        quantity: quantity,
                        price: price,
                    };
                    let promise = prod.findByIdAndUpdate(productID, { $set: updatedItem })
                        .then((response) => {
                        if (response) {
                            responsedata = { "status": true, "data": [], "message": "Product updated." };
                        }
                        else {
                            responsedata = { "status": false, "data": [], "message": "No product found with the given ID" };
                        }
                        return responsedata;
                    }).catch((err) => {
                        return err;
                    });
                    let data = await promise;
                    return resolve(data);
                }
                catch (err) {
                    this.next(err);
                }
            });
        };
        this.getProduct = async (productID) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let responsedata;
                    if (productID == -1) {
                        responsedata = { "status": false, "data": [], "message": "Please provide proper productID" };
                        return resolve(responsedata);
                    }
                    let promise = prod.findById(productID).then((item) => {
                        if (item) {
                            responsedata = { "status": true, "data": item, "message": "Product details found." };
                        }
                        else {
                            responsedata = { "status": false, "data": [], "message": "Product details found with the given product ID." };
                        }
                        return responsedata;
                    }).catch((err) => {
                        return err;
                    });
                    let data = await promise;
                    return resolve(data);
                }
                catch (err) {
                    this.next(err);
                }
            });
        };
        this.deleteProduct = async (productID) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let responsedata;
                    if (productID == -1) {
                        responsedata = { "status": false, "data": [], "message": "Please provide proper productID" };
                        return resolve(responsedata);
                    }
                    let promise = prod.findByIdAndRemove(productID).then((item) => {
                        if (item) {
                            responsedata = { "status": true, "data": [], "message": "Product deleted." };
                        }
                        else {
                            responsedata = { "status": false, "data": [], "message": "Product with the given ID not found." };
                        }
                        return responsedata;
                    }).catch((err) => {
                        return err;
                    });
                    let data = await promise;
                    return resolve(data);
                }
                catch (err) {
                    this.next(err);
                }
            });
        };
        this.req = req;
        this.res = res;
        this.next = next;
    }
}
exports.productModel = productModel;
//# sourceMappingURL=product.js.map