const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/ProductsModel');

describe('Products Model Tests', () => {
  describe('getAll Method', () => {
    describe('When called correctly it should return', () => {
      const allProductsMock = [
        { id: 1, name: "produto A", quantity: 10 },
        { id: 2, name: "produto B", quantity: 20 },
        { id: 3, name: "produto C", quantity: 1 }
      ];

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
})
