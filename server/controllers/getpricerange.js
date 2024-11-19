import TransactionModal from "../modals/TransactionsModal.js";

export const getPriceRangeStatistics = async (req, res) => {
  try {
    const month = parseInt(req.params.month); 
    if (isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ error: "Invalid month." });
    }

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }, 
    ];

    const rangesCount = priceRanges.map((range) => ({
      range: `${range.min} - ${
        range.max === Infinity ? "above 900" : range.max
      }`,
      count: 0,
    }));

    const transactions = await TransactionModal.find({
      dateOfSale: month,
    });

    transactions.forEach((transaction) => {
      const price = transaction.price;
      const range = priceRanges.find(
        (range) => price >= range.min && price <= range.max
      );
      if (range) {
        const rangeIndex = priceRanges.indexOf(range);
        rangesCount[rangeIndex].count += 1;
      }
    });

    res.status(200).json(rangesCount);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching statistics." });
  }
};
