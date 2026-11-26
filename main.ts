// Entry for make.fun's "u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947" bounty.
// The whole entry is one line of text; this program writes it to entry.txt
// in the output directory, byte for byte, every run.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE = "I resign. I asked the server 10,000 times to let me through and it said 'try again later' every single time. Today I took the hint.";

function main(): void {
  if (LINE.length < 1 || LINE.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
}

main();
