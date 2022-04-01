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

const createProductMock = [{insertId: 1}]

const createSaleMock = [{insertId: 1}]

const mockedCreatedSale = { id: 1, itemsSold: [
    {productId: 1, quantity: 2},
    {productId: 2, quantity: 5}
  ]
}

const mockedCreateSaleArgs = [
  {
    productId: 1,
    quantity: 2
  },
  {
    productId: 2,
    quantity: 5
  }
]

const mockedUpdateArgs = {
  id: 1,
  itemsToUpdate: [
    {
      productId: 1,
      quantity: 6
    }
  ]
}

const mockedUpdateReturnValue =  {
  saleId: 1,
  itemUpdated: [
    {
      productId: 1,
      quantity: 6
    }
  ]
}

const mockedUpdateProductReturn = {id: 1, name: 'New Product', quantity: 10}


module.exports = {
  allProductsMock,
  mockedProduct,
  allSalesDBMock,
  allSalesMock,
  mockedSalesByIdDB,
  mockedSalesById,
  createProductMock,
  createSaleMock,
  mockedCreatedSale,
  mockedCreateSaleArgs,
  mockedUpdateArgs,
  mockedUpdateReturnValue,
  mockedUpdateProductReturn
}
