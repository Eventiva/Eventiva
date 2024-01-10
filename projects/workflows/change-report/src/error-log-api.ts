// File: error-log-api.ts
// Path: projects/workflows/change-report/src/error-log-api.ts

import { fetchErrorLogs } from 'github-actions-library';

/**
 * Retrieves the error logs from the GitHub Actions run.
 * @returns The error logs as a string or an array of strings.
 */
export function retrieveErrorLogs(): string[] {
  const errorLogs = fetchErrorLogs();
  return errorLogs.split('\n');
}

/**
 * Formats the error logs for display or posting.
 * @param errorLogs - The retrieved error logs.
 * @returns The formatted error logs as a string.
 */
export function formatErrorLogs(errorLogs: string[]): string {
  const formattedLogs = errorLogs.map((log, index) => `${new Date().toUTCString()} - ${log}`).join('\n');
  return formattedLogs;
}
