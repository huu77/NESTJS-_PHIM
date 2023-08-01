import { Test, TestingModule } from '@nestjs/testing';
import { DienviensController } from './dienviens.controller';

describe('DienviensController', () => {
  let controller: DienviensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DienviensController],
    }).compile();

    controller = module.get<DienviensController>(DienviensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
