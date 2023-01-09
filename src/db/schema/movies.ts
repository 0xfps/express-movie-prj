import mongoose from "mongoose"

const movies = new mongoose.Schema({
    movieId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    desc: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    price: {
        type: mongoose.SchemaTypes.Number,
        required: true,
        default: 0
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true
    }
})

export default mongoose.model("movies", movies)