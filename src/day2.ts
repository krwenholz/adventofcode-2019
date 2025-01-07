import * as fs from 'fs';
import { logger } from './logger';

// Opcodes map to a function transforming the ints and returning the number of values used
const opcodes: Map<number, (pointer: number, memory: number[]) => number> =
  new Map([
    [
      1,
      (pointer, memory) => {
        // Add!
        memory[memory[pointer + 3]] =
          memory[memory[pointer + 1]] + memory[memory[pointer + 2]];
        return 4;
      },
    ],
    [
      2,
      (pointer, memory) => {
        // Multiply!
        memory[memory[pointer + 3]] =
          memory[memory[pointer + 1]] * memory[memory[pointer + 2]];
        return 4;
      },
    ],
  ]);

function execute(memory: number[]) {
  let pointer = 0;
  while (pointer < memory.length) {
    if (!opcodes.has(memory[pointer])) {
      logger.debug({ pos: pointer, opcode: memory[pointer] }, `Unknown opcode`);
      return;
    }

    pointer += opcodes.get(memory[pointer])!(pointer, memory);
  }
}

export function partOne(filePath: string): number[] {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[0];
  lines = lines.slice(3);
  logger.info(
    `Running day 2 part one with ${lines.length} lines and expected ${expected}`,
  );

  const memory = lines[0].split(',').map(Number);
  if (!filePath.includes('sample')) {
    memory[1] = 12;
    memory[2] = 2;
  }

  execute(memory);

  logger.debug({ memory }, 'Final intcode program');
  logger.info({ pos0: memory[0], expected: expected }, 'Day 2 part one');
  return memory;
}

export function partTwo(filePath: string): number[] {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[1];
  lines = lines.slice(3);
  logger.info(
    `Running day 2 part two with ${lines.length} lines and expected ${expected}`,
  );

  // What pair of noun and verb generate 19690720
  const memory = lines[0].split(',').map(Number);
  let noun = -1;
  let verb = 0;
  let output = 0;
  while (output !== 19690720) {
    noun++;
    if (noun > 99) {
      noun = 0;
      verb++;
    }
    const memCopy = memory.slice();
    memCopy[1] = noun;
    memCopy[2] = verb;

    execute(memCopy);
    output = memCopy[0];
  }

  const finalAnswer = 100 * noun + verb;
  logger.info({ finalAnswer, expected: expected }, 'Day 2 part two');
  return memory;
}
