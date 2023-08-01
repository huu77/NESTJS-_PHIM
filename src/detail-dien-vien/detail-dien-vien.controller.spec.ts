import { Test, TestingModule } from '@nestjs/testing';
import { DetailDienVienController } from './detail-dien-vien.controller';

describe('DetailDienVienController', () => {
  let controller: DetailDienVienController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailDienVienController],
    }).compile();

    controller = module.get<DetailDienVienController>(DetailDienVienController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
