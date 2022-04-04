const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/ProductsModel');

const {allProductsMock, mockedProduct, createProductMock} = require('../helpers/mocks')

describe('Products Model Tests', () => {
  describe('getAll Method', () => {
    describe('When called correctly it should return', () => {

      before(async () => {
        sinon.stub(connection, 'execute').resolves([allProductsMock]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('An array' , async () => {
        const products = await productsModel.getAll();

        expect(products).to.be.a('array')
      });

      it('containing 3 objects' , async () => {
        const products = await productsModel.getAll();

        expect(products).to.have.length(3)
        expect(products).to.be.equal(allProductsMock)
      });
    })
  })

  describe('getById Method', () => {

    describe('When called correctly it should return', () => {

      before(async () => {
        sinon.stub(connection, 'execute').resolves([mockedProduct]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('An Object', async () => {
        const product = await productsModel.getById(1);

        expect(product).to.be.a('object')
      })

      it('That containing "id", "name" and "quantity"', async () => {
        const product = await productsModel.getById(1);

        expect(product).to.be.equals(mockedProduct[0]);
      })

    })

    describe("When wrongly called", () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Should return "false"', async () => {
        const product = await productsModel.getById(99);

        expect(product).to.be.equal(false);
      })
    })
  })

  describe('createProduct Method', () => {
    describe('When correctly called', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(createProductMock);
      });

      after(() => {
        connection.execute.restore();
      });
      it('Should return a object with (id, name, quantity)', async () => {
        const newProduct = await productsModel.createProduct({name: 'produto01', quantity: 8});

        expect(newProduct).to.be.eqls({ id: 1, name: 'produto01', quantity: 8 })

      })
    })
  })

  describe('updateProduct Method', () => {
    describe('When correctly called', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(true);
      });

      after(() => {
        connection.execute.restore();
      });
      it('Should return a object with (id, name, quantity)', async () => {
        const newProduct = await productsModel.updateProduct({id: 1, name: 'newProduct', quantity: 10});

        expect(newProduct).to.be.eqls({ id: 1, name: 'newProduct', quantity: 10 })

      })
    })
  })

  describe('deleteProduct Method', () => {
    describe('When correctly called', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves(true);
      });

      after(() => {
        connection.execute.restore();
      });
      it('Should return  "true"', async () => {
        const deletedProduct = await productsModel.deleteProduct(1);

        expect(deletedProduct).to.be.equal(true)

      })
    })
  })

  describe('getByName Method', () => {
    describe('When correctly called', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[{id: 1, name: 'Produto A'}]])
      })

      after(() => {
        connection.execute.restore()
      })

      it('Should return the product with same "name"', async () => {
        const productByName = await productsModel.getByName('Produto A');

        expect(productByName).to.be.eqls({id: 1, name: 'Produto A'})
      })
    })

    describe('When the product dont exist ', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]])
      })

      after(() => {
        connection.execute.restore()
      })

      it('Should return "false"', async () => {
        const productByName = await productsModel.getByName('Produto A');

        expect(productByName).to.be.eqls(false)
      })
    })
  })

  describe('updateProductQuantity Method', () => {
    describe('When correctly called', () => {
      before(() => {
        sinon.stub(connection, 'execute')
        .onFirstCall()
        .resolves([{quantity: 5}])
        .onSecondCall()
        .resolves([[]])
      });

      after(() => {
        connection.execute.restore()
      });

      it('Shoud return a Object contain de "id" and "quantity"', async () => {
        const product = await productsModel.updateProductQuantity({id: 1, quantity: 2})

        expect(product).to.be.eqls({id: 1, quantity: 2})
      })
    })
  })

})
