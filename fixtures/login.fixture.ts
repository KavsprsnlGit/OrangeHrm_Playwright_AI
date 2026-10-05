import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'csv-parse/sync';
import type { LoginExpectedResult } from '../pages/Login/LoginPage';

export type LoginCase = {
  username: string;
  password: string;
  expected: LoginExpectedResult;
};

export type CsvLoginCase = {
  Username: string;
  Password: string;
  Expected: LoginExpectedResult;
};

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const loginCredentials = {
  username: requiredEnvironmentVariable('ORANGEHRM_USERNAME'),
  password: requiredEnvironmentVariable('ORANGEHRM_PASSWORD'),
};

export const loginCases: LoginCase[] = [
  { ...loginCredentials, expected: 'Dashboard' },
  { username: 'fakeuser', password: 'fakepass', expected: 'Invalid credentials' },
  { username: 'ESSUser1', password: 'ess123', expected: 'Invalid credentials' },
];

const parsedCsvRows: unknown[] = parse(
  readFileSync(resolve(__dirname, '../test_data/loginData.csv')),
  { columns: true, skip_empty_lines: true, trim: true },
);

const requiredCsvColumns = ['Username', 'Password', 'Expected'] as const;

function validateCsvRow(value: unknown, rowNumber: number): CsvLoginCase {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`Invalid loginData.csv row ${rowNumber}: expected a CSV record.`);
  }

  const row = value as Record<string, unknown>;
  const missingColumns = requiredCsvColumns.filter((column) => !(column in row));
  if (missingColumns.length > 0) {
    throw new Error(
      `Invalid loginData.csv row ${rowNumber}: missing column(s) ${missingColumns.join(', ')}.`,
    );
  }

  const { Username, Password, Expected } = row;
  if (typeof Username !== 'string' || Username.trim() === '') {
    throw new Error(`Invalid loginData.csv row ${rowNumber}: Username must not be empty.`);
  }
  if (typeof Password !== 'string' || Password.trim() === '') {
    throw new Error(`Invalid loginData.csv row ${rowNumber}: Password must not be empty.`);
  }
  if (Expected !== 'Dashboard' && Expected !== 'Invalid credentials') {
    throw new Error(
      `Invalid loginData.csv row ${rowNumber}: Expected must be "Dashboard" or "Invalid credentials".`,
    );
  }

  return { Username, Password, Expected };
}

if (parsedCsvRows.length === 0) {
  throw new Error('loginData.csv must contain at least one data row.');
}

const validatedCsvRows = parsedCsvRows.map((row, index) => validateCsvRow(row, index + 2));

function resolveCsvCredential(value: string): string {
  if (value === '$ORANGEHRM_USERNAME') return loginCredentials.username;
  if (value === '$ORANGEHRM_PASSWORD') return loginCredentials.password;
  return value;
}

export const csvLoginCases = validatedCsvRows.map((row) => ({
  ...row,
  Username: resolveCsvCredential(row.Username),
  Password: resolveCsvCredential(row.Password),
}));