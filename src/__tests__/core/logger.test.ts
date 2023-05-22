import configLoader from '../../core/ConfigLoader';
import logger from '../../../src/core/logger';

describe('logger', () => {
  beforeAll(() => {
    new configLoader(process.env);
  });

  it('should include [LOG]', () => {
    expect(logger.log('')).toBeUndefined();
    expect(logger.info('')).toBeUndefined();
    expect(logger.warn('')).toBeUndefined();
    expect(logger.error('')).toBeUndefined();
  });
});
