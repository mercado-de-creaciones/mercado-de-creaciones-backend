import { jest } from '@jest/globals';

export const mockDB = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  offset: jest.fn().mockReturnThis(),
  mockResolvedValueOnce: jest.fn().mockResolvedValueOnce({ count: 0 } as never) as typeof jest.fn,
};