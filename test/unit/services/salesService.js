const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const salesServices = require('../../../services/SalesServices');

const {allSalesMock, mockedSales} = require('../helpers/mocks')

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
        sinon.stub(SalesModel, 'getById').resolves(mockedSales[0])
      });

      after(() => {
        SalesModel.getById.restore()
      });

      it('A object', async () => {
        const product = await salesServices.getById(1);

        expect(product).to.be.an('object');
      })

      it('The Object should contain the property "id"', async () => {
        const product = await salesServices.getById(1);

        expect(product).to.haveOwnProperty('id');
      })

      it('The key "id" should be equals the called param', async () => {
        const product = await salesServices.getById(1);

        expect(product.id).to.be.equal(1);
      })

    })

    describe('When the id not exists should throw ', () => {
      before(async () => {
        sinon.stub(SalesModel, 'getById').resolves(false)
      });

      after(() => {
        sinon.stub(SalesModel.getById.restore()
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
