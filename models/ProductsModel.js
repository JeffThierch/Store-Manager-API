const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id ASC;';

  const [products] = await connection.execute(query);

  return products;
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ? ';

  const [product] = await connection.execute(query, [name]);

  if (!product.length) return false;

  return product;
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

const updateProduct = async ({ id, name, quantity }) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';

  await connection.execute(query, [name, quantity, id]);

  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';

  await connection.execute(query, [id]);

  return true;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  getByName,
  deleteProduct,
};
