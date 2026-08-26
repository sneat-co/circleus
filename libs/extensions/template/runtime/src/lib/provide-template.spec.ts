import { CIRCLEUS_SERVICE } from '@sneat/extension-circleus-contract';
import { ListService } from './services';
import { provideTemplate } from './provide-template';

describe('provideTemplate', () => {
  it('provides ListService and binds it to CIRCLEUS_SERVICE', () => {
    const providers = provideTemplate();
    expect(providers).toContain(ListService);
    expect(providers).toContainEqual({
      provide: CIRCLEUS_SERVICE,
      useExisting: ListService,
    });
  });
});
