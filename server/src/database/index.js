const { default: mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ferid:idrak@cluster0.xte2h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB connet")
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}


module.exports = connectDB