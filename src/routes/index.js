//instantiate express module here
const express = require('express');

// Init express router here..
const router = express.Router();

// Ger Add Usere here controller
const{ addUsers, getProfiles, getUsers, getUserProducts } = require('../controllers/user')
const{ addCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/category');
const{ addProduct, getProducts, getproduct, updateProduct, deleteProduct } = require('../controllers/product');
const { register, login } = require('../controllers/auth');

// middlewares
const {auth} = require('../middlewares/auth')
const {uploadFile} = require('../middlewares/uploadFile');
const { addTransaction, getTransactions } = require('../controllers/transaction');

// path for user
router.post('/user', addUsers);
router.get('/profiles', auth, getProfiles);
router.get('/users', auth, getUsers);
router.get('/user-products', auth, getUserProducts);


// path for transaction
router.post('/transaction', auth, addTransaction);
router.get('/transactions', auth, getTransactions);

// path for product
router.post('/product', auth, uploadFile('image'), addProduct);
router.get('/products', getProducts);
router.get('/product/:id', auth, getproduct);
router.patch('/product/:id', auth, updateProduct);
router.delete('/product/:id', auth, deleteProduct);


// path for category
router.post('/category', auth, addCategory);
router.get('/category', getCategories);
router.get('/category/:id', auth, getCategory);
router.patch('/category/:id', auth, updateCategory);
router.delete('/category/:id', auth, deleteCategory);


// path for auth 
router.post('/register', register);
router.post('/login', login)

module.exports = router;