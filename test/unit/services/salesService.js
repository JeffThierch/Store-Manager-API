const sinon = require('sinon');
const { expect } = require('chai');

const SalesModel = require('../../../models/SalesModel');
const salesServices = require('../../../services/salesServices');
const salesValidations = require('../../../services/validations/salesValidations')

const {
  allSalesMock,
  mockedSalesById,
  mockedCreatedSale,
  mockedCreateSaleArgs,
  mockedUpdateReturnValue,
  mockedUpdateArgs
} = require('../helpers/mocks')

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

  describe("createSale Method", () => {
    describe('When called correctly should return', () => {
      before(() => {
        sinon.stub(SalesModel, 'createSaleProduct').resolves(mockedCreatedSale)
        sinon.stub(salesValidations, 'validateProductQuantity').resolves([true])
      })

      after(() => {
        SalesModel.createSaleProduct.restore()
        salesValidations.validateProductQuantity.restore()
      })

      it('Should return a object with (id, itemsSold<Array>)', async () => {

        const newSale = await salesServices.createSaleProduct(mockedCreateSaleArgs);

        expect(newSale).to.be.eqls(mockedCreatedSale);
      })
    })

    describe('When any field is incorrect should return a error', () => {

      before(() => {
        sinon.stub(SalesModel, 'createSaleProduct').resolves(false);
        sinon.stub(salesValidations, 'validateProductQuantity').resolves([true])
        salesValidations.validateProductQuantity.restore()
      });

      after(() => {
        SalesModel.createSaleProduct.restore()
      })

      it('Undefined "productId" field should return "UND_PRODUCT_ID_FIELD"', async () => {
        try {
          await salesServices.createSaleProduct([{quantity: 10}, {quantity: 2}]);

        }catch (err) {
          expect(err.message).to.be.equals('UND_PRODUCT_ID_FIELD')
        }
      })

      it('Undefined "quantity" field should return "UND_QUANT_FIELD"', async () => {
        try {
          await salesServices.createSaleProduct([{productId: 1}, {productId: 2}]);

        }catch (err) {
          expect(err.message).to.be.equals('UND_QUANT_FIELD')
        }
      })

      it('When "quantity" is shorter then 1 should return "SHORT_QUANT_FIELD"', async () => {
        try {
          await salesServices.createSaleProduct([{productId: 1, quantity: 0}]);

        }catch (err) {
          expect(err.message).to.be.equals('SHORT_QUANT_FIELD')
        }
      })
    })

  })

  describe('updateSale Method', () => {
    describe('When correctly called should return', () => {
      before(() => {
        sinon.stub(SalesModel, 'updateSale').resolves(mockedUpdateReturnValue);
        sinon.stub(SalesModel, 'getById').resolves(true);
      });

      after(() => {
        SalesModel.updateSale.restore()
        SalesModel.getById.restore()
      })

      it('A object (saleId, itemUpdated<Array>)', async () => {
       const newSales = await salesServices.updateSale(mockedUpdateArgs)

       expect(newSales).to.be.eqls(mockedUpdateReturnValue)
      })
    })

    describe('When any field is incorrect should return a error', () => {
      before(() => {
        sinon.stub(SalesModel, 'updateSale').resolves(false);
      });

      after(() => {
        SalesModel.updateSale.restore()
      })

      it('When "id" dont exist should return SALE_NOT_FOUND ', async () => {
        try {
          sinon.stub(SalesModel, 'getById').resolves(false);
          await salesServices.updateSale(mockedUpdateArgs)

          SalesModel.getById.restore();
        }catch (err) {
          SalesModel.getById.restore();

          expect(err.message).to.be.equal('SALE_NOT_FOUND')

        }
      })

      it('When "quantity" is shorter then 1 return SHORT_QUANT_FIELD ', async () => {
        try {
          sinon.stub(SalesModel, 'getById').resolves(true);
          await salesServices.updateSale(
            {...mockedUpdateArgs, itemsToUpdate: [{productId: 1, quantity: 0 }]}
          )

          SalesModel.getById.restore();
        }catch (err) {
          SalesModel.getById.restore();

          expect(err.message).to.be.equal('SHORT_QUANT_FIELD')

        }
      })

      it('When "quantity" undefined should return UND_QUANT_FIELD ', async () => {
        try {
          sinon.stub(SalesModel, 'getById').resolves(true);
          await salesServices.updateSale(
            {...mockedUpdateArgs, itemsToUpdate: [{productId: 1}]}
          )

          SalesModel.getById.restore();
        }catch (err) {
          SalesModel.getById.restore();

          expect(err.message).to.be.equal('UND_QUANT_FIELD')
        }
      })

    })
  })

  describe('deleteSale Method', () => {
    describe('When correctly called', () => {
      before(() => {
        sinon.stub(SalesModel, 'deleteSale').resolves(true);
        sinon.stub(SalesModel, 'getById').resolves(true);
      });

      after(() => {
        SalesModel.deleteSale.restore();
        SalesModel.getById.restore();
      });

      it('Should return "true"', async () => {
        const deletedSale = await salesServices.deleteSale(1);

        expect(deletedSale).to.be.equal(true);
      })
    })

    describe('When wrongly called', () => {
      before(() => {
        sinon.stub(SalesModel, 'getById').resolves(false);
      });

      after(() => {
        SalesModel.getById.restore();
      });

      it('Should throw error SALE_NOT_FOUND ', async () => {
        try {
          await salesServices.deleteSale(1);
        } catch (err) {
          expect(err.message).to.be.equal('SALE_NOT_FOUND');
        }
      })
      
    })
  })

})
