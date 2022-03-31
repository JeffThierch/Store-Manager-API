const connection = require('./connection');

const serialize = (saleData, withId = true) => {
  if (withId) {
    return {
      saleId: saleData.sale_id,
      date: saleData.date,
      productId: saleData.product_id,
      quantity: saleData.quantity,
    };
  }

  return {
    date: saleData.date,
    productId: saleData.product_id,
    quantity: saleData.quantity,
  };
};

const getAll = async () => {
  const query = `
    SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    LEFT JOIN sales AS s
    ON s.id = sp.sale_id
    ORDER BY sale_id ASC, product_id ASC;`;

  const [sales] = await connection.execute(query);

  const serializedData = sales.map((sale) => serialize(sale, true));
  return serializedData;
};

const getById = async (id) => {
  const query = `
    SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products AS sp
    LEFT JOIN sales AS s ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.sale_id ASC, sp.product_id ASC;
  `;

  const [sales] = await connection.execute(query, [id]);

  if (!sales.length) return false;

  const serializedData = sales.map((sale) => serialize(sale, false));

  return serializedData;
};

module.exports = {
  getAll,
  getById,
};
