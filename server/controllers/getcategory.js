import TransactionModal from "../modals/TransactionsModal.js"; 

export const getCategoryStatistics = async (req, res) => {
  try {
    const month = parseInt(req.params.month); 
    if (isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ error: "Invalid month." });
    }

    const transactions = await TransactionModal.find({
      dateOfSale: month, 
    });

    const categoryCount = {};

    transactions.forEach((transaction) => {
      const category = transaction.category;
      if (categoryCount[category]) {
        categoryCount[category] += 1;
      } else {
        categoryCount[category] = 1;
      }
    });

    const categoryStats = Object.keys(categoryCount).map((category) => ({
      category,
      count: categoryCount[category],
    }));

    res.status(200).json(categoryStats);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching category statistics." });
  }
};
