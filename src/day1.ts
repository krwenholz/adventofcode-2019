import * as fs from 'fs';
import { logger } from './logger';

export function partOne(filePath: string): number {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[1];
  lines = lines.slice(3);
  logger.info(
    `Running day 1 part one with ${lines.length} lines and expected ${expected}`,
  );

  // Fuel required to launch a given module is based on its mass. Specifically, to find the fuel required for a module, take its mass, divide by three, round down, and subtract 2.
  let sum = 0;
  lines
    .map(massStr => {
      return Math.floor(Number(massStr) / 3) - 2;
    })
    .forEach(fuel => {
      sum += fuel;
    });

  logger.info({ sum, expected: expected }, 'Day 1 part one');
  return sum;
}

function getFuel(mass: number): number {
  let fuel = Math.floor(mass / 3) - 2;
  if (fuel <= 0) {
    return 0;
  }
  return fuel;
}

export function partTwo(filePath: string): number {
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  let lines = fileContents.split('\n');
  const expected = lines[2];
  lines = lines.slice(3);
  logger.info(
    `Running day 1 part two with ${lines.length} lines and expected ${expected}`,
  );

  let sum = 0;
  lines
    .map(massStr => {
      return Math.floor(Number(massStr) / 3) - 2;
    })
    .forEach(fuel => {
      sum += fuel;
      let fuelMass = fuel;
      while (fuelMass > 0) {
        fuelMass = getFuel(fuelMass);
        sum += fuelMass;
      }
    });

  logger.info({ sum, expected: expected }, 'Day 1 part two');
  return sum;
}
