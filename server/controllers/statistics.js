import TransactionModal from "../modals/TransactionsModal.js";

export const getStatistics = async (req, res) => {
  try {
    const month = req.query.month ? parseInt(req.query.month) : null;

    if (month && (isNaN(month) || month < 1 || month > 12)) {
      return res.status(400).json({ error: "Invalid month." });
    }

    const filter = month
      ? { dateOfSale: month } 
      : {}; 

    const transactions = await TransactionModal.find(filter);

    const totalSold = transactions.filter((t) => t.sold).length;
    const totalNotSold = transactions.filter((t) => !t.sold).length;
    const totalSale = transactions.reduce((total, transaction) => {
      return total + (transaction.sold ? transaction.price : 0);
    }, 0);

    res.status(200).json({
      totalSold,
      totalNotSold,
      totalSale,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics." });
  }
};
