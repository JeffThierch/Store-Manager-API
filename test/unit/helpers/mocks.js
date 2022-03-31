const allProductsMock = [
  { id: 1, name: "produto A", quantity: 10 },
  { id: 2, name: "produto B", quantity: 20 },
  { id: 3, name: "produto C", quantity: 1 }
];

const mockedProduct = [
  { id: 1, name: "produto A", quantity: 10 }
];


const allSalesDBMock = [
  {sale_id: 1, date: "2021-09-09T04:54:29.000Z", product_id: 1, quantity: 2 },
  { sale_id: 2, date: "2021-09-09T04:54:54.000Z", product_id: 2, quantity: 2 }
]

const allSalesMock = [
  { saleId: 1, date: "2021-09-09T04:54:29.000Z", productId: 1, quantity: 2 },
  { saleId: 2, date: "2021-09-09T04:54:54.000Z", productId: 2, quantity: 2 }
];


const mockedSalesByIdDB = [
  {sale_id: 1, date: "2021-09-09T04:54:29.000Z", product_id: 1, quantity: 2 },
  {sale_id: 1, date: "2021-09-09T04:54:29.000Z", product_id: 2, quantity: 2 }
]

const mockedSalesById = [
  {date: "2021-09-09T04:54:29.000Z", productId: 1, quantity: 2 },
  {date: "2021-09-09T04:54:29.000Z", productId: 2, quantity: 2 }
];


module.exports = {
  allProductsMock,
  mockedProduct,
  allSalesDBMock,
  allSalesMock,
  mockedSalesByIdDB,
  mockedSalesById
}
