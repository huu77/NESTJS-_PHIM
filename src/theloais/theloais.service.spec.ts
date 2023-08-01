import { Test, TestingModule } from '@nestjs/testing';
import { TheloaisService } from './theloais.service';

describe('TheloaisService', () => {
  let service: TheloaisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TheloaisService],
    }).compile();

    service = module.get<TheloaisService>(TheloaisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
