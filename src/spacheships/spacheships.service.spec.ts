import { Test, TestingModule } from '@nestjs/testing';
import { SpacheshipsService } from './spacheships.service';

describe('SpacheshipsService', () => {
  let service: SpacheshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpacheshipsService],
    }).compile();

    service = module.get<SpacheshipsService>(SpacheshipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
