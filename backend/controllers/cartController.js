import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        let userCart = await cartModel.getCartByUserId(userId);
        if (!userCart) {
            userCart = await cartModel.createCart(userId);
        }

        const product = await productModel.findById(itemId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        await cartModel.upsertCartItem(userCart.id, itemId, 1, product.price, size);

        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// update user cart (quantity)
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userCart = await cartModel.getCartByUserId(userId);
        if (!userCart) {
            return res.json({ success: false, message: "Cart not found" });
        }

        const product = await productModel.findById(itemId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        if (quantity > 0) {
            await cartModel.upsertCartItem(userCart.id, itemId, quantity, product.price, size);
        } else {
            await cartModel.removeCartItem(userCart.id, itemId, size);
        }

        res.json({ success: true, message: "Cart Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userCart = await cartModel.getCartByUserId(userId);
        if (!userCart) {
            return res.json({ success: true, cartData: [] }); // Return empty cart if not found
        }

        const cartData = await cartModel.getCartItems(userCart.id);

        res.json({ success: true, cartData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart };
