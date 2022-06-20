import { Test, TestingModule } from '@nestjs/testing';
import { CookiesResolver } from './cookies.resolver';

describe('CookiesResolver', () => {
  let resolver: CookiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookiesResolver],
    }).compile();

    resolver = module.get<CookiesResolver>(CookiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
