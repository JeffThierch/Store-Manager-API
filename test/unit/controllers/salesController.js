const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController')
const salesServices = require('../../../services/salesServices');

const {allSalesMock, mockedSalesById} = require('../helpers/mocks');

describe('Testing salesController', () => {
  describe('getAll controller', () => {
    describe('When called should return', () => {

      let fakeReq = {};
      let fakeRes = {};

      before(async () => {
        sinon.stub(salesServices, 'getAll').resolves(allSalesMock);

        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        salesServices.getAll.restore();
      })

      it('the response code is called with code 200', async () => {
        await salesController.getAll(fakeReq, fakeRes);

        expect(fakeRes.status.calledWith(200)).to.be.equal(true);
      })

      it('are called json with the products array', async() => {
        await salesController.getAll(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(allSalesMock)).to.be.equal(true);
      })
    })
  })

  describe('getById controller', () => {
    describe('When correctly called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (err) => { console.log((err));}

      before(async () => {
        sinon.stub(salesServices, 'getById').resolves(mockedSalesById);

        fakeReq.params = {id: 1}
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        salesServices.getById.restore();
      })

      it('the response code is called with code 200', async () => {
        await salesController.getById(fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(200)).to.be.equal(true);
      })

      it('are called json with the sale object', async() => {
        await salesController.getById(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(mockedSalesById)).to.be.equal(true);
      })
    })

    describe('When the "id" dont exists should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (err) => { console.log((err));}

      before(async () => {
        sinon.stub(salesServices, 'getById').throws(new Error('SALE_NOT_FOUND'));

        fakeReq.params = {id: 99}
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
        next = sinon.spy();
      })

      after(() => {
        salesServices.getById.restore();
      })

      it('next function should be called with error message', async () => {
        await salesController.getById(fakeReq, fakeRes, next);

        sinon.assert.callCount(next, 1)
        sinon.assert.calledWith(next, 'SALE_NOT_FOUND')
      })

    })
  })
})
