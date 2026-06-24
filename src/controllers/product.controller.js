const Product = require("../model/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {

        const products =
            await Product.find();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {

        const product =
            await Product.findById(
                req.params.id
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {

        const product =
            await Product.create(
                req.body
            );

        res.status(201).json({
            success: true,
            message: "Product Created",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {

        const product =
            await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Updated",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {

        const product =
            await Product.findByIdAndDelete(
                req.params.id
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};