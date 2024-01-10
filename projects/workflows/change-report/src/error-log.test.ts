// File: error-log.test.ts
// Path: projects/workflows/change-report/src/error-log.test.ts

import { retrieveErrorLogs, formatErrorLogs } from './error-log';

describe('retrieveErrorLogs', () => {
  it('should return an array of error logs', () => {
    // Mock the fetchErrorLogs function
    jest.mock('github-actions-library', () => ({
      fetchErrorLogs: jest.fn(() => ['Error 1', 'Error 2']),
    }));

    const errorLogs = retrieveErrorLogs();
    expect(errorLogs).toEqual(['Error 1', 'Error 2']);
  });
});

describe('formatErrorLogs', () => {
  it('should format the error logs with line numbers', () => {
    const errorLogs = ['Error 1', 'Error 2'];
    const formattedLogs = formatErrorLogs(errorLogs);
    expect(formattedLogs).toEqual('1: Error 1\n2: Error 2');
  });
});
