import { Test, TestingModule } from '@nestjs/testing';
import { TheloaisController } from './theloais.controller';

describe('TheloaisController', () => {
  let controller: TheloaisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TheloaisController],
    }).compile();

    controller = module.get<TheloaisController>(TheloaisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
