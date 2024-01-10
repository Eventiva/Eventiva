// File: error-log.test.ts
// Path: projects/workflows/change-report/src/error-log.test.ts

import { retrieveErrorLogs, formatErrorLogs } from './error-log';

describe('retrieveErrorLogs', () => {
  it('should return an array of error logs', () => {
    // Mock the fetchErrorLogs function
    jest.mock('github-actions-library', () => ({
      fetchErrorLogs: jest.fn(() => 'Error log 1\nError log 2\nError log 3'),
    }));

    const errorLogs = retrieveErrorLogs();
    expect(Array.isArray(errorLogs)).toBe(true);
    expect(errorLogs).toHaveLength(3);
    expect(errorLogs).toEqual(['Error log 1', 'Error log 2', 'Error log 3']);
  });
});

describe('formatErrorLogs', () => {
  it('should format the error logs with timestamps', () => {
    const errorLogs = ['Error log 1', 'Error log 2', 'Error log 3'];

    const formattedLogs = formatErrorLogs(errorLogs);
    const formattedLogsArray = formattedLogs.split('\n');

    expect(Array.isArray(formattedLogsArray)).toBe(true);
    expect(formattedLogsArray).toHaveLength(3);

    formattedLogsArray.forEach((log) => {
      expect(log).toMatch(/^\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT - Error log \d$/);
    });
  });
});
