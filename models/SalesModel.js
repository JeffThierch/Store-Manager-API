const connection = require('./connection');

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  productId: saleData.product_id,
  quantity: saleData.quantity,
});

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales_products ORDER BY sale_id ASC, product_id ASC;';

  const [sales] = await connection.execute(query);

  return sales.map(serialize);
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?;';

  const [sale] = await connection.execute(query, [id]);

  if (!sale.length) return false;

  return serialize(sale[0]);
};

module.exports = {
  getAll,
  getById,
};
