import { Test, TestingModule } from '@nestjs/testing';
import { DienviensService } from './dienviens.service';

describe('DienviensService', () => {
  let service: DienviensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DienviensService],
    }).compile();

    service = module.get<DienviensService>(DienviensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
