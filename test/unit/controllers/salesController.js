const sinon = require('sinon');
const { expect } = require('chai');

const salesController = require('../../../controllers/salesController')
const salesServices = require('../../../services/salesServices');

const {
  allSalesMock,
  mockedSalesById,
  mockedCreatedSale,
  mockedUpdateReturnValue
} = require('../helpers/mocks');

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

  describe('createSale controller', () => {
    describe('When correctly called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (_err) => {}

      before(async () => {
        sinon.stub(salesServices, 'createSaleProduct').resolves(mockedCreatedSale);

        fakeReq.body = [
          {productId: 1, quantity: 2},
          {productId: 2, quantity: 5}
        ]

        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        salesServices.createSaleProduct.restore();
      })

      it('the response code is called with code 201', async () => {
        await salesController.createSale(fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(201)).to.be.equal(true);
      })

      it('are called json with the product object', async() => {
        await salesController.createSale(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(mockedCreatedSale)).to.be.equal(true);
      })
    })

    describe('When some field is wrong', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (_err) => {}

      before(async () => {
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
        next = sinon.spy();
      })

      it('When "quantity" is undefined, next function should be called with UND_QUANT_FIELD', async () => {
        sinon.stub(salesServices, 'createSaleProduct').throws(new Error('UND_QUANT_FIELD'));
        fakeReq.body =[
            {productId: 1},
            {productId: 2, quantity: 5}
          ];

        await salesController.createSale(fakeReq, fakeRes, next);

        salesServices.createSaleProduct.restore();

        sinon.assert.calledWith(next, 'UND_QUANT_FIELD')
      })

      it('When "quantity" shorter, then 1 should be called with SHORT_QUANT_FIELD', async () => {
        sinon.stub(salesServices, 'createSaleProduct').throws(new Error('SHORT_QUANT_FIELD'));
        fakeReq.body = [
          {productId: 1, quantity: 1},
          {productId: 2, quantity: 0}
        ];

        await salesController.createSale(fakeReq, fakeRes, next);

        salesServices.createSaleProduct.restore();

        sinon.assert.calledWith(next, 'SHORT_QUANT_FIELD')
      })

    })
  })

  describe('updateSale controller', () => {
    describe('When correctly called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (_err) => {}

      before(async () => {
        sinon.stub(salesServices, 'updateSale').resolves(mockedUpdateReturnValue);

        fakeReq.body = [
          {productId: 1, quantity: 6},
        ];

        fakeReq.params = { id: 1 }

        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        salesServices.updateSale.restore();
      })

      it('the response code is called with code 200', async () => {
        await salesController.updateSale(fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(200)).to.be.equal(true);
      })

      it('are called json with the updatedSale object', async() => {
        await salesController.updateSale(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(mockedUpdateReturnValue)).to.be.equal(true);
      })
    })

    describe('When some field is wrong', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (_err) => {}

      before(async () => {
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
        fakeReq.params = { id: 1 }
        next = sinon.spy();
      })

      it('When "quantity" is undefined, next function should be called with UND_QUANT_FIELD', async () => {
        sinon.stub(salesServices, 'updateSale').throws(new Error('UND_QUANT_FIELD'));

        fakeReq.body =[
            {productId: 1},
          ];

        await salesController.updateSale(fakeReq, fakeRes, next);

        salesServices.updateSale.restore();

        sinon.assert.calledWith(next, 'UND_QUANT_FIELD')
      })

      it('When "quantity" shorter, then 1 should be called with SHORT_QUANT_FIELD', async () => {
        sinon.stub(salesServices, 'updateSale').throws(new Error('SHORT_QUANT_FIELD'));

        fakeReq.body = [
          {productId: 1, quantity: 0}
        ];

        await salesController.updateSale(fakeReq, fakeRes, next);

        salesServices.updateSale.restore();

        sinon.assert.calledWith(next, 'SHORT_QUANT_FIELD')
      })

      it('When the "id" dont exist, should be called with SALE_NOT_FOUND', async () => {
        sinon.stub(salesServices, 'updateSale').throws(new Error('SALE_NOT_FOUND'));

        fakeReq.body = [
          {productId: 1, quantity: 0}
        ];

        await salesController.updateSale(fakeReq, fakeRes, next);

        salesServices.updateSale.restore();

        sinon.assert.calledWith(next, 'SALE_NOT_FOUND')
      })

    })
  })

})
