import { Test, TestingModule } from '@nestjs/testing';
import { LikeListController } from './like-list.controller';

describe('LikeListController', () => {
  let controller: LikeListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeListController],
    }).compile();

    controller = module.get<LikeListController>(LikeListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
