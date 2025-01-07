import * as fs from 'fs';
import { logger } from './logger';

// Opcodes map to a function transforming the ints and returning the next position
const opcodes: Map<number, (pos: number, ints: number[]) => number> = new Map([
  [
    1,
    (pos, ints) => {
      // Add!
      ints[ints[pos + 3]] = ints[ints[pos + 1]] + ints[ints[pos + 2]];
      return pos + 4;
    },
  ],
  [
    2,
    (pos, ints) => {
      // Multiply!
      ints[ints[pos + 3]] = ints[ints[pos + 1]] * ints[ints[pos + 2]];
      return pos + 4;
    },
  ],
]);

function processIntcode(pos: number, ints: number[]): number {
  if (opcodes.has(ints[pos])) {
    return opcodes.get(ints[pos])!(pos, ints);
  }

  logger.debug({ pos, opcode: ints[pos] }, `Unknown opcode`);
  return ints.length;
}

function maybeAlarmCode1202(intcode: number[]): void {
  if (process.env.AOC_1202 !== 'true') {
    return;
  }

  intcode[1] = 12;
  intcode[2] = 2;
}

export function partOne(filePath: string): number[] {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[0];
  lines = lines.slice(3);
  logger.info(
    `Running day 2 part one with ${lines.length} lines and expected ${expected}`,
  );

  const intcode = lines[0].split(',').map(Number);
  maybeAlarmCode1202(intcode);

  let i = 0;
  while (i < intcode.length) {
    i = processIntcode(i, intcode);
  }

  logger.debug({ intcode: intcode }, 'Final intcode program');
  logger.info({ pos0: intcode[0], expected: expected }, 'Day 2 part one');
  return intcode;
}

export function partTwo(filePath: string): number[] {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[1];
  lines = lines.slice(3);
  logger.info(
    `Running day 2 part two with ${lines.length} lines and expected ${expected}`,
  );

  // TODO: Implement part two logic

  logger.info({ value: '', expected: expected }, 'Day 2 part two');
  return [];
}
