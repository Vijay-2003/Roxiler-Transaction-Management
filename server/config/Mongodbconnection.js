import mongoose from "mongoose";
// import TransactionModal from "../modals/TransactionsModal.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    // fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    //   .then((response) => response.json())
    //   .then(async (data) => {
    //     const modifiedData = data.map((item) => {
    //       const dateOfSale = new Date(item.dateOfSale);
    //       const month = dateOfSale.getMonth() + 1; 
    //       return {
    //         ...item,
    //         dateOfSale: month, 
    //       };
    //     });

    //     await TransactionModal.insertMany(modifiedData);

    //     console.log("Data Inserted with Month Field");
    //   });

    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to Database:", error.message);
  }
};

export default connectDB;
