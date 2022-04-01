const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/ProductsModel');
const productsServices = require('../../../services/productsServices');

const {allProductsMock, mockedProduct} = require('../helpers/mocks')

describe('Testing ProductsServices', () => {
  describe('getAll method', () => {
    describe('When called correctly it should return', () => {

      before(async () => {
        sinon.stub(productsModel, 'getAll').resolves(allProductsMock)
      });

      after(() => {
        productsModel.getAll.restore()
      });

      it('A array', async () => {
        const products = await productsServices.getAll();

        expect(products).to.be.an('array');
      })

      it('The products array ordered by "id" ', async () => {
        const products = await productsServices.getAll();

        expect(products).to.be.equals(allProductsMock)
      })

    });

  });

  describe('getById Method', () => {

    describe('When the id exists should return', () => {
      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(mockedProduct[0])
      });

      after(() => {
        productsModel.getById.restore()
      });

      it('A object', async () => {
        const product = await productsServices.getById(1);

        expect(product).to.be.an('object');
      })

      it('The Object should contain the property "id"', async () => {
        const product = await productsServices.getById(1);

        expect(product).to.haveOwnProperty('id');
      })

      it('The key "id" should be equals the called param', async () => {
        const product = await productsServices.getById(1);onst product = await productsServices.getById(1);

        expect(product.id).to.be.equal(1);
      })

    })

    describe('When the id not exists should throw ', () => {
      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(false)
      });

      after(() => {
        productsModel.getById.restore()
      });

      it('A error with "message": PRODUCT_NOT_FOUND', async () => {
        try {
          await productsServices.getById(99)
        }catch (err) {
          expect(err.message).equal('PRODUCT_NOT_FOUND')
        }

      })
    })
  })

  describe("createProduct Method", () => {
    describe('When called correctly should return', () => {
      before(() => {
        sinon.stub(productsModel, 'createProduct').resolves(mockedProduct[0])
      })

      after(() => {
        productsModel.createProduct.restore()
      })

      it('Should return a object with (id, name, quantity)', async () => {
        const newProduct = await productsServices.createProduct({name: "produto A", quantity: 10});

        expect(newProduct).to.be.eqls(mockedProduct[0]);
      })
    })
  })

  describe('When any field is incorrect should return a error', () => {

    before(() => {
      sinon.stub(productsModel, 'createProduct').resolves(false);
    });

    after(() => {
      productsModel.createProduct.restore()
    })

    it('Undefined "name" field should return "UND_NAME_FIELD"', async () => {
      try {
        await productsServices.createProduct({quantity: 10});

      }catch (err) {
        expect(err.message).to.be.equals('UND_NAME_FIELD')
      }
    })

    it('Undefined "quantity" field should return "UND_QUANT_FIELD"', async () => {
      try {
        await productsServices.createProduct({name: 'Produto A'});

      }catch (err) {
        expect(err.message).to.be.equals('UND_QUANT_FIELD')
      }
    })

    it('"name" shorter then 5 characters should return "SHORT_NAME_FIELD"', async () => {
      try {
        await productsServices.createProduct({name: 'Pro'});

      }catch (err) {
        expect(err.message).to.be.equals('SHORT_NAME_FIELD')
      }
    })

    it('When "quantity" is shorter then 1 should return "SHORT_QUANT_FIELD"', async () => {
      try {
        await productsServices.createProduct({name: 'Produto A', quantity: 0});

      }catch (err) {
        expect(err.message).to.be.equals('SHORT_QUANT_FIELD')
      }
    })

  })

})
