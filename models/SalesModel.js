const connection = require('./connection');
const ProductModel = require('./ProductsModel');

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

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ()';

  const [{ insertId }] = await connection.execute(query);

  return insertId;
};

const createSaleProduct = async (arrayOfProducts) => {
  const saleId = await createSale();

  const query = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);
    `;

  await Promise.all(arrayOfProducts.map(({ productId, quantity }) => (
    connection.execute(query, [saleId, productId, quantity])
    )));

  await Promise.all(arrayOfProducts.map(({ productId, quantity }) => (
    ProductModel.updateProductQuantity({ id: productId, quantity })
  )));

  return {
    id: saleId,
    itemsSold: arrayOfProducts,
  };
};

const updateSale = async ({ id, itemsToUpdate }) => {
  const query = `
  UPDATE StoreManager.sales_products
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ?;
  `;

  await Promise.all(itemsToUpdate.map(({ productId, quantity }) => (
    connection.execute(query, [quantity, id, productId])
  )));

  return {
    saleId: id,
    itemUpdated: itemsToUpdate,
  };
};

const deleteSale = async (id) => {
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';

  const salesData = await getById(id);

  await Promise.all(salesData.map(({ productId, quantity }) => (
     ProductModel.updateProductQuantity({ id: productId, quantity, isDeleting: true })
  )));

  await connection.execute(query, [id]);

  return true;
};

module.exports = {
  getAll,
  getById,
  createSaleProduct,
  updateSale,
  deleteSale,
};
