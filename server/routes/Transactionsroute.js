import express from "express";
import { getTransactions } from "../controllers/get_transactions.js";
import { getStatistics } from "../controllers/statistics.js";
import { getPriceRangeStatistics } from "../controllers/getpricerange.js";
import { getCategoryStatistics } from "../controllers/getcategory.js";

const route = express.Router();

route.get("/gettransactions", getTransactions);
route.get("/getstatistics", getStatistics);
route.get("/price-range-statistics/:month", getPriceRangeStatistics);
route.get("/category-statistics/:month", getCategoryStatistics);

export default route;
