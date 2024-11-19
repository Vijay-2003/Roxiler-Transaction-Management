import TransactionModal from "../modals/TransactionsModal.js";

export const getTransactions = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const month = req.query.month || ""; 
    if (page < 1 || perPage < 1) {
      return res.status(400).json({ error: "Invalid pagination parameters." });
    }


    const startIndex = (page - 1) * perPage;

    let searchFilter = {};

    if (searchQuery) {
      const numericPrice = parseFloat(searchQuery);
      if (!isNaN(numericPrice)) {
        searchFilter = {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } }, 
            { price: numericPrice }, 
          ],
        };
      } else {

        searchFilter = {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
          ],
        };
      }
    }

    if (month) {
      searchFilter.dateOfSale = parseInt(month); 
    }

    const totalTransactions = await TransactionModal.countDocuments(
      searchFilter
    );

    const transactions = await TransactionModal.find(searchFilter)
      .skip(startIndex)
      .limit(perPage);

    const totalPages = Math.ceil(totalTransactions / perPage);

    res.status(200).json({
      message: "Transactions fetched successfully",
      transactions,
      page,
      totalPages,
      totalTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
