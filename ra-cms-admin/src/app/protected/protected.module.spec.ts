import { ProtectedModule } from './protected.module';

describe('ProtectedModule', () => {
  let privateModule: ProtectedModule;

  beforeEach(() => {
    privateModule = new ProtectedModule();
  });

  it('should create an instance', () => {
    expect(privateModule).toBeTruthy();
  });
});
