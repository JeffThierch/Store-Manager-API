const sinon = require('sinon');
const { expect } = require('chai');

const productsController = require('../../../controllers/productsController')
const productsServices = require('../../../services/productsServices');

const {
  allProductsMock,
  mockedProduct,
  mockedUpdateProductReturn
  } = require('../helpers/mocks');

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

      it('are called json with the product object', async() => {
        await productsController.getById(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(mockedProduct[0])).to.be.equal(true);
      })
    })

    describe('When the "id" dont exists should return', () => {

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

      it('next function should be called with error message', async () => {
        await productsController.getById(fakeReq, fakeRes, next);

        sinon.assert.callCount(next, 1)
        sinon.assert.calledWith(next, 'PRODUCT_NOT_FOUND')
      })

    })
  })

  describe('createProduct controller', () => {
    describe('When correctly called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (_err) => {}

      before(async () => {
        sinon.stub(productsServices, 'createProduct').resolves(mockedProduct[0]);

        fakeReq.body = {name: 'produto A', quantity: 10}
        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        productsServices.createProduct.restore();
      })

      it('the response code is called with code 201', async () => {
        await productsController.createProduct(fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(201)).to.be.equal(true);
      })

      it('are called json with the product object', async() => {
        await productsController.createProduct(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(mockedProduct[0])).to.be.equal(true);
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

      it('When "name" is undefined, next function should be called with UND_NAME_FIELD', async () => {
        fakeReq.body = {quantity: 10};
        sinon.stub(productsServices, 'createProduct').throws(new Error('UND_NAME_FIELD'));

        await productsController.createProduct(fakeReq, fakeRes, next);

        productsServices.createProduct.restore();

        sinon.assert.calledWith(next, 'UND_NAME_FIELD')
      })

      it('When "quantity" is undefined, next function should be called with UND_QUANT_FIELD', async () => {
        sinon.stub(productsServices, 'createProduct').throws(new Error('UND_QUANT_FIELD'));
        fakeReq.body = {name: 'Produto A'};

        await productsController.createProduct(fakeReq, fakeRes, next);

        productsServices.createProduct.restore();

        sinon.assert.calledWith(next, 'UND_QUANT_FIELD')
      })

      it('When "quantity" shorter, then 1 should be called with SHORT_QUANT_FIELD', async () => {
        fakeReq.body = {name: 'Produto A', quantity: 0};
        sinon.stub(productsServices, 'createProduct').throws(new Error('SHORT_QUANT_FIELD'));

        await productsController.createProduct(fakeReq, fakeRes, next);

        productsServices.createProduct.restore();

        sinon.assert.calledWith(next, 'SHORT_QUANT_FIELD')
      })

      it('When "name" length is shorter, then 5 should be called with SHORT_NAME_FIELD', async () => {
        sinon.stub(productsServices, 'createProduct').throws(new Error('SHORT_NAME_FIELD'));
        fakeReq.body = {name: 'Produto A', quantity: 0};

        await productsController.createProduct(fakeReq, fakeRes, next);

        productsServices.createProduct.restore();

        sinon.assert.calledWith(next, 'SHORT_NAME_FIELD')
      })

    })
  })

  describe('updateProduct controller', () => {
    describe('When correctly called should return', () => {

      let fakeReq = {};
      let fakeRes = {};
      let next = (_err) => {}

      before(async () => {
        sinon.stub(productsServices, 'updateProduct').resolves(mockedUpdateProductReturn);

        fakeReq.body = {name: 'New Product', quantity: 10};

        fakeReq.params = { id: 1 }

        fakeRes.status = sinon.stub().returns(fakeRes);
        fakeRes.json = sinon.spy()
      })

      after(() => {
        productsServices.updateProduct.restore();
      })

      it('the response code is called with code 200', async () => {
        await productsController.updateProduct(fakeReq, fakeRes, next);

        expect(fakeRes.status.calledWith(200)).to.be.equal(true);
      })

      it('are called json with the updatedProduct object', async() => {
        await productsController.updateSale(fakeReq, fakeRes);

        expect(fakeRes.json.calledWith(mockedUpdateProductReturn)).to.be.equal(true);
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
        sinon.stub(productsServices, 'updateProduct').throws(new Error('UND_QUANT_FIELD'));

        fakeReq.body = {name: 'Product 01'};

        await productsController.updateProduct(fakeReq, fakeRes, next);

        productsServices.updateProduct.restore();

        sinon.assert.calledWith(next, 'UND_QUANT_FIELD')
      })

      it('When "quantity" shorter, then 1 should be called with SHORT_QUANT_FIELD', async () => {
        sinon.stub(productsServices, 'updateProduct').throws(new Error('SHORT_QUANT_FIELD'));

        fakeReq.body = {name: 'Product 01', quantity: 0};

        await productsController.updateProduct(fakeReq, fakeRes, next);

        productsServices.updateProduct.restore();

        sinon.assert.calledWith(next, 'SHORT_QUANT_FIELD')
      });

      it('When "name" is undefined, next function should be called with UND_NAME_FIELD', async () => {
        sinon.stub(productsServices, 'updateProduct').throws(new Error('UND_NAME_FIELD'));

        fakeReq.body = {quantity: 0};

        await productsController.updateProduct(fakeReq, fakeRes, next);

        productsServices.updateProduct.restore();

        sinon.assert.calledWith(next, 'UND_NAME_FIELD')
      })

      it('When "name" shorter, then 5 should be called with SHORT_NAME_FIELD', async () => {
        sinon.stub(productsServices, 'updateProduct').throws(new Error('SHORT_NAME_FIELD'));

        fakeReq.body = {name: 'Pro', quantity: 5};

        await productsController.updateProduct(fakeReq, fakeRes, next);

        productsServices.updateProduct.restore();

        sinon.assert.calledWith(next, 'SHORT_NAME_FIELD')
      });

      it('When the "id" dont exist, should be called with PRODUCT_NOT_FOUND', async () => {
        sinon.stub(productsServices, 'updateProduct').throws(new Error('PRODUCT_NOT_FOUND'));

        fakeReq.body = {name: 'Product 01', quantity: 5};

        await productsController.updateProduct(fakeReq, fakeRes, next);

        productsServices.updateProduct.restore();

        sinon.assert.calledWith(next, 'PRODUCT_NOT_FOUND')
      })

    })
  })

})
