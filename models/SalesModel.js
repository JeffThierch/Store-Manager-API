const connection = require('./connection');

const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  date: saleData.date,
  productId: saleData.product_id,
  quantity: saleData.quantity,
});

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales_products ORDER BY sale_id ASC, product_id ASC;';

  const [sales] = await connection.execute(query);

  const serializedData = sales.map(serialize);
  return serializedData;
};

const getById = async (id) => {
  const query = `
    SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    LEFT JOIN sales AS s ON s.id = sp.sale_id
    ORDER BY sp.sale_id ASC, sp.product_id ASC;
  `;

  const [sale] = await connection.execute(query, [id]);

  if (!sale.length) return false;

  const serializedData = serialize(sale[0]);

  return serializedData;
};

module.exports = {
  getAll,
  getById,
};
