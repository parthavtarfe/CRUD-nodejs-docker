import { productModel } from './functions/src/models/product';
// var mongo_instance = require('./functions/src/connection');
let utils = require('./test-util');

jest.mock('./test-util'); //Uncomment this line if you want to mock the axios behaviour.
//============================================Tests for getting products ends=========================================
test('should get the product list', async()=>{
    let response = await utils.axioscalls.getProdList()
    let data = response.data;
    let status = response.status;
    let typecheck = Array.isArray(data);
    expect(typecheck).toBeTruthy(); // check for getting a data []
    expect(status).toBe(true);
});

//============================================Tests for getting products ends=========================================

//=======================================Tests for checking product details API=======================================

test('should get false status if ID is undefined for get product details API', async()=>{
    let response = await utils.axioscalls.getProd()
    let data = response.data;
    let status = response.status;
    let typecheck = Array.isArray(data);
    expect(typecheck).toBeTruthy();
    expect(status).toBe(false);
});

//NOTE : Not handled in mock API, test it by hitting the API
// test('should get false if product ID is incorrect for get product details API', async()=>{
//     let response = await utils.axioscalls.getProd('603e49d5ce4d9d001f6c4adf')//603e49d5ce4d9d001f6c4ade
//     let data = response.data;
//     let status = response.status;
//     let typecheck = Array.isArray(data);
//     expect(typecheck).toBeTruthy();
//     expect(data.length).toEqual(0)
//     expect(status).toBe(false);
// });

test('should get product details if proper ID id passed for get product  API', async()=>{
    let response = await utils.axioscalls.getProd('603e49d5ce4d9d001f6c4ade')//603e49d5ce4d9d001f6c4ade
    let data = response.data;
    let status = response.status;
    let typecheck = typeof data == 'object';
    expect(typecheck).toBeTruthy();
    expect(status).toBe(true);
});

//==============================Tests for checking product details API ends==========================================

//==============================Tests for checking delete product details API========================================

test('should get status as false if product ID is not passed to delete product API', async()=>{
    let response = await utils.axioscalls.deleteProd();
    let data = response.data;
    let status = response.status;
    let typecheck = Array.isArray(data);
    expect(typecheck).toBeTruthy();
    expect(status).toBe(false);
})

//NOTE : Not handled in mock API
// test('should get status as false if product ID is incorrect for delete product API', async()=>{
//     let response = await utils.axioscalls.deleteProd('603e49d5ce4d9d001f6c4adf');
//     let data = response.data;
//     let status = response.status;
//     let typecheck = Array.isArray(data);
//     expect(typecheck).toBeTruthy();
//     expect(status).toBe(false);
// })

//==============================Tests for checking delete product details API ends=================================

//==============================Tests for checking add product details API ========================================

test('should get true if all the details are provided correctly to add product API', async() => {
    let response = await utils.axioscalls.addProd("Grapes", "All season fruit", 40, 40);
    let data = response.data;
    let status = response.status;
    let typecheck = Array.isArray(data);
    expect(typecheck).toBeTruthy();
    expect(status).toBe(true);
})

//==============================Tests for checking add product details API ends====================================

//==============================Tests for checking edit product details API========================================

test('should get false if the product ID is not provided to edit product API', async() => {
    let response = await utils.axioscalls.editProd("Grapes", "All season fruit", 40, 40);
    let data = response.data;
    let status = response.status;
    let typecheck = Array.isArray(data);
    expect(typecheck).toBeTruthy();
    expect(status).toBe(false);
})

test('should get true if the proper product ID is provided to edit product API', async() => {
    let response = await utils.axioscalls.editProd("Grapes", "All season fruit", 40, 40, '603e49d5ce4d9d001f6c4ade');
    let data = response.data;
    let status = response.status;
    let typecheck = Array.isArray(data);
    expect(typecheck).toBeTruthy();
    expect(status).toBe(true);
})

//==============================Tests for checking edit product details API ends ===================================