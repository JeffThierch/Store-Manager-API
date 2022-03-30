const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';

  const [sale] = await connection.execute(query, [id]);

  if (!sale.length) return false;

  return sale[0];
};

module.exports = {
  getAll,
  getById,
};
