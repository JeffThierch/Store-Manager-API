const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController')
const productsServices = require('../../../services/productsServices');

const {allProductsMock, mockedProduct} = require('../helpers/mocks');

describe('Testing productsController', () => {
  describe('getAll controller', () => {
    describe('When called should return', () => {

      let fakeReq = {};
      let fakeRes = {};

      before(async () => {
        sinon.stub(productsServices, 'getAll').resolves(allProductsMock);

        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        productsServices.getAll.restore();
      })

      it('the response code is called with code 200', async () => {
        await productsController.getAll(fakeReq, fakeRes);

        expect(fakeRes.status.calledWith(200)).to.be.equal(true);
      })

      it('are called json with the products array', async() => {
        await productsController.getAll(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(allProductsMock)).to.be.equal(true);
      })
    })
  })

  describe('getById controller', () => {
    describe('When correctly called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (err) => { console.log((err));}

      before(async () => {
        sinon.stub(productsServices, 'getById').resolves(mockedProduct[0]);

        fakeReq.params = {id: 1}
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        productsServices.getById.restore();
      })

      it('the response code is called with code 200', async () => {
        await productsController.getById(fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(200)).to.be.equal(true);
      })

      it('are called json with the products array', async() => {
        await productsController.getById(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(mockedProduct[0])).to.be.equal(true);
      })
    })

    describe('When the id dont exists should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (err) => { console.log((err));}

      before(async () => {
        sinon.stub(productsServices, 'getById').throws(new Error('PRODUCT_NOT_FOUND'));

        fakeReq.params = {id: 99}
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
        next = sinon.spy();
      })

      after(() => {
        productsServices.getById.restore();
      })

      it('next function should be called with error object', async () => {
        await productsController.getById(fakeReq, fakeRes, next);

        sinon.assert.callCount(next, 1)
        sinon.assert.calledWith(next, 'PRODUCT_NOT_FOUND')
      })

    })
  })
})
