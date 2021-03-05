
let axioscalls = {
    getProdList : () => { 
        return Promise.resolve({status:true, data:[], message: "Product list found."});
    },
    getProd :(prodID)=> {
        if(prodID) {
            return Promise.resolve({status:true, data:[], message:"Product details found."});
        } else {
            return Promise.resolve({status:false, data:[], message:"Please provide proper productID"});
        }
    },
    deleteProd : (prodID) => { 
        if(prodID) {
            return Promise.resolve({status:true, data:[], message: "Product deleted."});
        } else {
            return Promise.resolve({status:false, data:[], message:"Please provide proper productID"});
        }
    },
    addProd : (name, description, quantity, price) => {
        data = {
            name:name,
            description:description,
            quantity:quantity,
            price:price
        }
        return Promise.resolve({status:true, data:[], message: "Product deleted."});
    },
    editProd : (name, description, quantity, price, productID = undefined) => {
        if(!productID) {
            return Promise.resolve({status:false, data:[], message : "Please provide proper productID"});
        }
        data = {
            productID:productID,
            name:name,
            description:description,
            quantity:quantity,
            price:price
        }
        return Promise.resolve({status:true, data:[], message: "Product updated."});
    },

}


module.exports = { axioscalls }

