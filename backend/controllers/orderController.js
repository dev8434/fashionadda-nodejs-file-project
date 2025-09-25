import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

// global variables
const currency = 'inr'
const deliveryCharge = 10

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    
    try {
        
        const { userId, items, amount, address} = req.body;

        const newOrder = await orderModel.create(userId, items, amount, address, "COD", false);

        const userCart = await cartModel.getCartByUserId(userId);
        if (userCart) {
            await cartModel.clearCartItems(userCart.id);
        }

        res.json({success:true,message:"Order Placed"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.findAll()
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.findByUserId(userId)
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        await orderModel.updateStatus(orderId, status)
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {placeOrder, allOrders, userOrders, updateStatus}