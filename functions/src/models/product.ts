import { urlpath } from '../config/environment'
var mongo_instance = require('../connection');
let prod = require('../mongo_schemas/product');

export class productModel {
    public req;
    public res;
    public next;

    constructor(req, res, next){
        this.req = req;
        this.res = res;
        this.next = next;
    }

    public addProduct = async(name, description, quantity, price) => {
        return new Promise(async(resolve, reject) => {
            try {
                const newItem = new prod({
                    name: name,
                    description : description,
                    quantity : quantity,
                    price : price,
                });
            
                let promise = newItem.save().then(item => {
                    let responsedata = {"status":true, "data":[], "message" : "Product added."};
                    return responsedata;
                }).catch(err => {
                    return err;
                });
                let data = await promise;
                return resolve(data);
            } catch(err) {
                this.next(err);
            }
        })
    }

    public listproducts = async() => {
        return new Promise(async(resolve, reject) => {
            try {
                let responsedata;
                let promise = prod.find().then((items) => {
                    if(items) {
                        console.log(items);
                        responsedata = {"status":true, "data":items, "message":"Product list found."}
                    } else {
                        responsedata = {"status":false, "data":[], "message":"No products found"}
                    }
                   return responsedata
                }).catch((err) => {
                    return err
                });
                let data = await promise;
                return resolve(data);
            } catch(err) {
                this.next(err);
            }
        })
    }

    public editProduct = async(productID, name, description, quantity, price) => {
        return new Promise(async(resolve, reject) => {
            try {
                let responsedata;

                if(productID == -1) {
                    responsedata = {"status":false, "data":[], "message" : "Please provide proper productID"}
                    return resolve(responsedata);
                }
                let updatedItem = {
                    name: name,
                    description : description,
                    quantity : quantity,
                    price : price,
                };
               
                let promise = prod.findByIdAndUpdate(productID, { $set: updatedItem})
                .then((response)=>{
                    if(response) {
                        responsedata = {"status":true, "data":[], "message" : "Product updated."};
                    } else {
                        responsedata = {"status":false, "data":[], "message" : "No product found with the given ID"};
                    }
                    return responsedata
                }).catch((err)=>{
                    return err;
                })
                let data = await promise;
                return resolve(data);
            } catch(err) {
                this.next(err);
            }
        })
    }

    public getProduct = async(productID) => {
        return new Promise(async (resolve, reject) => {
            try {
                let responsedata;
                if(productID == -1) {
                    responsedata = {"status":false, "data":[], "message" : "Please provide proper productID"}
                    return resolve(responsedata);
                }
                let promise = prod.findById(productID).then((item) => {
                    if(item){
                        responsedata = { "status":true, "data":item, "message":"Product details found."}
                    } else {
                        responsedata = {"status":false, "data":[], "message":"Product details found with the given product ID."}
                    }
                    return responsedata;
                }).catch((err) => {
                    return err;
                });
                let data = await promise;
                return resolve(data)
            } catch(err) {
                this.next(err);
            }
        })
    }

    public deleteProduct = async(productID) => {
        return new Promise(async(resolve, reject) => {
            try {
                let responsedata;

                if(productID == -1) {
                    responsedata = {"status":false, "data":[], "message" : "Please provide proper productID"}
                    return resolve(responsedata);
                }
                let promise = prod.findByIdAndRemove(productID).then((item) => {
                    if(item) {
                        responsedata = {"status":true, "data":[], "message" : "Product deleted."}
                    } else {
                        responsedata = {"status":false, "data":[], "message" : "Product with the given ID not found."}
                    }
                    return responsedata;
                }).catch((err) => {
                    return err;
                })
                let data = await promise;
                return resolve(data);
            } catch(err) {
                this.next(err);
            }
        })
    }
}