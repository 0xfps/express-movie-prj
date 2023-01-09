import mongoose from "mongoose"

const purchases = new mongoose.Schema({
    purchaseId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    buyerId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    movieId: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
})

export default mongoose.model("purchases", purchases)