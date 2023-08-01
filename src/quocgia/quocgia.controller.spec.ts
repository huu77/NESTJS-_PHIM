import { Test, TestingModule } from '@nestjs/testing';
import { QuocgiaController } from './quocgia.controller';

describe('QuocgiaController', () => {
  let controller: QuocgiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuocgiaController],
    }).compile();

    controller = module.get<QuocgiaController>(QuocgiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
