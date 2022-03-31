const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController')
const productsServices = require('../../../services/productsServices');

const {allProductsMock, mockedProduct} = require('../helpers/mocks');

describe('Testing productsController', () => {
  describe('getAll controller', () => {
    describe('When called shoud return', () => {

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
})
