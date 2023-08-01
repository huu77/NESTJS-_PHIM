import { Test, TestingModule } from '@nestjs/testing';
import { QuocgiaService } from './quocgia.service';

describe('QuocgiaService', () => {
  let service: QuocgiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuocgiaService],
    }).compile();

    service = module.get<QuocgiaService>(QuocgiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
