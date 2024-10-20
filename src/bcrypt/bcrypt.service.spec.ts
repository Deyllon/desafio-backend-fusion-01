import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash password', () => {
    it('should hash password', async () => {
      const password = 'plainPassword';
      const hashedPassword = 'hashedPassword123';

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      jest.spyOn(require('bcrypt'), 'hash').mockResolvedValue(hashedPassword);

      const result = await service.hashPassword(password);

      expect(result).toBe(hashedPassword);
    })
  })

  describe('comparePassword', () => {
    it('should compare password', async () => {
      const password = 'plainPassword';
      const hashedPassword = 'hashedPassword123';
      
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);

      const result = await service.comparePassword(password, hashedPassword);

      expect(result).toBe(true);
    });
  });
});
