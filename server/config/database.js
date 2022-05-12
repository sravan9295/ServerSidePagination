import mongoose from "mongoose";

const connectDB = async () => {
    try {
        //console.log(`env data ${process.env.MONGO_URI}`)
        const conn = await mongoose.connect("mongodb+srv://saisravank:saisravankpassword@cluster0.itg5t.mongodb.net/paginationAssignment?retryWrites=true&w=majority")
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`DataBase Connection Error : ${error.message}`)
        //process.exit();
    }
}

export default connectDB;
