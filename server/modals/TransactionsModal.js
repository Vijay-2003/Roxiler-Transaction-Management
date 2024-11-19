import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  sold: Boolean,
  dateOfSale: Number,
});

const Transaction = model("Transaction", TransactionSchema);
export default Transaction;
