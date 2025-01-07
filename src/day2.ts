import * as fs from 'fs';
import { logger } from './logger';

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
  } else {
    logger.error(`Unknown opcode ${ints[pos]} at position ${pos}`);
  }
  return pos + 1;
}

export function partOne(filePath: string): number {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[0];
  lines = lines.slice(2);
  logger.info(
    `Running day 2 part one with ${lines.length} lines and expected ${expected}`,
  );

  let i = 0;
  while (i < lines.length) {
    i = processIntcode(i, lines);
  }

  logger.info({ value: '', expected: expected }, 'Day 2 part one');
  return NaN;
}

export function partTwo(filePath: string): number {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[1];
  lines = lines.slice(2);
  logger.info(
    `Running day 2 part two with ${lines.length} lines and expected ${expected}`,
  );

  // TODO: Implement part two logic

  logger.info({ value: '', expected: expected }, 'Day 2 part two');
  return NaN;
}
