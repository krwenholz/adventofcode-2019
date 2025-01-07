import { expect, test, describe, assert } from 'vitest';
import fs from 'fs';

fs.readdirSync('./inputs').forEach(file => {
  const day = file.match(/day(\d+)/)?.[1];
  const name = file.match(/day\d+\.(\w+)\.txt/)?.[1];
  const contents = fs
    .readFileSync('./inputs/' + file)
    .toString()
    .split('\n');
  const kindFlag = contents[0];
  const partOneExpected = contents[1];
  const partTwoExpected = contents[2];

  if (kindFlag !== 'intcode') {
    return;
  }

  if (!name || (partOneExpected === '???' && partTwoExpected === '???')) {
    return;
  }

  describe(`intcode ${day}.${name}`, () => {
    if (partOneExpected != '???') {
      const expected = partOneExpected.split(',').map(Number);
      test(`part one`, async () => {
        const module = await import(`../src/day${day}.ts`);
        const actual = module.partOne('./inputs/' + file);
        expect(actual).toHaveLength(expected.length);
        assert.includeOrderedMembers(actual, expected);
      });
    }

    if (partTwoExpected != '???') {
      const expected = partTwoExpected.split(',').map(Number);
      test(`part two`, async () => {
        const module = await import(`../src/day${day}.ts`);
        const actual = module.partTwo('./inputs/' + file);
        expect(actual).toHaveLength(expected.length);
        assert.includeOrderedMembers(actual, expected);
      });
    }
  });
});
