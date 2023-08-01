import { Test, TestingModule } from '@nestjs/testing';
import { LikeListService } from './like-list.service';

describe('LikeListService', () => {
  let service: LikeListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikeListService],
    }).compile();

    service = module.get<LikeListService>(LikeListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
