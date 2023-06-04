import { Test, TestingModule } from '@nestjs/testing';
import { LoanController } from '../src/loan/loan.controller';

describe('AppController', () => {
  let appController: LoanController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
    }).compile();

    appController = app.get<LoanController>(LoanController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getLoanById('abc')).toBe('Hello World!');
    });
  });
});
