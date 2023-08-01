import { Test, TestingModule } from '@nestjs/testing';
import { PhimsService } from './phims.service';

describe('PhimsService', () => {
  let service: PhimsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhimsService],
    }).compile();

    service = module.get<PhimsService>(PhimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
