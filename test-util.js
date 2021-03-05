const axios = require("axios");
let axioscalls = {
    getProdList : () => { 
        console.log("Hitting get product list API...")
        return axios.get('http://localhost:3000/product/listproducts').then(res => {
            return res.data
        }).catch(err => err);
    },
    getProd : (prodID) => {
        let params = {
            productID:prodID
        }
        console.log("Hitting get product API...")
        return axios.get('http://localhost:3000/product/getproduct', { params }).then(res => {
            console.log(res.data);
            return res.data
        }).catch(err => err);
    },
    deleteProd : (prodID) => { 
        let data = {
            productID:prodID
        }
        console.log("Hitting delete product API...")
        return axios.post('http://localhost:3000/product/deleteproduct', data ).then(res => {
            console.log(res.data);
            return res.data
        }).catch(err => err);
    },
    addProd : (name, description, quantity, price) => {
        data = {
            name:name,
            description:description,
            quantity:quantity,
            price:price
        }
        console.log("Hitting add product API...")
        return axios.post('http://localhost:3000/product/addProduct', data ).then(res => {
            console.log(res.data);
            return res.data
        }).catch(err => err);
    },
    editProd : (name, description, quantity, price) => {
        data = {
            name:name,
            description:description,
            quantity:quantity,
            price:price
        }
        console.log("Hitting add product API...")
        return axios.post('http://localhost:3000/product/editproduct', data ).then(res => {
            console.log(res.data);
            return res.data
        }).catch(err => err);
    }
}


module.exports = { axioscalls }

