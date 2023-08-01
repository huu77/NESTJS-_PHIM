import { Test, TestingModule } from '@nestjs/testing';
import { DetailDienVienService } from './detail-dien-vien.service';

describe('DetailDienVienService', () => {
  let service: DetailDienVienService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailDienVienService],
    }).compile();

    service = module.get<DetailDienVienService>(DetailDienVienService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
