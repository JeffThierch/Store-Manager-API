const sinon = require('sinon');
const { expect } = require('chai');

const errorController = require('../../../controllers/errorController')

describe('Testing errorController', () => {
  describe('Validation error', () => {
    describe('When called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let fakeErr = {}
      let next = (_err) => {}

      before(() => {
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy();
        fakeErr = sinon.stub().returns('PRODUCT_NOT_FOUND')
      })

      it('the response code is called with code 404', async () => {
        await errorController(fakeErr, fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(404)).to.be.equal(true);
      })

      it('are called json with the message', async() => {
        await errorController(fakeErr, fakeReq, fakeRes, next);

        expect(fakeRes.json.calledWith({message: 'Product not found'})).to.be.equal(true);
      })
    })
  })

  describe('Application Error', () => {
    describe('When called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let fakeErr = {}
      let next = (_err) => { }

      before(() => {
        fakeReq.params = {id: 1}
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
        fakeErr = sinon.stub().returns('ANOTHER_ERROR')
      })

      it('the response code is called with code 500', async () => {
        await errorController(fakeErr, fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(500)).to.be.equal(true);
      })

      it('are called json with the message', async() => {
        await errorController(fakeErr, fakeReq, fakeRes, next);

        expect(fakeRes.json.calledWith({message: 'Server error'})).to.be.equal(true);
      })
    })
  })
})
