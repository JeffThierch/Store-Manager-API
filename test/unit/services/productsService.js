const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/ProductsModel');
const productsServices = require('../../../services/ProductsServices');

const {allProductsMock, mockedProduct} = require('../helpers/mocks')

describe('Testing ProductsServices', () => {
  describe('getAll method', () => {
    describe('When called correctly it should return', () => {

      before(async () => {
        sinon.stub(productsModel, 'getAll').resolves([allProductsMock])
      });

      after(() => {
        productsModel.getAll.restore()
      });

      it('A array', async () => {
        const products = await productsServices.getAll();

        expect(products).to.be.equal('array');
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
        sinon.stub(productsModel, 'getAll').resolves([mockedProduct[0]])
      });

      after(() => {
        productsModel.getAll.restore()
      });

      it('A object', async () => {
        const product = await productsServices.getById(1);

        expect(product).to.be.equal('object');
      })

      it('The Object should contain the property "id"', async () => {
        const product = await productsServices.getById(1);

        expect(product).to.haveOwnProperty('id');
      })

      it('The key "id" should be equals the called param', () => {
        const product = await productsServices.getById(1);

        expect(product.id).to.be.equal(1);
      })

    })

    describe('When the id not exists should throw ', () => {
      before(async () => {
        sinon.stub(productsModel, 'getAll').resolves([false])
      });

      after(() => {
        productsModel.getAll.restore()
      });

      it('A error with "code": 404 and "message": Product not found', async () => {
        expect(async () => { await productsServices.getById(99)}).to.throw(
          {code: 404, message: 'Product not found'}
          )
      })
    })
  })

})
