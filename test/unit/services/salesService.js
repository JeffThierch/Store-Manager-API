const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const salesServices = require('../../../services/salesServices');

const {allSalesMock, mockedSalesById} = require('../helpers/mocks')

describe('Testing Sales Services', () => {
  describe('getAll method', () => {
    describe('When called correctly it should return', () => {

      before(async () => {
        sinon.stub(SalesModel, 'getAll').resolves(allSalesMock)
      });

      after(() => {
        SalesModel.getAll.restore()
      });

      it('A array', async () => {
        const sales = await salesServices.getAll();

        expect(sales).to.be.an('array');
      })

      it('The products array ordered by "id" ', async () => {
        const sales = await salesServices.getAll();

        expect(sales).to.be.equals(allSalesMock)
      })

    });

  });

  describe('getById Method', () => {

    describe('When the id exists should return', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').resolves(mockedSalesById)
      });

      after(() => {
        SalesModel.getById.restore()
      });

      it('A array of objects', async () => {
        const product = await salesServices.getById(1);

        expect(product).to.be.an('array');
        expect(product[0]).to.be.an('object');
      })

      it('The Object should contain the property "productId"', async () => {
        const product = await salesServices.getById(1);

        expect(product).to.have.lengthOf(2);
        expect(product[0]).to.haveOwnProperty('productId');
        expect(product[1]).to.haveOwnProperty('productId');
      })

      it('The key "productId" should be equals to "1" and "2"', async () => {
        const product = await salesServices.getById(1);

        expect(product[0].productId).to.be.equal(1);
        expect(product[1].productId).to.be.equal(2);
      })

    })

    describe('When the id not exists should throw ', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').resolves(false)
      });

      after(() => {
        SalesModel.getById.restore()
      });

      it('A error with "message": SALE_NOT_FOUND', async () => {
        try {
          await salesServices.getById(99)
        }catch (err) {
          expect(err.message).equal('SALE_NOT_FOUND')
        }

      })
    })
  })

})
