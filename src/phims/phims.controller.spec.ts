import { Test, TestingModule } from '@nestjs/testing';
import { PhimsController } from './phims.controller';

describe('PhimsController', () => {
  let controller: PhimsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhimsController],
    }).compile();

    controller = module.get<PhimsController>(PhimsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
