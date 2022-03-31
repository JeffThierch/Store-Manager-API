const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id ASC;';

  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';

  const [product] = await connection.execute(query, [id]);

  if (!product.length) return false;

  return product[0];
};

const createProduct = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';

  const [{ insertId }] = await connection.execute(query, [name, quantity]);

  return { id: insertId, name, quantity };
};

module.exports = {
  getAll,
  getById,
  createProduct,
};
